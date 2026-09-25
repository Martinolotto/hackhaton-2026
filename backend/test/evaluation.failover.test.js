import assert from "node:assert/strict";
import test from "node:test";
import { evaluationResponseSchema } from "../src/schemas/evaluation.schemas.js";
import {
  createEvaluationService,
  EVALUATION_TIMEOUT_MS,
  GEMINI_TIMEOUT_MS,
  NVIDIA_TIMEOUT_MS,
} from "../src/services/evaluation.service.js";
import { buildEvaluationContent, evaluationCases } from "./fixtures/evaluation-cases.js";

const providerConfig = {
  nvidiaModel: "nvidia-model",
  geminiPrimaryModel: "gemini-primary",
  geminiFallbackModel: "gemini-fallback",
};
const timeoutConfig = {
  nvidiaTimeoutMs: NVIDIA_TIMEOUT_MS,
  geminiTimeoutMs: GEMINI_TIMEOUT_MS,
  evaluationTimeoutMs: EVALUATION_TIMEOUT_MS,
};
const silentLogger = { info() {} };
const validOutput = () => JSON.stringify(buildEvaluationContent());
const transient = (status = 503) => Object.assign(new Error("provider unavailable"), { status });

function service(overrides = {}) {
  return createEvaluationService({
    evaluateNvidia: async () => validOutput(),
    evaluateGemini: async () => validOutput(),
    getProviderConfig: () => providerConfig,
    getTimeoutConfig: () => timeoutConfig,
    logger: silentLogger,
    ...overrides,
  });
}

