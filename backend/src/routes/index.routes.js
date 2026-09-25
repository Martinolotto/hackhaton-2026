import { Router } from "express";
import { createEvaluationRouter } from "./evaluation.routes.js";
import { healthRouter } from "./health.routes.js";

export function createApiRouter(options = {}) {
  const apiRouter = Router();

  apiRouter.use(healthRouter);
  apiRouter.use("/evaluations", createEvaluationRouter(options));

  return apiRouter;
}
