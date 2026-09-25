import assert from "node:assert/strict";
import test from "node:test";
import { evaluationResponseSchema } from "../src/schemas/evaluation.schemas.js";
import {
  createEvaluationService,
  EVALUATION_TIMEOUT_MS,
  GEMINI_TIMEOUT_MS,
  OLLAMA_TIMEOUT_MS,
} from "../src/services/evaluation.service.js";
import { buildEvaluationContent, evaluationCases } from "./fixtures/evaluation-cases.js";

const providerConfig = {
  ollamaModel: "ollama-model",
  geminiPrimaryModel: "gemini-primary",
  geminiFallbackModel: "gemini-fallback",
};
const timeoutConfig = {
  ollamaTimeoutMs: OLLAMA_TIMEOUT_MS,
  geminiTimeoutMs: GEMINI_TIMEOUT_MS,
  evaluationTimeoutMs: EVALUATION_TIMEOUT_MS,
};
const silentLogger = { info() {} };
const validOutput = () => JSON.stringify(buildEvaluationContent());
const transient = (status = 503) => Object.assign(new Error("provider unavailable"), { status });

function service(overrides = {}) {
  return createEvaluationService({
    evaluateOllama: async () => validOutput(),
    evaluateGemini: async () => validOutput(),
    getProviderConfig: () => providerConfig,
    getTimeoutConfig: () => timeoutConfig,
    logger: silentLogger,
    ...overrides,
  });
}

