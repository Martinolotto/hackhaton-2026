import "dotenv/config";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

function required(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }

  return value;
}

function optional(name) {
  return process.env[name]?.trim() || null;
}

function positiveInteger(name, fallback) {
  const rawValue = process.env[name]?.trim();

  if (!rawValue) {
    return fallback;
  }

  const value = Number.parseInt(rawValue, 10);
  if (!/^\d+$/.test(rawValue) || !Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} debe ser un entero positivo.`);
  }

  return value;
}

export const env = {
  port: Number.isNaN(port) ? 3000 : port,
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  get supabaseUrl() {
    return required("SUPABASE_URL");
  },
  get supabasePublishableKey() {
    return required("SUPABASE_PUBLISHABLE_KEY");
  },
  get geminiApiKey() {
    return required("GEMINI_API_KEY");
  },
  get nvidiaApiKey() {
    return optional("NVIDIA_API_KEY");
  },
  get nvidiaModel() {
    return optional("NVIDIA_MODEL");
  },
  get nvidiaTimeoutMs() {
    return positiveInteger("NVIDIA_TIMEOUT_MS", 5_000);
  },
  get ollamaApiKey() {
    return optional("OLLAMA_API_KEY");
  },
  get ollamaModel() {
    return optional("OLLAMA_MODEL");
  },
  get ollamaTimeoutMs() {
    return positiveInteger("OLLAMA_TIMEOUT_MS", 15_000);
  },
  get geminiModel() {
    return required("GEMINI_MODEL");
  },
  get geminiFallbackModel() {
    return required("GEMINI_FALLBACK_MODEL");
  },
  get geminiTimeoutMs() {
    return positiveInteger("GEMINI_TIMEOUT_MS", 10_000);
  },
  get evaluationTimeoutMs() {
    return positiveInteger("EVALUATION_TIMEOUT_MS", 35_000);
  },
};

export function validateEvaluationEnvironment() {
  const nvidiaApiKey = env.nvidiaApiKey;
  const nvidiaModel = env.nvidiaModel;
  const ollamaApiKey = env.ollamaApiKey;
  const ollamaModel = env.ollamaModel;
  const geminiModel = env.geminiModel;
  const geminiFallbackModel = env.geminiFallbackModel;

  if (geminiModel === geminiFallbackModel) {
    throw new Error("GEMINI_FALLBACK_MODEL debe ser distinto de GEMINI_MODEL");
  }

  return {
    supabaseUrl: env.supabaseUrl,
    supabasePublishableKey: env.supabasePublishableKey,
    nvidiaApiKey,
    nvidiaModel,
    nvidiaTimeoutMs: env.nvidiaTimeoutMs,
    ollamaApiKey,
    ollamaModel,
    ollamaTimeoutMs: env.ollamaTimeoutMs,
    geminiApiKey: env.geminiApiKey,
    geminiModel,
    geminiFallbackModel,
    geminiTimeoutMs: env.geminiTimeoutMs,
    evaluationTimeoutMs: env.evaluationTimeoutMs,
  };
}
