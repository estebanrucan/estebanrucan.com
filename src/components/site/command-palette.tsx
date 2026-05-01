"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";

import { routes } from "@/content/site";

export const COMMAND_PALETTE_EVENT = "command-palette:open";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
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

  function visit(href: string) {
    close();
    router.push(href);
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
            onKeyDown={(event) => {
              if (event.key === "Enter" && matches[0]) {
                event.preventDefault();
                visit(matches[0].href);
              }
            }}
            placeholder="Navegar..."
            aria-label="Buscar sección"
          />
          <button type="button" aria-label="Cerrar paleta" onClick={close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="command-list">
          {matches.length === 0 ? (
            <p className="command-empty">Sin resultados para “{query}”.</p>
          ) : (
            matches.map((route) => (
              <button key={route.href} type="button" className="command-item" onClick={() => visit(route.href)}>
                <span>
                  <strong>{route.label}</strong>
                  <small>{route.commandLabel}</small>
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
