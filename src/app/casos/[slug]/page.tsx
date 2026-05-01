import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { caseStudies } from "@/content/site";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies
    .filter((item) => item.slug !== "speech-analytics-calidad-atencion")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug } = await params;
  const item = caseStudies.find((caseStudy) => caseStudy.slug === slug);

  return {
    title: item?.title ?? "Caso",
  };
}

export default async function GenericCasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = caseStudies.find((caseStudy) => caseStudy.slug === slug);

  if (!item || item.slug === "speech-analytics-calidad-atencion") {
    notFound();
  }

  return (
    <main className="case-detail">
      <section className="case-detail-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/casos">Casos</Link>
          <span>/</span>
          <span>{item.title}</span>
        </nav>
        <div className="case-detail-hero__grid case-detail-hero__grid--simple">
          <div>
            <p className="section-kicker">{item.eyebrow}</p>
            <h1>{item.title}</h1>
            <p>{item.intro}</p>
          </div>
        </div>
      </section>

      <section className="case-paper">
        <div className="shell">
          <div className="case-paper__grid case-paper__grid--three">
            <article className="case-text-block">
              <div className="case-section-title">
                <span>01</span>
                <h2>Contexto de negocio</h2>
              </div>
              <p>{item.shortProblem}</p>
            </article>
            <article className="case-text-block">
              <div className="case-section-title">
                <span>02</span>
                <h2>Lo importante</h2>
              </div>
              <p>{item.important}</p>
            </article>
            <article className="case-text-block">
              <div className="case-section-title">
                <span>03</span>
                <h2>Qué decidí no hacer</h2>
              </div>
              <p>{item.notDoing}</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="case-detail-footer">
        <div className="shell">
          <Link href="/casos" className="back-link">
            <ArrowLeft size={19} aria-hidden="true" />
            Volver a casos
          </Link>
        </div>
      </footer>
    </main>
  );
}
