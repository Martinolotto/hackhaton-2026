import { z } from "zod";

const requiredText = (maximum) => z.string().trim().min(1).max(maximum);
const optionalText = (maximum) => z.string().trim().max(maximum).nullable();

const interactionSchema = z.strictObject({
  description: requiredText(10_000),
  url: optionalText(2_048),
  channel: requiredText(100),
  presentedIdentity: requiredText(200),
  observableOrigin: optionalText(500),
  priorRelationship: requiredText(500),
  requestedAction: requiredText(1_000),
  doubtReason: requiredText(1_000),
});

const verificationResultSchema = z.strictObject({
  verificationPerformed: requiredText(1_000),
  observedResult: requiredText(2_000),
});

export const evaluationRequestSchema = z.strictObject({
  interaction: interactionSchema,
  verificationResult: verificationResultSchema.nullable(),
});

const statementWithBasisSchema = z.strictObject({
  statement: requiredText(1_000),
  basis: z.enum(["user_provided", "inferred"]),
});

const evidenceSchema = z.strictObject({
  statement: requiredText(1_000),
  origin: z.enum(["user_input", "reported_verification_result"]),
  effect: z.enum(["supports_legitimacy", "raises_concern", "neutral"]),
  verificationStatus: z.enum(["not_independently_verified", "user_reported"]),
});

const riskSchema = z.strictObject({
  level: z.enum(["low", "medium", "high", "undetermined"]),
  explanation: requiredText(2_000),
});

const uncertaintySchema = z.strictObject({
  level: z.enum(["low", "medium", "high"]),
  explanation: requiredText(2_000),
});

const verificationStepSchema = z.strictObject({
  priority: z.number().int().min(1).max(5),
  action: requiredText(1_000),
  reason: requiredText(1_000),
});

const evaluationContentShape = {
  summary: requiredText(2_000),
  indicators: z.array(statementWithBasisSchema).max(12),
  apparentLegitimacy: z.array(statementWithBasisSchema).max(12),
  evidence: z.array(evidenceSchema).max(12),
  contradictions: z.array(requiredText(1_000)).max(12),
  missingInformation: z.array(requiredText(1_000)).max(12),
  risk: riskSchema,
  uncertainty: uncertaintySchema,
  verificationSteps: z.array(verificationStepSchema).min(1).max(5),
  cautionGuidance: z.array(requiredText(1_000)).min(1).max(8),
  learning: requiredText(1_500),
  limitations: z.array(requiredText(1_000)).min(1).max(8),
};

const percentagePattern = /\b\d+(?:[.,]\d+)?\s*(?:%|por\s+ciento)/i;
const numericConfidencePattern = /\b(?:confianza|probabilidad)\b[^.\n]{0,40}\b\d+(?:[.,]\d+)?\b/i;

function collectStrings(value, strings = []) {
  if (typeof value === "string") {
    strings.push(value);
    return strings;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, strings);
    }
    return strings;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectStrings(item, strings);
    }
  }

  return strings;
}

function validateEvaluationSemantics(value, context) {
  const priorities = value.verificationSteps.map((step) => step.priority);
  const uniquePriorities = new Set(priorities);
  const ascending = priorities.every((priority, index) => index === 0 || priorities[index - 1] < priority);

  if (uniquePriorities.size !== priorities.length || !ascending) {
    context.addIssue({
      code: "custom",
      path: ["verificationSteps"],
      message: "Las prioridades deben ser únicas y estar ordenadas ascendentemente.",
    });
  }

  if (collectStrings(value).some((text) => percentagePattern.test(text) || numericConfidencePattern.test(text))) {
    context.addIssue({
      code: "custom",
      message: "La evaluación no admite porcentajes ni confianza o probabilidad numérica.",
    });
  }
}

export const geminiEvaluationContentSchema = z
  .strictObject(evaluationContentShape)
  .superRefine(validateEvaluationSemantics);

export const evaluationResponseSchema = z
  .strictObject({
    phase: z.enum(["initial", "reevaluated"]),
    ...evaluationContentShape,
  })
  .superRefine(validateEvaluationSemantics);

export const geminiEvaluationJsonSchema = z.toJSONSchema(geminiEvaluationContentSchema);