test("NVIDIA OK evita invocar Gemini", async () => {
  let geminiCalls = 0;
  const evaluate = service({
    evaluateGemini: async () => {
      geminiCalls += 1;
      return validOutput();
    },
  });

  const response = await evaluate(evaluationCases.free);
  assert.equal(geminiCalls, 0);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

test("NVIDIA 503 activa Gemini principal una sola vez", async () => {
  const calls = [];
  const evaluate = service({
    evaluateNvidia: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [providerConfig.nvidiaModel, providerConfig.geminiPrimaryModel]);
});

test("timeout de NVIDIA activa Gemini principal", async () => {
  const calls = [];
  const timeoutError = Object.assign(new Error("timeout"), {
    name: "APIConnectionTimeoutError",
  });
  const evaluate = service({
    evaluateNvidia: async ({ model }) => {
      calls.push(model);
      throw timeoutError;
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [providerConfig.nvidiaModel, providerConfig.geminiPrimaryModel]);
});

test("NVIDIA y Gemini principal transitorios permiten Gemini fallback", async () => {
  const calls = [];
  const evaluate = service({
    evaluateNvidia: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      if (model === providerConfig.geminiPrimaryModel) {
        throw transient();
      }
      return validOutput();
    },
  });

  const response = await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [
    providerConfig.nvidiaModel,
    providerConfig.geminiPrimaryModel,
    providerConfig.geminiFallbackModel,
  ]);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

test("si los tres candidatos fallan responde EVALUATION_UNAVAILABLE", async () => {
  const calls = [];
  const evaluate = service({
    evaluateNvidia: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      throw transient();
    },
  });

  await assert.rejects(evaluate(evaluationCases.free), {
    status: 503,
    code: "EVALUATION_UNAVAILABLE",
  });
  assert.deepEqual(calls, [
    providerConfig.nvidiaModel,
    providerConfig.geminiPrimaryModel,
    providerConfig.geminiFallbackModel,
  ]);
});

test("un error interno de NVIDIA no se oculta ni activa Gemini", async () => {
  const programmingError = new TypeError("internal bug");
  let geminiCalls = 0;
  const evaluate = service({
    evaluateNvidia: async () => {
      throw programmingError;
    },
    evaluateGemini: async () => {
      geminiCalls += 1;
      return validOutput();
    },
  });

  await assert.rejects(evaluate(evaluationCases.free), (error) => error === programmingError);
  assert.equal(geminiCalls, 0);
});

test("un error no transitorio del proveedor no produce cascada arbitraria", async () => {
  let geminiCalls = 0;
  const evaluate = service({
    evaluateNvidia: async () => Promise.reject(Object.assign(new Error("bad request"), { status: 400 })),
    evaluateGemini: async () => {
      geminiCalls += 1;
      return validOutput();
    },
  });

  await assert.rejects(evaluate(evaluationCases.free), {
    status: 503,
    code: "EVALUATION_UNAVAILABLE",
  });
  assert.equal(geminiCalls, 0);
});

test("una salida NVIDIA inválida no se disfraza con fallback", async () => {
  let geminiCalls = 0;
  const evaluate = service({
    evaluateNvidia: async () => "not-json",
    evaluateGemini: async () => {
      geminiCalls += 1;
      return validOutput();
    },
  });

  await assert.rejects(evaluate(evaluationCases.free), {
    status: 503,
    code: "EVALUATION_UNAVAILABLE",
  });
  assert.equal(geminiCalls, 0);
});

test("la salida NVIDIA se parsea y valida con el schema contractual", async () => {
  const evaluate = service();
  const response = await evaluate(evaluationCases.caseA);
  assert.equal(evaluationResponseSchema.safeParse(response).success, true);
});

test("la cadena completa conserva la misma entrada multimodal", async () => {
  const image = { buffer: Buffer.from("image"), mimeType: "image/png" };
  const receivedImages = [];
  const evaluate = service({
    evaluateNvidia: async ({ image: receivedImage }) => {
      receivedImages.push(receivedImage);
      throw transient();
    },
    evaluateGemini: async ({ model, image: receivedImage }) => {
      receivedImages.push(receivedImage);
      if (model === providerConfig.geminiPrimaryModel) {
        throw transient();
      }
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free, image);
  assert.deepEqual(receivedImages, [image, image, image]);
});

test("la reevaluación mediante NVIDIA conserva el flujo stateless", async () => {
  const reevaluation = {
    ...evaluationCases.free,
    verificationResult: {
      verificationPerformed: "Consulté el canal oficial.",
      observedResult: "La entidad negó haber enviado el mensaje.",
    },
  };
  const evaluate = service();

  const response = await evaluate(reevaluation);
  assert.equal(response.phase, "reevaluated");
});

test("el presupuesto global limita a tres intentos sin loops", async () => {
  let clock = 0;
  const calls = [];
  const timeouts = [];
  const evaluate = service({
    now: () => clock,
    evaluateNvidia: async ({ model, timeoutMs }) => {
      calls.push(model);
      timeouts.push(timeoutMs);
      clock += timeoutMs;
      throw transient();
    },
    evaluateGemini: async ({ model, timeoutMs }) => {
      calls.push(model);
      timeouts.push(timeoutMs);
      clock += timeoutMs;
      if (model === providerConfig.geminiPrimaryModel) {
        throw transient();
      }
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(calls, [
    providerConfig.nvidiaModel,
    providerConfig.geminiPrimaryModel,
    providerConfig.geminiFallbackModel,
  ]);
  assert.deepEqual(timeouts, [
    NVIDIA_TIMEOUT_MS,
    GEMINI_TIMEOUT_MS,
    GEMINI_TIMEOUT_MS,
  ]);
  assert.equal(clock, EVALUATION_TIMEOUT_MS);
});

test("cada candidato recibe el mínimo entre su timeout y el presupuesto restante", async () => {
  let clock = 0;
  const timeouts = [];
  const evaluate = service({
    now: () => clock,
    getTimeoutConfig: () => ({
      nvidiaTimeoutMs: NVIDIA_TIMEOUT_MS,
      geminiTimeoutMs: GEMINI_TIMEOUT_MS,
      evaluationTimeoutMs: 12_000,
    }),
    evaluateNvidia: async ({ timeoutMs }) => {
      timeouts.push(timeoutMs);
      clock += timeoutMs;
      throw transient();
    },
    evaluateGemini: async ({ timeoutMs }) => {
      timeouts.push(timeoutMs);
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free);
  assert.deepEqual(timeouts, [NVIDIA_TIMEOUT_MS, 7_000]);
});

test("sin configuración NVIDIA comienza directamente con Gemini", async () => {
  let nvidiaCalls = 0;
  const calls = [];
  const evaluate = service({
    getProviderConfig: () => ({ ...providerConfig, nvidiaModel: null }),
    evaluateNvidia: async () => {
      nvidiaCalls += 1;
      return validOutput();
    },
    evaluateGemini: async ({ model }) => {
      calls.push(model);
      return validOutput();
    },
  });

  await evaluate(evaluationCases.free);
  assert.equal(nvidiaCalls, 0);
  assert.deepEqual(calls, [providerConfig.geminiPrimaryModel]);
});
