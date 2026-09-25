export const evaluationCases = {
  caseA: {
    interaction: {
      description:
        "Vi en TikTok una publicidad de una oferta laboral con testimonios y una cuenta que parece activa.",
      url: "https://example.invalid/empleo",
      channel: "TikTok",
      presentedIdentity: "Empresa que ofrece trabajo remoto",
      observableOrigin: "Cuenta de TikTok con poca presencia externa",
      priorRelationship: "No conocía previamente a la empresa.",
      requestedAction: "Completar un formulario para postularme.",
      doubtReason: "No encuentro referencias independientes ni un sitio oficial verificable.",
    },
    verificationResult: null,
  },
  caseB: {
    interaction: {
      description: "Un amigo me envió un enlace desde su cuenta conocida, pero el mensaje no parece habitual.",
      url: "https://example.invalid/enlace",
      channel: "Mensajería",
      presentedIdentity: "Un amigo",
      observableOrigin: "Cuenta conocida del amigo",
      priorRelationship: "Tenemos una relación previa y hablamos regularmente.",
      requestedAction: "Abrir el enlace.",
      doubtReason: "La URL es extraña y el comportamiento de la cuenta es inusual.",
    },
    verificationResult: null,
  },
  caseC: {
    interaction: {
      description: "Recibí una alerta urgente sobre un supuesto problema con mi cuenta.",
      url: "https://example.invalid/verificar",
      channel: "Mensaje de texto",
      presentedIdentity: "Entidad financiera conocida",
      observableOrigin: "Número desconocido",
      priorRelationship: "Soy cliente, pero nunca me contactaron desde ese número.",
      requestedAction: "Abrir el enlace e ingresar datos.",
      doubtReason: "El mensaje usa urgencia, un enlace externo y pide información sensible.",
    },
    verificationResult: null,
  },
  free: {
    interaction: {
      description: "Una persona en un marketplace pide continuar el pago fuera de la plataforma.",
      url: null,
      channel: "Marketplace",
      presentedIdentity: "Vendedor particular",
      observableOrigin: null,
      priorRelationship: "No existe relación previa.",
      requestedAction: "Transferir dinero por fuera de la plataforma.",
      doubtReason: "La solicitud evita las protecciones habituales del marketplace.",
    },
    verificationResult: null,
  },
};

export function buildEvaluationContent({ reportedVerification = false } = {}) {
  return {
    summary: "La interacción combina una solicitud relevante con elementos que requieren verificación independiente.",
    indicators: [
      {
        statement: "La acción solicitada puede exponer información o recursos.",
        basis: "inferred",
      },
    ],
    apparentLegitimacy: [
      {
        statement: "La identidad presentada resulta conocida para la persona.",
        basis: "user_provided",
      },
    ],
    evidence: [
      reportedVerification
        ? {
            statement: "La persona informó el resultado de una comprobación independiente.",
            origin: "reported_verification_result",
            effect: "raises_concern",
            verificationStatus: "user_reported",
          }
        : {
            statement: "La persona aportó el contenido y contexto de la interacción.",
            origin: "user_input",
            effect: "neutral",
            verificationStatus: "not_independently_verified",
          },
    ],
    contradictions: [],
    missingInformation: ["No se comprobó de forma independiente la identidad presentada."],
    risk: {
      level: "medium",
      explanation: "La acción solicitada justifica cautela mientras la identidad siga sin comprobarse.",
    },
    uncertainty: {
      level: "high",
      explanation: "Falta una confirmación obtenida mediante un canal oficial e independiente.",
    },
    verificationSteps: [
      {
        priority: 1,
        action: "Contactar a la entidad mediante un canal oficial obtenido de forma independiente.",
        reason: "Permite contrastar la identidad sin usar el medio dudoso.",
      },
    ],
    cautionGuidance: ["Pausar la acción solicitada hasta completar una verificación independiente."],
    learning: "La apariencia de legitimidad no reemplaza una comprobación por un canal independiente.",
    limitations: [
      "La información aportada no fue verificada externamente.",
      "Un riesgo bajo no significaría que la interacción sea segura; la decisión final pertenece a la persona.",
    ],
  };
}

export function buildEvaluationResponse({ phase = "initial", reportedVerification = false } = {}) {
  return {
    phase,
    ...buildEvaluationContent({ reportedVerification }),
  };
}
