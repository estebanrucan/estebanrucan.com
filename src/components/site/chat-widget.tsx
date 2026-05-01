"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle, X } from "lucide-react";

import { chatKnowledge } from "@/content/site";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
  citation?: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  text:
    "Hola. Soy una versión breve de mi CV dentro del sitio. Puedo responder sobre experiencia en IA, NLP, MLOps, docencia y casos.",
  citation: "Sitio personal",
};

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const latest = useMemo(() => messages[messages.length - 1], [messages]);

  if (pathname.startsWith("/casos/")) {
    return null;
  }

  function answerFor(question: string): ChatMessage {
    const normalized = question.toLowerCase();
    const hit = chatKnowledge.find((item) => item.intent.some((word) => normalized.includes(word)));

    if (hit) {
      return { role: "assistant", text: hit.answer, citation: hit.citation };
    }

    return {
      role: "assistant",
      text:
        "Lo más honesto: si la pregunta es sobre mi forma de trabajar, parto por entender el problema de negocio, decido qué no conviene construir y recién después elijo la tecnología. En el sitio lo puedes ver especialmente en Casos y Cómo pienso.",
      citation: "Cómo pienso · Casos",
    };
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();

    if (!question) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: question }, answerFor(question)]);
    setInput("");
  }

  return (
    <div className="chat-widget">
      {open ? (
        <section className="chat-panel" aria-label="Habla con mi CV">
          <header className="chat-panel__header">
            <div>
              <strong>Habla con mi CV</strong>
              <span>Criterio, casos y trayectoria.</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div className="chat-panel__messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message chat-message--${message.role}`}>
                <p>{message.text}</p>
                {message.citation ? <small>{message.citation}</small> : null}
              </div>
            ))}
          </div>
          <form className="chat-panel__form" onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Preguntar por Vertex AI, NLP, docencia..."
              aria-label="Pregunta para el CV"
            />
            <button type="submit" aria-label="Enviar pregunta">
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="chat-panel__hint">{latest.citation}</p>
        </section>
      ) : null}

      <button type="button" className="chat-trigger" onClick={() => setOpen((value) => !value)}>
        <MessageCircle size={21} aria-hidden="true" />
        Habla con mi CV
      </button>
    </div>
  );
}
