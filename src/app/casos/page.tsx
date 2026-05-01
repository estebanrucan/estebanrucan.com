import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InteractiveRow } from "@/components/site/animated";
import { caseStudies } from "@/content/site";

export const metadata = {
  title: "Casos",
};

export default function CasesPage() {
  return (
    <main className="page page--cases">
      <section className="cases-hero shell">
        <h1 className="display-heading">
          Tres proyectos para <span>entender</span> cómo trabajo.
        </h1>
        <p className="page-lead">
          No busco mostrar tecnología por mostrar. Muestro el tipo de problema, la decisión que tomé y por qué ese
          enfoque tuvo sentido.
        </p>
      </section>

      <section className="cases-list shell" aria-label="Casos de éxito">
        {caseStudies.map((item) => (
          <InteractiveRow className="case-row" key={item.slug}>
            <span className="case-row__number">{item.number}</span>
            <h2>{item.title}</h2>
            <p>{item.shortProblem}</p>
            <div>
              <strong>Lo importante</strong>
              <span>{item.important}</span>
            </div>
            <div>
              <strong>Qué decidí no hacer</strong>
              <span>{item.notDoing}</span>
            </div>
            <Link href={`/casos/${item.slug}`} className="case-row__link">
              Leer caso
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </InteractiveRow>
        ))}
      </section>
    </main>
  );
}
