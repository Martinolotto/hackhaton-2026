import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "../src/app.js";
import { createEvaluationRateLimit } from "../src/middlewares/evaluationRateLimit.js";
import { createRequireAuth } from "../src/middlewares/authenticate.js";
import { createEvaluationService } from "../src/services/evaluation.service.js";
import {
  buildEvaluationContent,
  buildEvaluationResponse,
  evaluationCases,
} from "./fixtures/evaluation-cases.js";

process.env.GEMINI_MODEL ??= "test-model";
process.env.GEMINI_FALLBACK_MODEL ??= "test-fallback-model";

const silentLogger = { info() {} };

async function withServer(app, callback) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();

  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function authForTests() {
  return createRequireAuth({
    getClaims: async (token) =>
      token === "valid-token"
        ? { data: { claims: { sub: "user-123" } }, error: null }
        : { data: null, error: new Error("invalid") },
  });
}

function serviceReturning(contentFactory = () => buildEvaluationContent()) {
  return createEvaluationService({
    logger: silentLogger,
    createInteraction: async (request) => {
      const evaluationRequest = JSON.parse(request.input.split("\n").slice(1).join("\n"));
      return {
        output_text: JSON.stringify(contentFactory(evaluationRequest)),
      };
    },
  });
}

async function post(baseUrl, body, { token = "valid-token" } = {}) {
  return fetch(`${baseUrl}/api/evaluations`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("mantiene GET /api/health", async () => {
  await withServer(createApp(), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, "ok");
  });
});

test("responde 401 para token ausente o inválido", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: serviceReturning(),
  });

  await withServer(app, async (baseUrl) => {
    for (const token of [null, "invalid-token"]) {
      const response = await post(baseUrl, evaluationCases.free, { token });
      assert.equal(response.status, 401);
      assert.deepEqual(await response.json(), {
        error: { code: "UNAUTHORIZED", message: "Es necesario iniciar sesión nuevamente." },
      });
    }
  });
});

test("responde 400 para input inválido y nunca incluye una evaluación", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: serviceReturning(),
  });

  await withServer(app, async (baseUrl) => {
    const response = await post(baseUrl, { interaction: {}, verificationResult: null });
    const body = await response.json();
    assert.equal(response.status, 400);
    assert.deepEqual(body, {
      error: { code: "INVALID_REQUEST", message: "La solicitud de evaluación no es válida." },
    });
    assert.equal("phase" in body, false);
  });
});

test("produce evaluaciones initial y reevaluated compatibles con el contrato", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: serviceReturning((request) =>
      buildEvaluationContent({ reportedVerification: request.verificationResult !== null }),
    ),
  });

  await withServer(app, async (baseUrl) => {
    const initialResponse = await post(baseUrl, evaluationCases.caseC);
    assert.equal(initialResponse.status, 200);
    assert.deepEqual(await initialResponse.json(), buildEvaluationResponse());

    const reevaluationRequest = {
      ...evaluationCases.caseC,
      verificationResult: {
        verificationPerformed: "Consulté la aplicación oficial.",
        observedResult: "No apareció ninguna alerta.",
      },
    };
    const reevaluatedResponse = await post(baseUrl, reevaluationRequest);
    assert.equal(reevaluatedResponse.status, 200);
    assert.deepEqual(
      await reevaluatedResponse.json(),
      buildEvaluationResponse({ phase: "reevaluated", reportedVerification: true }),
    );
  });
});

test("mapea JSON Gemini inválido, salida inválida y errores a 503 sin respuesta parcial", async () => {
  const services = [
    createEvaluationService({
      logger: silentLogger,
      createInteraction: async () => ({ output_text: "not-json" }),
    }),
    createEvaluationService({
      logger: silentLogger,
      createInteraction: async () => ({ output_text: JSON.stringify({}) }),
    }),
    createEvaluationService({
      logger: silentLogger,
      createInteraction: async () => Promise.reject(Object.assign(new Error("quota"), { status: 429 })),
    }),
  ];

  for (const evaluate of services) {
    const app = createApp({ requireAuthMiddleware: authForTests(), evaluate });
    await withServer(app, async (baseUrl) => {
      const response = await post(baseUrl, evaluationCases.free);
      const body = await response.json();
      assert.equal(response.status, 503);
      assert.deepEqual(body, {
        error: {
          code: "EVALUATION_UNAVAILABLE",
          message: "No pudimos generar una evaluación confiable en este momento.",
        },
      });
      assert.equal("phase" in body, false);
    });
  }
});

test("sanea errores internos inesperados como 500", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: async () => {
      throw new Error("private implementation detail");
    },
  });

  await withServer(app, async (baseUrl) => {
    const response = await post(baseUrl, evaluationCases.free);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      error: { code: "INTERNAL_ERROR", message: "Ocurrió un error interno." },
    });
  });
});

test("responde 413 para payload mayor a 32 KiB", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: serviceReturning(),
  });

  await withServer(app, async (baseUrl) => {
    const response = await post(baseUrl, "x".repeat(33 * 1024));
    assert.equal(response.status, 413);
    assert.deepEqual(await response.json(), {
      error: { code: "PAYLOAD_TOO_LARGE", message: "La solicitud supera el tamaño permitido." },
    });
  });
});

test("limita por req.auth.userId después de autenticación", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluationRateLimitMiddleware: createEvaluationRateLimit({ limit: 2, windowMs: 60_000 }),
    evaluate: serviceReturning(),
  });

  await withServer(app, async (baseUrl) => {
    assert.equal((await post(baseUrl, evaluationCases.free)).status, 200);
    assert.equal((await post(baseUrl, evaluationCases.free)).status, 200);
    const response = await post(baseUrl, evaluationCases.free);
    assert.equal(response.status, 429);
    assert.equal(response.headers.has("retry-after"), true);
    assert.deepEqual(await response.json(), {
      error: {
        code: "RATE_LIMITED",
        message: "Demasiadas solicitudes de evaluación. Intenta nuevamente más tarde.",
      },
    });
  });
});

test("envía la URL como texto sin tools, Search, URL Context ni navegación", async () => {
  let capturedRequest;
  let capturedOptions;
  const evaluate = createEvaluationService({
    logger: silentLogger,
    createInteraction: async (request, options) => {
      capturedRequest = request;
      capturedOptions = options;
      return { output_text: JSON.stringify(buildEvaluationContent()) };
    },
  });
  const app = createApp({ requireAuthMiddleware: authForTests(), evaluate });

  await withServer(app, async (baseUrl) => {
    const response = await post(baseUrl, evaluationCases.caseC);
    assert.equal(response.status, 200);
  });

  assert.equal(capturedRequest.store, false);
  assert.equal("tools" in capturedRequest, false);
  assert.equal(capturedRequest.input.includes(evaluationCases.caseC.interaction.url), true);
  assert.equal(capturedRequest.response_format.type, "text");
  assert.equal(capturedRequest.response_format.mime_type, "application/json");
  assert.equal(capturedOptions.timeout, 20_000);
  assert.equal(capturedOptions.maxRetries, 0);
});
