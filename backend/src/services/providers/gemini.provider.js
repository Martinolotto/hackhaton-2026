import { createGeminiInteraction } from "../../config/gemini.js";

export function createGeminiProvider({ createInteraction = createGeminiInteraction } = {}) {
  return async function requestGeminiEvaluation({
    model,
    textInput,
    image,
    systemInstruction,
    jsonSchema,
    timeoutMs,
  }) {
    const input = image
      ? [
          { type: "text", text: textInput },
          {
            type: "image",
            data: image.buffer.toString("base64"),
            mime_type: image.mimeType,
          },
        ]
      : textInput;

    const interaction = await createInteraction(
      {
        model,
        input,
        system_instruction: systemInstruction,
        response_format: {
          type: "text",
          mime_type: "application/json",
          schema: jsonSchema,
        },
        store: false,
        generation_config: {
          thinking_level: "low",
          max_output_tokens: 4_096,
        },
      },
      { timeout: timeoutMs, maxRetries: 0 },
    );

    return interaction?.output_text;
  };
}

export const requestGeminiEvaluation = createGeminiProvider();
