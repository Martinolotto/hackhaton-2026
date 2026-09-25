import "dotenv/config";

const apiKey = process.env.OLLAMA_API_KEY?.trim();
const model = process.env.OLLAMA_MODEL?.trim();

if (!apiKey || !model) {
  throw new Error("Configurá OLLAMA_API_KEY y OLLAMA_MODEL en backend/.env.");
}

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30_000);

try {
  const response = await fetch("https://ollama.com/api/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: "Respondé únicamente OK" }],
      stream: false,
    }),
    signal: controller.signal,
  });

  if (!response.ok) {
    throw new Error(`Ollama Cloud respondió HTTP ${response.status}.`);
  }

  const payload = await response.json();
  console.log(payload?.message?.content ?? "Sin contenido de respuesta");
} finally {
  clearTimeout(timeout);
}
