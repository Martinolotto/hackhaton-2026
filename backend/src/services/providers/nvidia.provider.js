import { createNvidiaCompletion } from "../../config/nvidia.js";

const JSON_ONLY_INSTRUCTION =
  "Respondé únicamente con un objeto JSON válido, sin Markdown, comentarios ni texto adicional.";

export function createNvidiaProvider({ createCompletion = createNvidiaCompletion } = {}) {
  return async function requestNvidiaEvaluation({
    model,
    textInput,
    image,
    systemInstruction,
    jsonSchema,
    timeoutMs,
  }) {
    const schemaInstruction = [
      JSON_ONLY_INSTRUCTION,
      "El objeto debe cumplir exactamente este JSON Schema:",
      JSON.stringify(jsonSchema),
    ].join("\n");
    const userContent = image
      ? [
          { type: "text", text: textInput },
          {
            type: "image_url",
            image_url: {
              url: `data:${image.mimeType};base64,${image.buffer.toString("base64")}`,
            },
          },
        ]
      : textInput;

    const completion = await createCompletion(
      {
        model,
        messages: [
          { role: "system", content: `${systemInstruction}\n\n${schemaInstruction}` },
          { role: "user", content: userContent },
        ],
        temperature: 0.5,
        top_p: 1,
        max_tokens: 4_096,
        stream: false,
      },
      { timeout: timeoutMs, maxRetries: 0 },
    );

    return completion?.choices?.[0]?.message?.content;
  };
}

export const requestNvidiaEvaluation = createNvidiaProvider();
