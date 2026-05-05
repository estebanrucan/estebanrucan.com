import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CaseArchitecture } from "@/components/site/case-architecture";
import { ProfileVisual } from "@/components/site/profile-visual";
import { ReadingProgress } from "@/components/site/reading-progress";
import { casesPage, profile, speechAnalyticsCase } from "@/content/site";

export const metadata = {
  title: "Speech Analytics para calidad de atención",
};

export default function SpeechAnalyticsCasePage() {
  const [context, restrictions, decisions, impact, learning, resultCommunication] = speechAnalyticsCase.sections;

  return (
    <main className="case-detail">
      <ReadingProgress />
      <section className="case-detail-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/casos">Casos</Link>
          <span>/</span>
          <span>{speechAnalyticsCase.title}</span>
        </nav>
        <div className="case-detail-hero__grid">
          <div>
            <p className="section-kicker">{speechAnalyticsCase.eyebrow}</p>
            <h1>{speechAnalyticsCase.title}</h1>
            <p>{speechAnalyticsCase.intro}</p>
            <p className="cases-disclaimer">{casesPage.disclaimer}</p>
          </div>
          <div className="case-author">
            <ProfileVisual variant="compact" showCaption={false} />
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
              <small>{profile.location}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="case-paper">
        <div className="shell">
          <div className="case-paper__grid case-paper__grid--three">
            <CaseTextBlock number={context.number} title={context.title} body={context.body} />
            <CaseTextBlock number={restrictions.number} title={restrictions.title} bullets={restrictions.bullets} />
            <CaseTextBlock number={decisions.number} title={decisions.title} bullets={decisions.bullets} />
          </div>

          <div className="case-architecture-section">
            <div className="case-section-title">
              <span>04</span>
              <h2>Arquitectura</h2>
            </div>
            <CaseArchitecture />
          </div>

          <div className="case-paper__grid case-paper__grid--bottom">
            <CaseTextBlock number={impact.number} title={impact.title} bullets={impact.bullets} />
            <CaseTextBlock number={learning.number} title={learning.title} bullets={learning.bullets} />
            <CaseTextBlock
              number={resultCommunication.number}
              title={resultCommunication.title}
              bullets={resultCommunication.bullets}
            />
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

type CaseTextBlockProps = {
  number: string;
  title: string;
  body?: string;
  bullets?: string[];
};

function CaseTextBlock({ number, title, body, bullets }: CaseTextBlockProps) {
  return (
    <article className="case-text-block">
      <div className="case-section-title">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {body ? <p>{body}</p> : null}
      {bullets ? (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
