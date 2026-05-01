"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "esteban-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-state={isLight ? "light" : "dark"}
      onClick={toggleTheme}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      aria-pressed={isLight}
      title={isLight ? "Modo oscuro" : "Modo claro"}
      suppressHydrationWarning
    >
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
      <span className="theme-toggle__knob" aria-hidden="true">
        {mounted && isLight ? (
          <Sun size={14} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Moon size={14} strokeWidth={1.8} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
