import { rateLimit } from "express-rate-limit";

export function createEvaluationRateLimit({ limit = 10, windowMs = 15 * 60 * 1_000 } = {}) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    keyGenerator: (request) => request.auth.userId,
    handler(_request, response) {
      response.status(429).json({
        error: {
          code: "RATE_LIMITED",
          message: "Demasiadas solicitudes de evaluación. Intenta nuevamente más tarde.",
        },
      });
    },
  });
}

export const evaluationRateLimit = createEvaluationRateLimit();
