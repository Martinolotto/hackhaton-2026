import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluationRequestSchema,
  evaluationResponseSchema,
  geminiEvaluationContentSchema,
  geminiEvaluationJsonSchema,
} from "../src/schemas/evaluation.schemas.js";
import {
  buildEvaluationContent,
  buildEvaluationResponse,
  evaluationCases,
} from "./fixtures/evaluation-cases.js";

const clone = (value) => structuredClone(value);

test("acepta requests estrictos de evaluación inicial y reevaluación", () => {
  const initial = evaluationRequestSchema.safeParse(evaluationCases.free);
  const reevaluated = evaluationRequestSchema.safeParse({
    ...evaluationCases.free,
    verificationResult: {
      verificationPerformed: "Consulté el canal oficial.",
      observedResult: "La entidad indicó que no realizó el contacto.",
    },
  });

  assert.equal(initial.success, true);
  assert.equal(reevaluated.success, true);
});

test("rechaza campos requeridos vacíos o por encima de sus máximos", () => {
  const limits = {
    description: 10000,
    channel: 100,
    presentedIdentity: 200,
    priorRelationship: 500,
    requestedAction: 1000,
    doubtReason: 1000,
  };

  for (const [field, maximum] of Object.entries(limits)) {
    const empty = clone(evaluationCases.free);
    empty.interaction[field] = "   ";
    assert.equal(evaluationRequestSchema.safeParse(empty).success, false, `${field} vacío`);

    const oversized = clone(evaluationCases.free);
    oversized.interaction[field] = "x".repeat(maximum + 1);
    assert.equal(evaluationRequestSchema.safeParse(oversized).success, false, `${field} máximo`);
  }
});

test("valida los campos opcionales y rechaza propiedades extra", () => {
  const valid = clone(evaluationCases.free);
  valid.interaction.url = null;
  valid.interaction.observableOrigin = null;
  assert.equal(evaluationRequestSchema.safeParse(valid).success, true);

  const longUrl = clone(valid);
  longUrl.interaction.url = "x".repeat(2049);
  assert.equal(evaluationRequestSchema.safeParse(longUrl).success, false);

  const longOrigin = clone(valid);
  longOrigin.interaction.observableOrigin = "x".repeat(501);
  assert.equal(evaluationRequestSchema.safeParse(longOrigin).success, false);

  const extra = clone(valid);
  extra.caseId = "forbidden";
  assert.equal(evaluationRequestSchema.safeParse(extra).success, false);
});

test("valida verificationResult como null o como un único objeto estricto", () => {
  const missing = clone(evaluationCases.free);
  delete missing.verificationResult;
  assert.equal(evaluationRequestSchema.safeParse(missing).success, false);

  const incomplete = clone(evaluationCases.free);
  incomplete.verificationResult = { verificationPerformed: "Consulté." };
  assert.equal(evaluationRequestSchema.safeParse(incomplete).success, false);

  const extra = clone(evaluationCases.free);
  extra.verificationResult = {
    verificationPerformed: "Consulté.",
    observedResult: "No coincidía.",
    verified: true,
  };
  assert.equal(evaluationRequestSchema.safeParse(extra).success, false);

  const oversized = clone(evaluationCases.free);
  oversized.verificationResult = {
    verificationPerformed: "x".repeat(1001),
    observedResult: "x".repeat(2001),
  };
  assert.equal(evaluationRequestSchema.safeParse(oversized).success, false);
});

test("acepta una respuesta contractual completa", () => {
  assert.equal(evaluationResponseSchema.safeParse(buildEvaluationResponse()).success, true);
});

test("exige todas las secciones, enums exactos y objetos estrictos", () => {
  const missing = buildEvaluationResponse();
  delete missing.learning;
  assert.equal(evaluationResponseSchema.safeParse(missing).success, false);

  const invalidRisk = buildEvaluationResponse();
  invalidRisk.risk.level = "critical";
  assert.equal(evaluationResponseSchema.safeParse(invalidRisk).success, false);

  const invalidUncertainty = buildEvaluationResponse();
  invalidUncertainty.uncertainty.level = "undetermined";
  assert.equal(evaluationResponseSchema.safeParse(invalidUncertainty).success, false);

  const extra = buildEvaluationResponse();
  extra.confidence = 0.9;
  assert.equal(evaluationResponseSchema.safeParse(extra).success, false);
});

test("aplica máximos de listas y prioridades únicas ascendentes", () => {
  const tooMany = buildEvaluationResponse();
  tooMany.indicators = Array.from({ length: 13 }, () => tooMany.indicators[0]);
  assert.equal(evaluationResponseSchema.safeParse(tooMany).success, false);

  const duplicatePriorities = buildEvaluationResponse();
  duplicatePriorities.verificationSteps = [
    duplicatePriorities.verificationSteps[0],
    { ...duplicatePriorities.verificationSteps[0] },
  ];
  assert.equal(evaluationResponseSchema.safeParse(duplicatePriorities).success, false);

  const unordered = buildEvaluationResponse();
  unordered.verificationSteps = [
    { ...unordered.verificationSteps[0], priority: 2 },
    { ...unordered.verificationSteps[0], priority: 1 },
  ];
  assert.equal(evaluationResponseSchema.safeParse(unordered).success, false);
});

test("rechaza porcentajes y confianza numérica en la salida", () => {
  const percentage = buildEvaluationResponse();
  percentage.summary = "Existe un 80% de probabilidad de fraude.";
  assert.equal(evaluationResponseSchema.safeParse(percentage).success, false);

  const numericConfidence = buildEvaluationResponse();
  numericConfidence.summary = "La confianza es 0.8.";
  assert.equal(evaluationResponseSchema.safeParse(numericConfidence).success, false);
});

test("el schema Gemini omite phase y produce JSON Schema estructurado", () => {
  const content = buildEvaluationContent();
  assert.equal(geminiEvaluationContentSchema.safeParse(content).success, true);
  assert.equal(geminiEvaluationContentSchema.safeParse({ phase: "initial", ...content }).success, false);
  assert.equal(geminiEvaluationJsonSchema.type, "object");
  assert.equal(geminiEvaluationJsonSchema.additionalProperties, false);
  assert.equal("phase" in geminiEvaluationJsonSchema.properties, false);
});
