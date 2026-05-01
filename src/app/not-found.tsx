import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page page--not-found">
      <section className="not-found shell">
        <div className="not-found__terminal" aria-hidden="true">
          <div className="not-found__terminal-bar">
            <span />
            <span />
            <span />
            <small>~ /casos/no-existe</small>
          </div>
          <div className="not-found__terminal-body">
            <p>
              <span className="not-found__prompt">$</span> next find /ruta-solicitada
            </p>
            <p className="not-found__output">→ 404 · ese prompt no devolvió una página</p>
            <p>
              <span className="not-found__prompt">$</span> sugerencias --top
            </p>
          </div>
        </div>
        <p className="section-kicker">404</p>
        <h1 className="display-heading">
          Ese prompt <span>no devolvió</span> una página.
        </h1>
        <p className="page-lead">
          La ruta no existe o quedó fuera del contexto. Volvamos a una parte del sitio que sí está en producción.
        </p>
        <div className="button-row">
          <Link href="/" className="button button--primary">
            <ArrowLeft size={19} aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link href="/casos" className="button button--ghost">
            Ver casos
            <ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
