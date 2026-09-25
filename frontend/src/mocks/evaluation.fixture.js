export const initialEvaluationFixture = {
  phase: "initial",
  summary:
    "El mensaje combina una identidad conocida con urgencia y solicita abrir un enlace externo. Esas señales justifican pausar la acción y verificar por un canal independiente.",
  indicators: [
    {
      statement: "El mensaje solicita actuar con urgencia.",
      basis: "user_provided",
    },
    {
      statement: "La acción solicitada conduce fuera del canal habitual.",
      basis: "inferred",
    },
  ],
  apparentLegitimacy: [
    {
      statement: "La identidad presentada corresponde a una entidad conocida.",
      basis: "user_provided",
    },
  ],
  evidence: [
    {
      statement: "La persona recibió el contacto desde un número desconocido.",
      origin: "user_input",
      effect: "raises_concern",
      verificationStatus: "not_independently_verified",
    },
  ],
  contradictions: [
    "La identidad resulta familiar, pero el origen observado no coincide con un canal conocido.",
  ],
  missingInformation: [
    "No se confirmó el aviso desde la aplicación o el sitio oficial.",
    "No se verificó quién controla el enlace informado.",
  ],
  risk: {
    level: "high",
    explanation:
      "La urgencia, el enlace externo y el origen desconocido pueden exponer datos o acceso a la cuenta si se actúa sin verificar.",
  },
  uncertainty: {
    level: "medium",
    explanation:
      "La información fue aportada por la persona y todavía no existe una comprobación independiente del supuesto aviso.",
  },
  verificationSteps: [
    {
      priority: 1,
      action:
        "Abrir la aplicación oficial escribiendo la dirección conocida o usando el acceso habitual, sin tocar el enlace recibido.",
      reason: "Permite comprobar si existe una alerta real por un canal independiente.",
    },
    {
      priority: 2,
      action: "Contactar a la entidad mediante un número publicado oficialmente.",
      reason: "Permite contrastar la identidad y el pedido sin usar los datos del mensaje.",
    },
  ],
  cautionGuidance: [
    "No abras el enlace ni ingreses credenciales mientras el origen siga sin verificar.",
    "Si ya compartiste información, contacta cuanto antes a la entidad por un canal oficial.",
  ],
  learning:
    "Un nombre conocido o una presentación convincente aportan apariencia de legitimidad, pero no prueban quién envió el mensaje.",
  limitations: [
    "La URL no fue abierta ni analizada.",
    "Esta evaluación orienta una verificación; no certifica seguridad ni reemplaza la decisión de la persona.",
    "Riesgo bajo no significaría que una interacción sea segura.",
  ],
};

export const reevaluatedEvaluationFixture = {
  phase: "reevaluated",
  summary:
    "La comprobación informada no encontró una alerta en el canal oficial. Esto refuerza la cautela frente al mensaje recibido, aunque no identifica por sí solo a quien lo envió.",
  indicators: [
    {
      statement: "El mensaje solicita actuar con urgencia.",
      basis: "user_provided",
    },
    {
      statement: "El canal oficial no mostró el aviso descrito.",
      basis: "user_provided",
    },
  ],
  apparentLegitimacy: [
    {
      statement: "La identidad presentada corresponde a una entidad conocida.",
      basis: "user_provided",
    },
  ],
  evidence: [
    {
      statement: "La persona recibió el contacto desde un número desconocido.",
      origin: "user_input",
      effect: "raises_concern",
      verificationStatus: "not_independently_verified",
    },
    {
      statement: "La persona informó que no encontró alertas en la aplicación oficial.",
      origin: "reported_verification_result",
      effect: "raises_concern",
      verificationStatus: "user_reported",
    },
  ],
  contradictions: [
    "El mensaje afirma que existe una alerta, pero la comprobación informada no la encontró en el canal oficial.",
  ],
  missingInformation: [
    "No se verificó quién controla el enlace informado.",
  ],
  risk: {
    level: "high",
    explanation:
      "La contradicción con el canal oficial aumenta la conveniencia de no seguir las instrucciones del mensaje.",
  },
  uncertainty: {
    level: "low",
    explanation:
      "La comprobación aporta evidencia independiente útil, aunque el resultado fue informado por la persona y no identifica al remitente.",
  },
  verificationSteps: [
    {
      priority: 1,
      action: "Contactar a la entidad mediante un número publicado oficialmente.",
      reason: "Puede confirmar si hubo un contacto legítimo y orientar acciones posteriores.",
    },
  ],
  cautionGuidance: [
    "No abras el enlace ni respondas al número que inició el contacto.",
    "Conserva el mensaje únicamente si necesitas reportarlo por un canal oficial.",
  ],
  learning:
    "Contrastar un pedido en un canal independiente puede aportar evidencia nueva sin convertir el análisis en una certeza absoluta.",
  limitations: [
    "La URL no fue abierta ni analizada.",
    "La comprobación fue reportada por la persona y no fue observada directamente por el sistema.",
    "Esta evaluación orienta una verificación; no certifica seguridad ni reemplaza la decisión de la persona.",
  ],
};

export async function getDevelopmentEvaluationFixture(request) {
  if (!import.meta.env.DEV) {
    throw new Error("Los fixtures de evaluación solo están disponibles en desarrollo.");
  }

  await new Promise((resolve) => window.setTimeout(resolve, 450));
  return request.verificationResult
    ? structuredClone(reevaluatedEvaluationFixture)
    : structuredClone(initialEvaluationFixture);
}
