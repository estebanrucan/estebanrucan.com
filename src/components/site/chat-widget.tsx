"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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

const quickReplies = [
  "¿Has llevado IA a producción en GCP?",
  "¿Tu experiencia en NLP?",
  "¿Haces docencia?",
];

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const latest = useMemo(() => messages[messages.length - 1], [messages]);
  const hidden = pathname.startsWith("/casos/");
  const showQuickReplies = messages.length === 1;

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 60);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const node = messagesRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, open]);

  if (hidden) {
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

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }
    setMessages((current) => [...current, { role: "user", text: trimmed }, answerFor(trimmed)]);
    setInput("");
    inputRef.current?.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="chat-widget">
      {open ? (
        <section className="chat-panel" aria-label="Habla con mi CV">
          <header className="chat-panel__header">
            <div className="chat-panel__title">
              <span className="chat-panel__avatar" aria-hidden="true">
                ER
                <span className="chat-panel__status" />
              </span>
              <div>
                <strong>Habla con mi CV</strong>
                <span>
                  <span className="chat-panel__online-dot" aria-hidden="true" />
                  En línea · Respuesta automática
                </span>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div className="chat-panel__messages" ref={messagesRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message chat-message--${message.role}`}>
                <p>{message.text}</p>
                {message.citation ? <small>{message.citation}</small> : null}
              </div>
            ))}
            {showQuickReplies ? (
              <div className="chat-quick-replies" role="list">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="chat-quick-reply"
                    onClick={() => ask(reply)}
                    role="listitem"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <form className="chat-panel__form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Preguntar por Vertex AI, NLP, docencia..."
              aria-label="Pregunta para el CV"
            />
            <button type="submit" aria-label="Enviar pregunta" disabled={!input.trim()}>
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="chat-panel__hint">{latest.citation}</p>
        </section>
      ) : null}

      <button
        type="button"
        className="chat-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat con el CV" : "Abrir chat con el CV"}
      >
        <span className="chat-trigger__icon" aria-hidden="true">
          <MessageCircle size={20} />
          <span className="chat-trigger__pulse" />
        </span>
        <span className="chat-trigger__label">Habla con mi CV</span>
      </button>
    </div>
  );
}
