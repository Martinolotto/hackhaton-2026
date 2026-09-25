import assert from "node:assert/strict";
import test from "node:test";
import { geminiEvaluationJsonSchema } from "../src/schemas/evaluation.schemas.js";
import { createNvidiaProvider } from "../src/services/providers/nvidia.provider.js";

const baseInput = {
  model: "z-ai/glm-5.3-flash",
  textInput: "contexto aportado",
  image: null,
  systemInstruction: "instrucción de evaluación",
  jsonSchema: geminiEvaluationJsonSchema,
  timeoutMs: 10_000,
};

test("NVIDIA recibe texto, instrucción JSON y timeout sin retry", async () => {
  let capturedRequest;
  let capturedOptions;
  const provider = createNvidiaProvider({
    createCompletion: async (request, options) => {
      capturedRequest = request;
      capturedOptions = options;
      return { choices: [{ message: { content: '{"ok":true}' } }] };
    },
  });

  const output = await provider(baseInput);

  assert.equal(output, '{"ok":true}');
  assert.equal(capturedRequest.model, baseInput.model);
  assert.equal(capturedRequest.messages[1].content, baseInput.textInput);
  assert.equal(capturedRequest.messages[0].content.includes("JSON Schema"), true);
  assert.equal(capturedRequest.messages[0].content.includes('"summary"'), true);
  assert.equal("response_format" in capturedRequest, false);
  assert.deepEqual(capturedOptions, { timeout: 10_000, maxRetries: 0 });
});

test("NVIDIA recibe imagen como data URL OpenAI-compatible", async () => {
  let capturedRequest;
  const image = {
    mimeType: "image/webp",
    buffer: Buffer.from("small-image"),
  };
  const provider = createNvidiaProvider({
    createCompletion: async (request) => {
      capturedRequest = request;
      return { choices: [{ message: { content: '{"ok":true}' } }] };
    },
  });

  await provider({ ...baseInput, image });

  assert.deepEqual(capturedRequest.messages[1].content, [
    { type: "text", text: baseInput.textInput },
    {
      type: "image_url",
      image_url: {
        url: `data:${image.mimeType};base64,${image.buffer.toString("base64")}`,
      },
    },
  ]);
});
