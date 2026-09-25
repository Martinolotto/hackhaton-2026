import { GoogleGenAI } from "@google/genai";
import { env } from "./env.js";

let geminiClient;

export function getGeminiClient() {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }

  return geminiClient;
}

export function createGeminiInteraction(request, options) {
  return getGeminiClient().interactions.create(request, options);
}
