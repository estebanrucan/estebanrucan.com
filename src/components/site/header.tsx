"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { routes } from "@/content/site";
import { cn, isActivePath } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Ir al inicio">
        Esteban Rucán
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn("nav-link", isActivePath(pathname, route.href) && "nav-link--active")}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
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
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("mobile-nav-link", isActivePath(pathname, route.href) && "mobile-nav-link--active")}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
