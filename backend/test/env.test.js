import assert from "node:assert/strict";
import test from "node:test";
import { env, validateEvaluationEnvironment } from "../src/config/env.js";

function withEnvironment(name, value, callback) {
  const previous = process.env[name];

  try {
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
    callback();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

test("timeouts de evaluación usan defaults aprobados y valores configurables", () => {
  withEnvironment("NVIDIA_TIMEOUT_MS", undefined, () => {
    assert.equal(env.nvidiaTimeoutMs, 5_000);
  });
  withEnvironment("GEMINI_TIMEOUT_MS", undefined, () => {
    assert.equal(env.geminiTimeoutMs, 10_000);
  });
  withEnvironment("EVALUATION_TIMEOUT_MS", undefined, () => {
    assert.equal(env.evaluationTimeoutMs, 25_000);
  });
  withEnvironment("NVIDIA_TIMEOUT_MS", "5000", () => {
    assert.equal(env.nvidiaTimeoutMs, 5_000);
  });
  withEnvironment("GEMINI_TIMEOUT_MS", "10000", () => {
    assert.equal(env.geminiTimeoutMs, 10_000);
  });
  withEnvironment("EVALUATION_TIMEOUT_MS", "25000", () => {
    assert.equal(env.evaluationTimeoutMs, 25_000);
  });
});

test("timeouts inválidos fallan cerrado", () => {
  withEnvironment("NVIDIA_TIMEOUT_MS", "20s", () => {
    assert.throws(() => env.nvidiaTimeoutMs, /NVIDIA_TIMEOUT_MS/);
  });
});

test("NVIDIA ausente no bloquea el arranque mientras Gemini esté configurado", () => {
  const values = {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    GEMINI_API_KEY: "gemini-key",
    GEMINI_MODEL: "gemini-primary",
    GEMINI_FALLBACK_MODEL: "gemini-fallback",
  };
  const previous = new Map(Object.keys(values).map((name) => [name, process.env[name]]));
  const previousNvidiaApiKey = process.env.NVIDIA_API_KEY;
  const previousNvidiaModel = process.env.NVIDIA_MODEL;

  try {
    Object.assign(process.env, values);
    delete process.env.NVIDIA_API_KEY;
    delete process.env.NVIDIA_MODEL;
    const configuration = validateEvaluationEnvironment();
    assert.equal(configuration.nvidiaApiKey, null);
    assert.equal(configuration.nvidiaModel, null);
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    if (previousNvidiaApiKey === undefined) delete process.env.NVIDIA_API_KEY;
    else process.env.NVIDIA_API_KEY = previousNvidiaApiKey;
    if (previousNvidiaModel === undefined) delete process.env.NVIDIA_MODEL;
    else process.env.NVIDIA_MODEL = previousNvidiaModel;
  }
});
