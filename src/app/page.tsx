import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/site/animated";
import { Footer } from "@/components/site/footer";
import { ProfileVisual } from "@/components/site/profile-visual";
import { caseMetricRows, home, profile } from "@/content/site";

export default function Home() {
  return (
    <main className="page page--home">
      <section className="home-hero shell">
        <FadeIn className="home-hero__copy">
          <h1 className="home-title">
            Construyo <span>IA</span> que llega
            <br />a producción. Y después
            <br />la explico hasta que la
            <br />entienda quien la va a usar.
          </h1>
          <p className="home-intro">{home.intro}</p>
          <div className="button-row">
            <Link href="/casos" className="button button--primary">
              Ver casos
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link href="/contacto" className="button button--ghost">
              Conversemos
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <div className="home-hero__media">
          <ProfileVisual variant="hero" showCaption={false} />
          <div className="home-hero__caption">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
            <small>{profile.location}</small>
          </div>
        </div>
      </section>

      <section className="idea-strip">
        <div className="shell idea-strip__inner">
          <p>Tres ideas que sostienen mi trabajo</p>
          {home.pillars.map((pillar) => (
            <span key={pillar}>{pillar}</span>
          ))}
        </div>
      </section>

      <section className="featured-case shell">
        <div className="featured-case__title">
          <p>{home.featuredCase.label}</p>
          <h2>{home.featuredCase.title}</h2>
          <Link href="/casos/speech-analytics-calidad-atencion" className="text-link">
            Leer caso
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>

        <div className="case-metrics">
          {caseMetricRows.map((row) => {
            const Icon = row.icon;
            return (
              <div className="case-metric" key={row.label}>
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                <strong>{row.label}</strong>
                <span>{row.value}</span>
              </div>
            );
          })}
        </div>
      </section>

      <Footer className="shell" compact />
    </main>
  );
}
