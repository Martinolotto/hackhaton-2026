import { evaluationRequestSchema } from "../schemas/evaluation.schemas.js";
import { HttpError } from "./errorHandler.js";

export function validateEvaluation(request, _response, next) {
  const result = evaluationRequestSchema.safeParse(request.body);

  if (!result.success) {
    next(new HttpError(400, "INVALID_REQUEST", "La solicitud de evaluación no es válida."));
    return;
  }

  request.evaluation = result.data;
  next();
}
