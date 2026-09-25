const RESPONSE_KEYS = [
  "phase",
  "summary",
  "indicators",
  "apparentLegitimacy",
  "evidence",
  "contradictions",
  "missingInformation",
  "risk",
  "uncertainty",
  "verificationSteps",
  "cautionGuidance",
  "learning",
  "limitations",
];

const ERROR_MESSAGES = {
  400: "Revisa los datos ingresados: la solicitud no cumple el formato esperado.",
  401: "Tu sesión falta o venció. Inicia sesión nuevamente para continuar.",
  413: "La información enviada supera el tamaño permitido. Reduce el texto e intenta nuevamente.",
  429: "Alcanzaste el límite temporal de evaluaciones.",
  500: "Ocurrió un error interno. Intenta nuevamente más tarde.",
  503: "El servicio de evaluación no está disponible en este momento. Intenta nuevamente más tarde.",
};

export class EvaluationApiError extends Error {
  constructor(message, { status = 0, code = "NETWORK_ERROR", retryAfter = null } = {}) {
    super(message);
    this.name = "EvaluationApiError";
    this.status = status;
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasExactKeys(value, expectedKeys) {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value).sort();
  return keys.length === expectedKeys.length && expectedKeys.every((key) => keys.includes(key));
}

function isBoundedString(value, maxLength) {
  return typeof value === "string" && value.length >= 1 && value.length <= maxLength;
}

function isStatement(value) {
  return (
    hasExactKeys(value, ["statement", "basis"]) &&
    isBoundedString(value.statement, 1000) &&
    ["user_provided", "inferred"].includes(value.basis)
  );
}

function isEvidence(value) {
  return (
    hasExactKeys(value, ["statement", "origin", "effect", "verificationStatus"]) &&
    isBoundedString(value.statement, 1000) &&
    ["user_input", "reported_verification_result"].includes(value.origin) &&
    ["supports_legitimacy", "raises_concern", "neutral"].includes(value.effect) &&
    ["not_independently_verified", "user_reported"].includes(value.verificationStatus)
  );
}

function isLevelWithExplanation(value, levels) {
  return (
    hasExactKeys(value, ["level", "explanation"]) &&
    levels.includes(value.level) &&
    isBoundedString(value.explanation, 2000)
  );
}

function isVerificationStep(value) {
  return (
    hasExactKeys(value, ["priority", "action", "reason"]) &&
    Number.isInteger(value.priority) &&
    value.priority >= 1 &&
    value.priority <= 5 &&
    isBoundedString(value.action, 1000) &&
    isBoundedString(value.reason, 1000)
  );
}

function isStringList(value, { min = 0, max, maxLength = 1000 }) {
  return (
    Array.isArray(value) &&
    value.length >= min &&
    value.length <= max &&
    value.every((item) => isBoundedString(item, maxLength))
  );
}

function hasUniquePriorities(steps) {
  return new Set(steps.map((step) => step.priority)).size === steps.length;
}

export function isEvaluationResponse(value) {
  return (
    hasExactKeys(value, RESPONSE_KEYS) &&
    ["initial", "reevaluated"].includes(value.phase) &&
    isBoundedString(value.summary, 2000) &&
    Array.isArray(value.indicators) &&
    value.indicators.length <= 12 &&
    value.indicators.every(isStatement) &&
    Array.isArray(value.apparentLegitimacy) &&
    value.apparentLegitimacy.length <= 12 &&
    value.apparentLegitimacy.every(isStatement) &&
    Array.isArray(value.evidence) &&
    value.evidence.length <= 12 &&
    value.evidence.every(isEvidence) &&
    isStringList(value.contradictions, { max: 12 }) &&
    isStringList(value.missingInformation, { max: 12 }) &&
    isLevelWithExplanation(value.risk, ["low", "medium", "high", "undetermined"]) &&
    isLevelWithExplanation(value.uncertainty, ["low", "medium", "high"]) &&
    Array.isArray(value.verificationSteps) &&
    value.verificationSteps.length >= 1 &&
    value.verificationSteps.length <= 5 &&
    value.verificationSteps.every(isVerificationStep) &&
    hasUniquePriorities(value.verificationSteps) &&
    isStringList(value.cautionGuidance, { min: 1, max: 8 }) &&
    isBoundedString(value.learning, 1500) &&
    isStringList(value.limitations, { min: 1, max: 8 })
  );
}

function getApiUrl() {
  const baseUrl = import.meta.env.VITE_API_URL?.trim();

  if (!baseUrl) {
    throw new EvaluationApiError(
      "Falta configurar VITE_API_URL. Define la URL base del backend para evaluar.",
      { code: "API_NOT_CONFIGURED" },
    );
  }

  return `${baseUrl.replace(/\/$/, "")}/api/evaluations`;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function createEvaluation({ interaction, verificationResult, accessToken, signal }) {
  if (!accessToken) {
    throw new EvaluationApiError(ERROR_MESSAGES[401], {
      status: 401,
      code: "UNAUTHORIZED",
    });
  }

  let response;

  try {
    response = await fetch(getApiUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interaction, verificationResult }),
      signal,
    });
  } catch (error) {
    if (error instanceof EvaluationApiError) throw error;
    if (error?.name === "AbortError") throw error;

    throw new EvaluationApiError(
      "No pudimos conectarnos con el servicio de evaluación. Revisa tu conexión e intenta nuevamente.",
      { code: "NETWORK_ERROR" },
    );
  }

  const payload = await readJson(response);

  if (!response.ok) {
    const retryAfterHeader = response.headers.get("Retry-After");
    const retryAfter = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) : null;
    const serverCode = payload?.error?.code;
    const defaultMessage = ERROR_MESSAGES[response.status] ?? ERROR_MESSAGES[500];
    const message = response.status === 429 && Number.isFinite(retryAfter)
      ? `${defaultMessage} Podrás reintentar en aproximadamente ${retryAfter} segundos.`
      : defaultMessage;

    throw new EvaluationApiError(message, {
      status: response.status,
      code: typeof serverCode === "string" ? serverCode : "INTERNAL_ERROR",
      retryAfter: Number.isFinite(retryAfter) ? retryAfter : null,
    });
  }

  if (!isEvaluationResponse(payload)) {
    throw new EvaluationApiError(
      "El servicio respondió con una evaluación incompleta o inválida. No mostraremos un resultado parcial.",
      { status: 503, code: "EVALUATION_UNAVAILABLE" },
    );
  }

  return payload;
}