test("Ollama OK evita invocar Gemini", async () => {
  let geminiCalls = 0;
  const response = await service({
    evaluateGemini: async () => {
      geminiCalls += 1;
      return validOutput();
    },
  })(evaluationCases.free);
  assert.equal(geminiCalls, 0);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

for (const [label, error] of [
  ["timeout", Object.assign(new Error("timeout"), { name: "TimeoutError" })],
  ["429", transient(429)],
  ["503", transient(503)],
]) {
  test(`Ollama ${label} activa Gemini principal`, async () => {
    const calls = [];
    await service({
      evaluateOllama: async ({ model }) => {
        calls.push(model);
        throw error;
      },
      evaluateGemini: async ({ model }) => {
        calls.push(model);
        return validOutput();
      },
    })(evaluationCases.free);
    assert.deepEqual(calls, [providerConfig.ollamaModel, providerConfig.geminiPrimaryModel]);
  });
}

test("Ollama y Gemini principal transitorios permiten Gemini fallback", async () => {
  const calls = [];
  const response = await service({
    evaluateOllama: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      if (model === providerConfig.geminiPrimaryModel) throw transient();
      return validOutput();
    },
  })(evaluationCases.free);
  assert.deepEqual(calls, [providerConfig.ollamaModel, providerConfig.geminiPrimaryModel, providerConfig.geminiFallbackModel]);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

test("si los tres candidatos fallan responde EVALUATION_UNAVAILABLE", async () => {
  const calls = [];
  const evaluate = service({
    evaluateOllama: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
  });
  await assert.rejects(evaluate(evaluationCases.free), { status: 503, code: "EVALUATION_UNAVAILABLE" });
  assert.equal(calls.length, 3);
});

test("un error interno de Ollama no se oculta ni activa Gemini", async () => {
  const programmingError = new TypeError("internal bug");
  let geminiCalls = 0;
  const evaluate = service({
    evaluateOllama: async () => { throw programmingError; },
    evaluateGemini: async () => { geminiCalls += 1; return validOutput(); },
  });
  await assert.rejects(evaluate(evaluationCases.free), (error) => error === programmingError);
  assert.equal(geminiCalls, 0);
});

test("JSON inválido de Ollama no se disfraza con fallback", async () => {
  let geminiCalls = 0;
  const evaluate = service({
    evaluateOllama: async () => "not-json",
    evaluateGemini: async () => { geminiCalls += 1; return validOutput(); },
  });
  await assert.rejects(evaluate(evaluationCases.free), { status: 503, code: "EVALUATION_UNAVAILABLE" });
  assert.equal(geminiCalls, 0);
});

test("salida que viola Zod de Ollama no activa fallback", async () => {
  let geminiCalls = 0;
  const evaluate = service({
    evaluateOllama: async () => JSON.stringify({}),
    evaluateGemini: async () => { geminiCalls += 1; return validOutput(); },
  });
  await assert.rejects(evaluate(evaluationCases.free), { status: 503, code: "EVALUATION_UNAVAILABLE" });
  assert.equal(geminiCalls, 0);
});

test("sin Ollama configurado comienza directamente con Gemini", async () => {
  let ollamaCalls = 0;
  const calls = [];
  await service({
    getProviderConfig: () => ({ ...providerConfig, ollamaModel: null }),
    evaluateOllama: async () => { ollamaCalls += 1; return validOutput(); },
    evaluateGemini: async ({ model }) => { calls.push(model); return validOutput(); },
  })(evaluationCases.free);
  assert.equal(ollamaCalls, 0);
  assert.deepEqual(calls, [providerConfig.geminiPrimaryModel]);
});

test("una imagen omite Ollama y conserva Gemini multimodal", async () => {
  const image = { buffer: Buffer.from("image"), mimeType: "image/png" };
  let ollamaCalls = 0;
  const receivedImages = [];
  await service({
    evaluateOllama: async () => { ollamaCalls += 1; return validOutput(); },
    evaluateGemini: async ({ model, image: receivedImage }) => {
      receivedImages.push(receivedImage);
      if (model === providerConfig.geminiPrimaryModel) throw transient();
      return validOutput();
    },
  })(evaluationCases.free, image);
  assert.equal(ollamaCalls, 0);
  assert.deepEqual(receivedImages, [image, image]);
});

test("la reevaluación conserva el flujo stateless", async () => {
  const response = await service()({
    ...evaluationCases.free,
    verificationResult: {
      verificationPerformed: "Consulté el canal oficial.",
      observedResult: "La entidad negó haber enviado el mensaje.",
    },
  });
  assert.equal(response.phase, "reevaluated");
});

test("el presupuesto global limita a tres intentos sin loops", async () => {
  let clock = 0;
  const calls = [];
  const timeouts = [];
  await service({
    now: () => clock,
    evaluateOllama: async ({ model, timeoutMs }) => {
      calls.push(model); timeouts.push(timeoutMs); clock += timeoutMs; throw transient();
    },
    evaluateGemini: async ({ model, timeoutMs }) => {
      calls.push(model); timeouts.push(timeoutMs); clock += timeoutMs;
      if (model === providerConfig.geminiPrimaryModel) throw transient();
      return validOutput();
    },
  })(evaluationCases.free);
  assert.deepEqual(calls, [providerConfig.ollamaModel, providerConfig.geminiPrimaryModel, providerConfig.geminiFallbackModel]);
  assert.deepEqual(timeouts, [OLLAMA_TIMEOUT_MS, GEMINI_TIMEOUT_MS, GEMINI_TIMEOUT_MS]);
  assert.equal(clock, EVALUATION_TIMEOUT_MS);
});

test("cada candidato recibe el mínimo entre timeout propio y presupuesto restante", async () => {
  let clock = 0;
  const timeouts = [];
  await service({
    now: () => clock,
    getTimeoutConfig: () => ({ ollamaTimeoutMs: OLLAMA_TIMEOUT_MS, geminiTimeoutMs: GEMINI_TIMEOUT_MS, evaluationTimeoutMs: 20_000 }),
    evaluateOllama: async ({ timeoutMs }) => { timeouts.push(timeoutMs); clock += timeoutMs; throw transient(); },
    evaluateGemini: async ({ timeoutMs }) => { timeouts.push(timeoutMs); return validOutput(); },
  })(evaluationCases.free);
  assert.deepEqual(timeouts, [OLLAMA_TIMEOUT_MS, 5_000]);
});
