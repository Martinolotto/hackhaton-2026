import OpenAI from "openai";
import { env } from "./env.js";

export const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";

let nvidiaClient;

export function getNvidiaClient() {
  if (!nvidiaClient) {
    nvidiaClient = new OpenAI({
      apiKey: env.nvidiaApiKey,
      baseURL: NVIDIA_BASE_URL,
      maxRetries: 0,
    });
  }

  return nvidiaClient;
}

export function createNvidiaCompletion(request, options) {
  return getNvidiaClient().chat.completions.create(request, options);
}
