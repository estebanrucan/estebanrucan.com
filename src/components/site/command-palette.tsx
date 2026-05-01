"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";

import { routes } from "@/content/site";

export const COMMAND_PALETTE_EVENT = "command-palette:open";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function onOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return routes;
    }

    return routes.filter((route) =>
      `${route.label} ${route.commandLabel ?? ""}`.toLowerCase().includes(needle),
    );
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const node = itemsRef.current[activeIndex];
    if (node) {
      node.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  function visit(href: string) {
    close();
    router.push(href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (matches.length === 0 ? 0 : (index + 1) % matches.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (matches.length === 0 ? 0 : (index - 1 + matches.length) % matches.length));
    } else if (event.key === "Enter") {
      const target = matches[activeIndex] ?? matches[0];
      if (target) {
        event.preventDefault();
        visit(target.href);
      }
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="command-overlay" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
      <button className="command-backdrop" type="button" aria-label="Cerrar paleta" onClick={close} />
      <div className="command-panel">
        <div className="command-search">
          <Search size={18} aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Navegar..."
            aria-label="Buscar sección"
            aria-activedescendant={matches[activeIndex] ? `command-item-${activeIndex}` : undefined}
          />
          <button type="button" aria-label="Cerrar paleta" onClick={close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="command-list" role="listbox">
          {matches.length === 0 ? (
            <p className="command-empty">Sin resultados para “{query}”.</p>
          ) : (
            matches.map((route, index) => (
              <button
                key={route.href}
                id={`command-item-${index}`}
                ref={(node) => {
                  itemsRef.current[index] = node;
                }}
                type="button"
                className={`command-item${index === activeIndex ? " command-item--active" : ""}`}
                onClick={() => visit(route.href)}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                aria-selected={index === activeIndex}
              >
                <span>
                  <strong>{route.label}</strong>
                  <small>{route.commandLabel}</small>
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))
          )}
        </div>
        <footer className="command-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            navegar
          </span>
          <span>
            <kbd>
              <CornerDownLeft size={11} aria-hidden="true" />
            </kbd>
            seleccionar
          </span>
          <span>
            <kbd>esc</kbd>
            cerrar
          </span>
        </footer>
      </div>
    </div>
  );
}
