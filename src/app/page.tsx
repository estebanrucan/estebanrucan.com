import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn, Reveal } from "@/components/site/animated";
import { Footer } from "@/components/site/footer";
import { ProfileVisual } from "@/components/site/profile-visual";
import { caseMetricRows, home, profile } from "@/content/site";

export default function Home() {
  return (
    <main className="page page--home">
      <section className="home-hero shell">
        <FadeIn className="home-hero__copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__dot" aria-hidden="true" />
            Disponible para nuevos proyectos
          </p>
          <h1 className="home-title">
            Construyo <span>IA</span> que llega a producción. Y después la explico hasta que la entienda quien la va a usar.
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

        <FadeIn className="home-hero__media" delay={0.15}>
          <ProfileVisual variant="hero" showCaption={false} />
          <div className="home-hero__caption">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
            <small>{profile.location}</small>
          </div>
        </FadeIn>
      </section>

      <section className="idea-strip">
        <div className="shell idea-strip__inner">
          <p>Tres ideas que sostienen mi trabajo</p>
          {home.pillars.map((pillar, index) => (
            <Reveal key={pillar} className="idea-strip__item" delay={index * 0.08}>
              <span className="idea-strip__number" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="idea-strip__text">{pillar}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="featured-case shell">
        <Reveal className="featured-case__title">
          <p>{home.featuredCase.label}</p>
          <h2>{home.featuredCase.title}</h2>
          <Link href="/casos/speech-analytics-calidad-atencion" className="text-link">
            Leer caso
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="case-metrics">
          {caseMetricRows.map((row, index) => {
            const Icon = row.icon;
            return (
              <Reveal as="div" className="case-metric" key={row.label} delay={index * 0.06}>
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                <strong>{row.label}</strong>
                <span>{row.value}</span>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer className="shell" compact />
    </main>
  );
}
