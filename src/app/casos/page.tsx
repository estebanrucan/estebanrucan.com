import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/animated";
import { caseStudies } from "@/content/site";

export const metadata = {
  title: "Casos",
};

export default function CasesPage() {
  return (
    <main className="page page--cases">
      <section className="cases-hero shell">
        <p className="section-kicker">Trabajo</p>
        <h1 className="display-heading">
          Tres proyectos para <span>entender</span> cómo trabajo.
        </h1>
        <p className="page-lead">
          No busco mostrar tecnología por mostrar. Muestro el tipo de problema, la decisión que tomé y por qué ese
          enfoque tuvo sentido.
        </p>
      </section>

      <section className="cases-grid shell" aria-label="Casos de éxito">
        {caseStudies.map((item, index) => (
          <Reveal
            as="article"
            key={item.slug}
            className="case-card"
            delay={index * 0.08}
          >
            <Link href={`/casos/${item.slug}`} className="case-card__link" aria-label={`Leer caso: ${item.title}`}>
              <div className="case-card__head">
                <span className="case-card__number">{item.number}</span>
                <ul className="case-card__tags" aria-label="Tecnologías">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <h2 className="case-card__title">{item.title}</h2>
              <p className="case-card__problem">{item.shortProblem}</p>

              <dl className="case-card__meta">
                <div>
                  <dt>Lo importante</dt>
                  <dd>{item.important}</dd>
                </div>
                <div>
                  <dt>Qué decidí no hacer</dt>
                  <dd>{item.notDoing}</dd>
                </div>
              </dl>

              <span className="case-card__cta">
                Leer caso
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      <Footer className="shell" />
    </main>
  );
}
