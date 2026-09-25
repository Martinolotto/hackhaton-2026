import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "../src/app.js";
import { createRequireAuth } from "../src/middlewares/authenticate.js";
import { evaluationResponseSchema } from "../src/schemas/evaluation.schemas.js";
import { createEvaluationService } from "../src/services/evaluation.service.js";
import { createGeminiProvider } from "../src/services/providers/gemini.provider.js";
import { buildEvaluationContent, buildEvaluationResponse, evaluationCases } from "./fixtures/evaluation-cases.js";

process.env.GEMINI_MODEL ??= "test-model";
process.env.GEMINI_FALLBACK_MODEL ??= "test-fallback-model";
process.env.NVIDIA_MODEL ??= "test-nvidia-model";

const silentLogger = { info() {} };
const imageFixtures = {
  "image/png": Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]),
  "image/jpeg": Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]),
  "image/webp": Buffer.from("RIFF\u0004\u0000\u0000\u0000WEBPVP8 ", "binary"),
};

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
    getClaims: async () => ({ data: { claims: { sub: "user-image-test" } }, error: null }),
  });
}

function createMultipart(body, { bytes, mimeType, filename = "captura" } = {}) {
  const form = new FormData();
  form.append("evaluation", JSON.stringify(body));
  if (bytes) {
    form.append("image", new Blob([bytes], { type: mimeType }), filename);
  }
  return form;
}

async function postMultipart(baseUrl, form) {
  return fetch(`${baseUrl}/api/evaluations`, {
    method: "POST",
    headers: { authorization: "Bearer valid-token" },
    body: form,
  });
}

test("la evaluación sin imagen conserva el input textual existente", async () => {
  let capturedInput;
  const evaluate = createEvaluationService({
    logger: silentLogger,
    evaluateNvidia: async ({ textInput }) => {
      capturedInput = textInput;
      return JSON.stringify(buildEvaluationContent());
    },
  });

  const result = await evaluate(evaluationCases.free);
  assert.equal(typeof capturedInput, "string");
  assert.equal(evaluationResponseSchema.safeParse(result).success, true);
});

for (const [mimeType, bytes] of Object.entries(imageFixtures)) {
  test(`acepta ${mimeType} válido solamente en memoria`, async () => {
    let capturedImage;
    const app = createApp({
      requireAuthMiddleware: authForTests(),
      evaluate: async (_evaluation, image) => {
        capturedImage = image;
        return buildEvaluationResponse();
      },
    });

    await withServer(app, async (baseUrl) => {
      const response = await postMultipart(
        baseUrl,
        createMultipart(evaluationCases.free, { bytes, mimeType }),
      );
      assert.equal(response.status, 200);
    });

    assert.deepEqual(Object.keys(capturedImage).sort(), ["buffer", "mimeType"]);
    assert.equal(capturedImage.mimeType, mimeType);
    assert.deepEqual(capturedImage.buffer, bytes);
    assert.equal("path" in capturedImage, false);
  });
}

test("rechaza formatos no permitidos y firmas que no coinciden con el MIME", async () => {
  let evaluated = false;
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: async () => {
      evaluated = true;
      return buildEvaluationResponse();
    },
  });

  await withServer(app, async (baseUrl) => {
    const unsupported = await postMultipart(
      baseUrl,
      createMultipart(evaluationCases.free, {
        bytes: Buffer.from("not an image"),
        mimeType: "text/plain",
        filename: "captura.txt",
      }),
    );
    assert.equal(unsupported.status, 400);

    const spoofed = await postMultipart(
      baseUrl,
      createMultipart(evaluationCases.free, {
        bytes: imageFixtures["image/jpeg"],
        mimeType: "image/png",
        filename: "captura.png",
      }),
    );
    assert.equal(spoofed.status, 400);
  });

  assert.equal(evaluated, false);
});

test("rechaza una imagen mayor a 4 MB con 413", async () => {
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: async () => buildEvaluationResponse(),
  });
  const oversized = Buffer.alloc(4 * 1024 * 1024 + 1, 0);
  imageFixtures["image/png"].copy(oversized, 0);

  await withServer(app, async (baseUrl) => {
    const response = await postMultipart(
      baseUrl,
      createMultipart(evaluationCases.free, {
        bytes: oversized,
        mimeType: "image/png",
        filename: "captura-grande.png",
      }),
    );
    assert.equal(response.status, 413);
    assert.deepEqual(await response.json(), {
      error: { code: "PAYLOAD_TOO_LARGE", message: "La solicitud supera el tamaño permitido." },
    });
  });
});

test("el fallback entrega texto e imagen a Gemini y valida el mismo structured output", async () => {
  let capturedRequest;
  const evaluate = createEvaluationService({
    logger: silentLogger,
    evaluateNvidia: async () => Promise.reject(Object.assign(new Error("unavailable"), { status: 503 })),
    evaluateGemini: createGeminiProvider({ createInteraction: async (request) => {
      capturedRequest = request;
      return { output_text: JSON.stringify(buildEvaluationContent()) };
    } }),
  });
  const image = { buffer: imageFixtures["image/png"], mimeType: "image/png" };

  const result = await evaluate(evaluationCases.free, image);

  assert.equal(Array.isArray(capturedRequest.input), true);
  assert.equal(capturedRequest.input[0].type, "text");
  assert.equal(capturedRequest.input[0].text.includes(evaluationCases.free.interaction.description), true);
  assert.deepEqual(capturedRequest.input[1], {
    type: "image",
    data: image.buffer.toString("base64"),
    mime_type: image.mimeType,
  });
  assert.equal(capturedRequest.store, false);
  assert.equal(evaluationResponseSchema.safeParse(result).success, true);
});

test("la reevaluación acepta nuevamente la misma imagen sin persistirla", async () => {
  let capturedEvaluation;
  let capturedImage;
  const reevaluationRequest = {
    ...evaluationCases.free,
    verificationResult: {
      verificationPerformed: "Consulté el canal oficial.",
      observedResult: "La entidad negó haber enviado el mensaje.",
    },
  };
  const app = createApp({
    requireAuthMiddleware: authForTests(),
    evaluate: async (evaluation, image) => {
      capturedEvaluation = evaluation;
      capturedImage = image;
      return buildEvaluationResponse({ phase: "reevaluated", reportedVerification: true });
    },
  });

  await withServer(app, async (baseUrl) => {
    const response = await postMultipart(
      baseUrl,
      createMultipart(reevaluationRequest, {
        bytes: imageFixtures["image/webp"],
        mimeType: "image/webp",
        filename: "captura.webp",
      }),
    );
    assert.equal(response.status, 200);
    assert.equal((await response.json()).phase, "reevaluated");
  });

  assert.deepEqual(capturedEvaluation.verificationResult, reevaluationRequest.verificationResult);
  assert.equal(capturedImage.mimeType, "image/webp");
  assert.equal("path" in capturedImage, false);
});
