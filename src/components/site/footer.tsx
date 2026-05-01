import Link from "next/link";
import { Code2, ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

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
        <a href={`mailto:${contact.email}`} className="footer-link">
          <Mail size={18} aria-hidden="true" />
          {contact.email}
        </a>
        <Link href={contact.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
          <ExternalLink size={17} aria-hidden="true" />
          LinkedIn
        </Link>
        <Link href={contact.github} className="footer-link" target="_blank" rel="noopener noreferrer">
          <Code2 size={18} aria-hidden="true" />
          GitHub
        </Link>
        <span className="footer-link">
          <MapPin size={18} aria-hidden="true" />
          {contact.location}
        </span>
      </div>
      {!compact ? (
        <div className="footer-bottom">
          <span>© 2026 Esteban Rucán. Todos los derechos reservados.</span>
          <span className="footer-chat-label">
            <MessageCircle size={17} aria-hidden="true" />
            Habla con mi CV
          </span>
        </div>
      ) : null}
    </footer>
  );
}
