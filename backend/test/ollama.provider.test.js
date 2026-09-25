import assert from "node:assert/strict";
import test from "node:test";
import { createOllamaProvider, OLLAMA_CHAT_URL } from "../src/services/providers/ollama.provider.js";

const jsonSchema = { type: "object", properties: { summary: { type: "string" } } };

test("Ollama recibe texto, schema JSON, Bearer y stream false", async () => {
  let capturedUrl;
  let capturedRequest;
  const provider = createOllamaProvider({
    fetchImplementation: async (url, request) => {
      capturedUrl = url;
      capturedRequest = request;
      return { ok: true, json: async () => ({ message: { content: '{"summary":"ok"}' } }) };
    },
  });

  const output = await provider({
    model: "gemma4:31b",
    textInput: "contexto de prueba",
    systemInstruction: "instrucción base",
    jsonSchema,
    timeoutMs: 15_000,
  });

  assert.equal(capturedUrl, OLLAMA_CHAT_URL);
  assert.equal(capturedRequest.headers["Content-Type"], "application/json");
  const body = JSON.parse(capturedRequest.body);
  assert.equal(body.model, "gemma4:31b");
  assert.equal(body.stream, false);
  assert.equal(body.messages[1].content, "contexto de prueba");
  assert.match(body.messages[0].content, /DEVOLVER ÚNICAMENTE JSON válido/);
  assert.match(body.messages[0].content, /summary/);
  assert.equal(output, '{"summary":"ok"}');
});

test("Ollama convierte abort en timeout clasificable", async () => {
  const provider = createOllamaProvider({
    fetchImplementation: async (_url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    }),
  });

  await assert.rejects(
    provider({ model: "gemma4:31b", textInput: "x", systemInstruction: "x", jsonSchema, timeoutMs: 1 }),
    { name: "TimeoutError" },
  );
});

test("respuesta exitosa sin contenido JSON no se convierte en error transitorio", async () => {
  const provider = createOllamaProvider({
    fetchImplementation: async () => ({ ok: true, json: async () => ({ message: {} }) }),
  });
  const output = await provider({
    model: "gemma4:31b",
    textInput: "x",
    systemInstruction: "x",
    jsonSchema,
    timeoutMs: 15_000,
  });
  assert.equal(output, undefined);
});
