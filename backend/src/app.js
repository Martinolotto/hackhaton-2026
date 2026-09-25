import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { createApiRouter } from "./routes/index.routes.js";

export function createApp(options = {}) {
  const app = express();

  app.use(express.json({ limit: "32kb" }));
  app.use(cors(corsOptions));
  app.use("/api", createApiRouter(options));
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export const app = createApp();
