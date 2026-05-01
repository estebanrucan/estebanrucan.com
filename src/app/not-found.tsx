import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page page--not-found">
      <section className="not-found shell">
        <p className="section-kicker">404</p>
        <h1 className="display-heading">Ese prompt no devolvió una página.</h1>
        <p className="page-lead">
          La ruta no existe o quedó fuera del contexto. Volvamos a una parte del sitio que sí está en producción.
        </p>
        <Link href="/" className="button button--ghost">
          <ArrowLeft size={19} aria-hidden="true" />
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
