"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";

import { routes } from "@/content/site";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="command-overlay" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
      <button className="command-backdrop" type="button" aria-label="Cerrar paleta" onClick={() => setOpen(false)} />
      <div className="command-panel">
        <div className="command-search">
          <Search size={18} aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Navegar..."
            aria-label="Buscar sección"
          />
          <button type="button" aria-label="Cerrar paleta" onClick={() => setOpen(false)}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="command-list">
          {matches.map((route) => (
            <button key={route.href} type="button" className="command-item" onClick={() => visit(route.href)}>
              <span>
                <strong>{route.label}</strong>
                <small>{route.commandLabel}</small>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
