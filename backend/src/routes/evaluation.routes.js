import { Router } from "express";
import { createEvaluationController } from "../controllers/evaluation.controller.js";
import { requireAuth } from "../middlewares/authenticate.js";
import { evaluationRateLimit } from "../middlewares/evaluationRateLimit.js";
import { validateEvaluation } from "../middlewares/validateEvaluation.js";

export function createEvaluationRouter({
  requireAuthMiddleware = requireAuth,
  evaluationRateLimitMiddleware = evaluationRateLimit,
  evaluate,
} = {}) {
  const router = Router();
  const controller = createEvaluationController({ evaluate });

  router.post(
    "/",
    requireAuthMiddleware,
    evaluationRateLimitMiddleware,
    validateEvaluation,
    controller,
  );

  return router;
}
