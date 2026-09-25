import "dotenv/config";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

function required(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
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
  get geminiModel() {
    return required("GEMINI_MODEL");
  },
};

export function validateEvaluationEnvironment() {
  return {
    supabaseUrl: env.supabaseUrl,
    supabasePublishableKey: env.supabasePublishableKey,
    geminiApiKey: env.geminiApiKey,
    geminiModel: env.geminiModel,
  };
}
