import Link from "next/link";
import { Code2, ExternalLink, Mail, MapPin } from "lucide-react";

import { contact, contactPage, profile } from "@/content/site";

export const metadata = {
  title: "Contacto",
};

export default function ContactPage() {
  return (
    <main className="page page--contact">
      <section className="contact-layout shell">
        <div>
          <p className="section-kicker">Contacto</p>
          <h1 className="display-heading">{contactPage.headline}</h1>
          <p className="page-lead">{contactPage.intro}</p>
        </div>

        <div className="contact-card">
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <a href={`mailto:${contact.email}`}>
            <Mail size={19} aria-hidden="true" />
            {contact.email}
          </a>
          <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={18} aria-hidden="true" />
            LinkedIn
          </Link>
          <Link href={contact.github} target="_blank" rel="noopener noreferrer">
            <Code2 size={19} aria-hidden="true" />
            GitHub
          </Link>
          <span>
            <MapPin size={19} aria-hidden="true" />
            {contact.location}
          </span>
        </div>
      </section>

      <section className="contact-closing shell">
        <p>{contactPage.closing}</p>
      </section>
    </main>
  );
}
