import "dotenv/config";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

export const env = {
  port: Number.isNaN(port) ? 3000 : port,
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
