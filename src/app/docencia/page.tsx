import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Footer } from "@/components/site/footer";
import { ProfileVisual } from "@/components/site/profile-visual";
import { contact, teaching } from "@/content/site";

export const metadata = {
  title: "Docencia",
};

export default function TeachingPage() {
  return (
    <main className="page page--teaching">
      <section className="teaching-hero shell">
        <div className="teaching-hero__copy">
          <h1 className="display-heading">
            También <span>enseño.</span>
          </h1>
          <p className="page-lead">{teaching.intro}</p>
        </div>
        <ProfileVisual variant="teaching" />
      </section>

      <section className="teaching-grid shell">
        <article>
          <span>01</span>
          <h2>Dónde he enseñado y relatado</h2>
          <ul className="institution-list">
            {teaching.institutions.map((institution) => (
              <li key={institution}>{institution}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>02</span>
          <h2>Qué suelo enseñar</h2>
          <ul className="topic-list">
            {teaching.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>03</span>
          <h2>Por qué esto importa</h2>
          <p>{teaching.why}</p>
        </article>
      </section>

      <section className="teaching-quote shell">
        <span aria-hidden="true">“</span>
        <blockquote>{teaching.quote}</blockquote>
      </section>

      <section className="teaching-cta shell">
        <p>Si estás armando una charla, curso o conversación técnica, hablemos.</p>
        <div className="button-row">
          <Link href="/contacto" className="button button--primary">
            Escribirme
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
          <Link href={contact.linkedin} className="button button--ghost">
            Ver LinkedIn
            <ExternalLink size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer className="shell" />
    </main>
  );
}
