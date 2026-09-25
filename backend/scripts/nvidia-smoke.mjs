import "dotenv/config";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import OpenAI from "openai";

const apiKey = process.env.NVIDIA_API_KEY?.trim();
const model = process.env.NVIDIA_MODEL?.trim();

if (!apiKey || !model) {
  throw new Error("Configurá NVIDIA_API_KEY y NVIDIA_MODEL en backend/.env.");
}

const client = new OpenAI({
  apiKey,
  baseURL: "https://integrate.api.nvidia.com/v1",
  maxRetries: 0,
  timeout: 30_000,
});
const mode = process.argv[2];
let content;

if (mode === "text") {
  content = "Respondé únicamente OK";
} else if (mode === "image") {
  const imagePath = process.argv[3];
  const mimeTypes = new Map([
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".webp", "image/webp"],
  ]);
  const mimeType = mimeTypes.get(extname(imagePath ?? "").toLowerCase());

  if (!imagePath || !mimeType) {
    throw new Error("Indicá una imagen local PNG, JPEG o WEBP.");
  }

  const image = await readFile(imagePath);
  content = [
    { type: "text", text: "Describí brevemente el contenido visible de esta imagen." },
    {
      type: "image_url",
      image_url: { url: `data:${mimeType};base64,${image.toString("base64")}` },
    },
  ];
} else {
  throw new Error("Usá el modo text o image.");
}

const completion = await client.chat.completions.create({
  model,
  messages: [{ role: "user", content }],
  temperature: 0.5,
  top_p: 1,
  max_tokens: 256,
  stream: false,
});

console.log(completion.choices[0]?.message?.content ?? "Sin contenido de respuesta");
