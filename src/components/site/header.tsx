"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { routes } from "@/content/site";
import { cn, isActivePath } from "@/lib/utils";
import { COMMAND_PALETTE_EVENT } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function openPalette() {
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  }

  const mainNav = routes.filter((route) => !route.href.includes("#"));

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Ir al inicio">
        Esteban Rucán
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {mainNav.map((route) => {
          const active = isActivePath(pathname, route.href);
          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={active ? "page" : undefined}
              className={cn("nav-link", active && "nav-link--active")}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="command-trigger"
          onClick={openPalette}
          aria-label="Abrir paleta de comandos"
          title="Buscar y navegar"
        >
          <Command size={14} aria-hidden="true" />
          <span className="command-trigger__keys" aria-hidden="true">
            {isMac ? "⌘" : "Ctrl"}
            <span>K</span>
          </span>
        </button>
        <div className="header-rule" aria-hidden="true" />
        <ThemeToggle />
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="mobile-nav">
          {mainNav.map((route) => {
            const active = isActivePath(pathname, route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={cn("mobile-nav-link", active && "mobile-nav-link--active")}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
