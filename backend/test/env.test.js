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
  withEnvironment("OLLAMA_TIMEOUT_MS", undefined, () => {
    assert.equal(env.ollamaTimeoutMs, 15_000);
  });
  withEnvironment("GEMINI_TIMEOUT_MS", undefined, () => {
    assert.equal(env.geminiTimeoutMs, 10_000);
  });
  withEnvironment("EVALUATION_TIMEOUT_MS", undefined, () => {
    assert.equal(env.evaluationTimeoutMs, 35_000);
  });
  withEnvironment("OLLAMA_TIMEOUT_MS", "15000", () => {
    assert.equal(env.ollamaTimeoutMs, 15_000);
  });
  withEnvironment("GEMINI_TIMEOUT_MS", "10000", () => {
    assert.equal(env.geminiTimeoutMs, 10_000);
  });
  withEnvironment("EVALUATION_TIMEOUT_MS", "35000", () => {
    assert.equal(env.evaluationTimeoutMs, 35_000);
  });
});

test("timeouts inválidos fallan cerrado", () => {
  withEnvironment("OLLAMA_TIMEOUT_MS", "20s", () => {
    assert.throws(() => env.ollamaTimeoutMs, /OLLAMA_TIMEOUT_MS/);
  });
});

test("Ollama ausente no bloquea el arranque mientras Gemini esté configurado", () => {
  const values = {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    GEMINI_API_KEY: "gemini-key",
    GEMINI_MODEL: "gemini-primary",
    GEMINI_FALLBACK_MODEL: "gemini-fallback",
  };
  const previous = new Map(Object.keys(values).map((name) => [name, process.env[name]]));
  const previousOllamaApiKey = process.env.OLLAMA_API_KEY;
  const previousOllamaModel = process.env.OLLAMA_MODEL;

  try {
    Object.assign(process.env, values);
    delete process.env.OLLAMA_API_KEY;
    delete process.env.OLLAMA_MODEL;
    const configuration = validateEvaluationEnvironment();
    assert.equal(configuration.ollamaApiKey, null);
    assert.equal(configuration.ollamaModel, null);
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    if (previousOllamaApiKey === undefined) delete process.env.OLLAMA_API_KEY;
    else process.env.OLLAMA_API_KEY = previousOllamaApiKey;
    if (previousOllamaModel === undefined) delete process.env.OLLAMA_MODEL;
    else process.env.OLLAMA_MODEL = previousOllamaModel;
  }
});
