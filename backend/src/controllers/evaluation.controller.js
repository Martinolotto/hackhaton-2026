import { evaluateInteraction } from "../services/evaluation.service.js";

export function createEvaluationController({ evaluate = evaluateInteraction } = {}) {
  return async function postEvaluation(request, response, next) {
    try {
      const evaluation = await evaluate(request.evaluation, request.evaluationImage ?? null);
      response.status(200).json(evaluation);
    } catch (error) {
      next(error);
    }
  };
}

export const postEvaluation = createEvaluationController();
