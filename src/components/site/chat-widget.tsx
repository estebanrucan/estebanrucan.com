"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle, X } from "lucide-react";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const STORAGE_KEY = "esteban-chat-session";

const initialMessage: ChatMessage = {
  role: "assistant",
  text:
    "Hola. Soy una versión interactiva de mi CV. Puedo responder sobre mi experiencia en IA, NLP, MLOps, docencia y casos.",
};

const quickReplies = [
  "¿Has llevado IA a producción en GCP?",
  "¿Cuál es tu experiencia en NLP?",
  "¿Haces docencia?",
];

function loadStoredMessages(): ChatMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (item): item is ChatMessage =>
        item && (item.role === "assistant" || item.role === "user") && typeof item.text === "string",
    );
  } catch {
    return null;
  }
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const hydrated = useRef(false);

  const showQuickReplies = useMemo(
    () => messages.length === 1 && !pending,
    [messages.length, pending],
  );
  const hidden = pathname.startsWith("/casos/");

  useEffect(() => {
    const stored = loadStoredMessages();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // sessionStorage may be unavailable (private mode); silently ignore.
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;

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
    if (!open) return;
    const node = messagesRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, open, pending]);

  if (hidden) {
    return null;
  }

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending) return;

    setError(null);
    setInput("");

    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setPending(true);

    const history = nextMessages
      .slice(0, -1)
      .filter((m) => m !== initialMessage)
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", text: m.text }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = (await response.json().catch(() => null)) as { text?: string; error?: string } | null;

      if (!response.ok || !data?.text) {
        const message = data?.error ?? "No pude responder ahora. Intenta de nuevo en un momento.";
        setError(message);
        return;
      }

      setMessages((current) => [...current, { role: "assistant", text: data.text! }]);
    } catch {
      setError("No pude conectar con el chat. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
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
                  En línea · Respuestas con Gemini
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
              </div>
            ))}
            {pending ? (
              <div className="chat-message chat-message--assistant chat-message--typing" aria-live="polite">
                <span className="chat-typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="chat-typing__sr">Escribiendo respuesta…</span>
              </div>
            ) : null}
            {error ? (
              <div className="chat-message chat-message--error" role="alert">
                <p>{error}</p>
              </div>
            ) : null}
            {showQuickReplies ? (
              <div className="chat-quick-replies" role="list">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="chat-quick-reply"
                    onClick={() => void ask(reply)}
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
              disabled={pending}
            />
            <button type="submit" aria-label="Enviar pregunta" disabled={!input.trim() || pending}>
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="chat-panel__hint">
            La conversación se guarda solo mientras esta pestaña esté abierta.
          </p>
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
