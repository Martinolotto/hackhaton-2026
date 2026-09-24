import { useEffect } from "react";

const WIDGET_SCRIPT_ID = "anythingllm-chat-widget-script";

export default function AnythingLLMChat() {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_ANYTHINGLLM_BASE_URL?.replace(/\/$/, "");
    const embedId = import.meta.env.VITE_ANYTHINGLLM_EMBED_ID;

    if (!baseUrl || !embedId) {
      console.warn(
        "El chat de AnythingLLM no se cargó: faltan VITE_ANYTHINGLLM_BASE_URL o VITE_ANYTHINGLLM_EMBED_ID.",
      );
      return undefined;
    }

    if (document.getElementById(WIDGET_SCRIPT_ID)) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = WIDGET_SCRIPT_ID;
    script.async = true;
    script.src = `${baseUrl}/embed/anythingllm-chat-widget.min.js`;
    script.dataset.embedId = embedId;
    script.dataset.baseApiUrl = `${baseUrl}/api/embed`;
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}
