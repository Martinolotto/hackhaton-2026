import assert from "node:assert/strict";
import test from "node:test";
import { evaluationResponseSchema } from "../src/schemas/evaluation.schemas.js";
import {
  createEvaluationService,
  GEMINI_ATTEMPT_TIMEOUT_MS,
  GEMINI_TOTAL_TIMEOUT_MS,
} from "../src/services/evaluation.service.js";
import { buildEvaluationContent, evaluationCases } from "./fixtures/evaluation-cases.js";

const models = { primary: "primary-model", fallback: "fallback-model" };
const silentLogger = { info() {} };

function validInteraction() {
  return { output_text: JSON.stringify(buildEvaluationContent()) };
}

function service(createInteraction, overrides = {}) {
  return createEvaluationService({
    createInteraction,
    getModels: () => models,
    logger: silentLogger,
    ...overrides,
  });
}

test("principal OK no ejecuta el fallback", async () => {
  const calls = [];
  const evaluate = service(async (request) => {
    calls.push(request.model);
    return validInteraction();
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [models.primary]);
});

test("principal 503 ejecuta una vez el fallback y este puede responder", async () => {
  const calls = [];
  const evaluate = service(async (request) => {
    calls.push(request.model);
    if (request.model === models.primary) {
      throw Object.assign(new Error("unavailable"), { status: 503 });
    }
    return validInteraction();
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [models.primary, models.fallback]);
});

test("timeout del principal ejecuta una vez el fallback dentro del presupuesto total", async () => {
  const calls = [];
  const timeouts = [];
  const times = [0, 0, 20_000];
  const evaluate = service(async (request, options) => {
    calls.push(request.model);
    timeouts.push(options.timeout);
    if (request.model === models.primary) {
      const error = new Error("Request timed out");
      error.name = "APIConnectionTimeoutError";
      throw error;
    }
    return validInteraction();
  }, { now: () => times.shift() });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [models.primary, models.fallback]);
  assert.deepEqual(timeouts, [GEMINI_ATTEMPT_TIMEOUT_MS, 10_000]);
  assert.equal(GEMINI_TOTAL_TIMEOUT_MS, 30_000);
});

test("si ambos modelos fallan responde EVALUATION_UNAVAILABLE", async () => {
  const calls = [];
  const evaluate = service(async (request) => {
    calls.push(request.model);
    throw Object.assign(new Error("unavailable"), { status: 503 });
  });

  await assert.rejects(evaluate(evaluationCases.free), {
    status: 503,
    code: "EVALUATION_UNAVAILABLE",
  });
  assert.deepEqual(calls, [models.primary, models.fallback]);
});

test("un error no transitorio del proveedor no dispara fallback ni oculta errores propios", async () => {
  const providerCalls = [];
  const providerFailure = service(async (request) => {
    providerCalls.push(request.model);
    throw Object.assign(new Error("bad request"), { status: 400 });
  });

  await assert.rejects(providerFailure(evaluationCases.free), {
    status: 503,
    code: "EVALUATION_UNAVAILABLE",
  });
  assert.deepEqual(providerCalls, [models.primary]);

  const programmingError = new TypeError("internal bug");
  const internalFailure = service(async () => {
    throw programmingError;
  });
  await assert.rejects(internalFailure(evaluationCases.free), (error) => error === programmingError);
});

test("la respuesta obtenida por fallback conserva el schema contractual", async () => {
  const evaluate = service(async (request) => {
    if (request.model === models.primary) {
      throw Object.assign(new Error("unavailable"), { code: "UNAVAILABLE" });
    }
    return validInteraction();
  });

  const response = await evaluate(evaluationCases.free);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

test("el failover reenvía intacta la misma entrada multimodal", async () => {
  const inputs = [];
  const evaluate = service(async (request) => {
    inputs.push(request.input);
    if (request.model === models.primary) {
      throw Object.assign(new Error("unavailable"), { status: 503 });
    }
    return validInteraction();
  });
  const image = {
    buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    mimeType: "image/png",
  };

  const response = await evaluate(evaluationCases.free, image);

  assert.equal(inputs.length, 2);
  assert.strictEqual(inputs[0], inputs[1]);
  assert.equal(inputs[0][1].mime_type, "image/png");
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});
