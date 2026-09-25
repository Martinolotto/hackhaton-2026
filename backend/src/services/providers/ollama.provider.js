import { env } from "../../config/env.js";

export const OLLAMA_CHAT_URL = "https://ollama.com/api/chat";

const JSON_ONLY_INSTRUCTION =
  "DEVOLVER ÚNICAMENTE JSON válido, sin Markdown, comentarios ni texto adicional.";

function providerError(message, status) {
  return Object.assign(new Error(message), { name: "APIError", status });
}

function connectionError(cause) {
  return Object.assign(new Error("No se pudo conectar con Ollama Cloud.", { cause }), {
    name: "APIConnectionError",
  });
}

function timeoutError(cause) {
  return Object.assign(new Error("La solicitud a Ollama Cloud excedió el tiempo permitido.", { cause }), {
    name: "TimeoutError",
  });
}

export function createOllamaProvider({ fetchImplementation = fetch } = {}) {
  return async function requestOllamaEvaluation({
    model,
    textInput,
    systemInstruction,
    jsonSchema,
    timeoutMs,
  }) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const schemaInstruction = [
      JSON_ONLY_INSTRUCTION,
      "El objeto debe cumplir exactamente este JSON Schema:",
      JSON.stringify(jsonSchema),
    ].join("\n");

    try {
      let response;
      try {
        response = await fetchImplementation(OLLAMA_CHAT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.ollamaApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: `${systemInstruction}\n\n${schemaInstruction}` },
              { role: "user", content: textInput },
            ],
            stream: false,
          }),
          signal: controller.signal,
        });
      } catch (error) {
        if (error?.name === "AbortError" || controller.signal.aborted) {
          throw timeoutError(error);
        }
        if (error instanceof TypeError) {
          throw connectionError(error);
        }
        throw error;
      }

      if (!response.ok) {
        throw providerError("Ollama Cloud rechazó la solicitud.", response.status);
      }

      const payload = await response.json().catch(() => null);
      return payload?.message?.content;
    } finally {
      clearTimeout(timeout);
    }
  };
}

export const requestOllamaEvaluation = createOllamaProvider();
