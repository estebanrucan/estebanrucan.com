import Link from "next/link";
import { ArrowUpRight, Code2, Mail, MapPin, MessageCircle } from "lucide-react";

import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

type FooterProps = {
  compact?: boolean;
  className?: string;
};

export function Footer({ compact = false, className }: FooterProps) {
  return (
    <footer className={cn("site-footer", compact && "site-footer--compact", className)}>
      <div className="footer-grid">
        <a href={`mailto:${contact.email}`} className="footer-link footer-link--primary">
          <Mail size={18} aria-hidden="true" />
          <span>
            <small>Escribir</small>
            {contact.email}
          </span>
        </a>
        <Link
          href={contact.linkedin}
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight size={17} aria-hidden="true" />
          <span>
            <small>Seguir</small>
            LinkedIn
          </span>
        </Link>
        <Link
          href={contact.github}
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code2 size={18} aria-hidden="true" />
          <span>
            <small>Ver código</small>
            GitHub
          </span>
        </Link>
        <span className="footer-link">
          <MapPin size={18} aria-hidden="true" />
          <span>
            <small>Ubicación</small>
            {contact.location}
          </span>
        </span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Esteban Rucán. Sitio diseñado y construido a mano.</span>
        {!compact ? (
          <span className="footer-chat-label">
            <MessageCircle size={17} aria-hidden="true" />
            Habla con mi CV
          </span>
        ) : null}
      </div>
    </footer>
  );
}
