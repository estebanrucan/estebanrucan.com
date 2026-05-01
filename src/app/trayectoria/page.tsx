import { Reveal } from "@/components/site/animated";
import { Footer } from "@/components/site/footer";
import { AccentHeading } from "@/components/site/section-heading";
import { timeline } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Trayectoria",
};

const changes = [
  "más criterio",
  "más cercanía al negocio",
  "más responsabilidad técnica",
  "más capacidad de comunicar y liderar adopción",
];

export default function TrajectoryPage() {
  return (
    <main className="page page--trajectory">
      <section className="trajectory-layout shell">
        <div className="trajectory-main">
          <AccentHeading accent="datos" className="trajectory-title">
            La línea entre datos, producto y negocio.
          </AccentHeading>
          <p className="page-lead">
            He trabajado en distintos contextos, pero siempre con la misma idea: usar datos e IA para resolver problemas
            concretos, no para adornar presentaciones.
          </p>

          <ol className="timeline">
            {timeline.map((entry, index) => {
              const isCurrent = index === 0;
              return (
                <Reveal
                  as="li"
                  className={cn("timeline-item", isCurrent && "timeline-item--current")}
                  key={`${entry.company}-${entry.period}`}
                  delay={index * 0.06}
                >
                  <div className="timeline-period">
                    {isCurrent ? (
                      <span className="timeline-badge" aria-label="Actual">
                        Actual
                      </span>
                    ) : null}
                    {entry.period}
                  </div>
                  <div className="timeline-content">
                    <h2>{entry.company}</h2>
                    <span>{entry.role}</span>
                    <p>{entry.context}</p>
                    <p>{entry.summary}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <aside className="trajectory-aside">
          <h2>Lo que cambió en cada etapa</h2>
          <ol className="change-list">
            {changes.map((change, index) => (
              <li key={change}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {change}
              </li>
            ))}
          </ol>
          <div className="today-card">
            <h3>Hoy</h3>
            <p>
              Construyo IA generativa, agentes, MLOps y productos de datos en producción, conectando tecnología con
              decisiones de negocio.
            </p>
          </div>
        </aside>
      </section>

      <Footer className="shell" compact />
    </main>
  );
}
