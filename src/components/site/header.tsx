"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "lucide-react";
import { useEffect, useState } from "react";

import { routes } from "@/content/site";
import { cn, isActivePath } from "@/lib/utils";
import { COMMAND_PALETTE_EVENT } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 14);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  function openPalette() {
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  }

  const mainNav = routes.filter((route) => !route.href.includes("#"));

  return (
    <>
      <div className={cn("site-header-wrapper", scrolled && "site-header-wrapper--scrolled")}>
        <header className={cn("site-header", scrolled && "site-header--scrolled")}>
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
              className={cn("mobile-menu-button", open && "mobile-menu-button--open")}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="mobile-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>
      </div>

      <button
        type="button"
        className={cn("mobile-nav-backdrop", open && "mobile-nav-backdrop--open")}
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />

      <aside className={cn("mobile-nav", open && "mobile-nav--open")} aria-hidden={!open}>
        <nav aria-label="Navegación móvil">
          {mainNav.map((route) => {
            const active = isActivePath(pathname, route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={cn("mobile-nav-link", active && "mobile-nav-link--active")}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <span>{route.label}</span>
                <span className="mobile-nav-link__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="mobile-nav__footer">
          <button
            type="button"
            className="command-trigger command-trigger--full"
            onClick={() => {
              setOpen(false);
              openPalette();
            }}
            tabIndex={open ? 0 : -1}
          >
            <Command size={14} aria-hidden="true" />
            Buscar
            <span className="command-trigger__keys" aria-hidden="true">
              {isMac ? "⌘" : "Ctrl"}
              <span>K</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
