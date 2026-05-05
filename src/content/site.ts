import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  CheckCircle2,
  Database,
  FileSearch,
  LineChart,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

export type SiteRoute = {
  href: string;
  label: string;
  commandLabel?: string;
};

export type Principle = {
  number: string;
  title: string;
  body: string;
};

export type TimelineEntry = {
  period: string;
  company: string;
  role: string;
  context: string;
  summary: string;
};

export type EducationEntry = {
  period: string;
  institution: string;
  shortName: string;
  degree: string;
  focus: string;
};

export type CaseStudy = {
  number: string;
  slug: string;
  title: string;
  shortProblem: string;
  important: string;
  notDoing: string;
  tags: string[];
  eyebrow: string;
  intro: string;
};

export type ArchitectureStep = {
  label: string;
  icon: LucideIcon;
};

export const routes: SiteRoute[] = [
  { href: "/", label: "Inicio", commandLabel: "Ir a inicio" },
  { href: "/sobre-mi", label: "Sobre mí", commandLabel: "Leer sobre mí" },
  { href: "/sobre-mi#como-pienso", label: "Cómo pienso", commandLabel: "Ver cómo pienso" },
  { href: "/trayectoria", label: "Trayectoria", commandLabel: "Ver trayectoria" },
  { href: "/casos", label: "Casos", commandLabel: "Explorar casos" },
  { href: "/docencia", label: "Docencia", commandLabel: "Ver docencia" },
  { href: "/contacto", label: "Contacto", commandLabel: "Contactar" },
];

export const contact = {
  email: "errucan@gmail.com",
  linkedin: "https://www.linkedin.com/in/estebanrucan",
  github: "https://github.com/estebanrucan",
  location: "Santiago, Chile",
};

export const profile = {
  name: "Esteban Rucán",
  role: "AI Engineer",
  location: "Santiago, Chile",
  languages: "Español nativo · Inglés profesional",
  image: "/images/esteban-cutout.png",
  sourceImage: "/images/esteban-source.png",
};

export const home = {
  headline: "Construyo IA que llega a producción. Y después la explico hasta que la entienda quien la va a usar.",
  intro:
    "Vengo de la estadística. Hoy llevo IA generativa, NLP y MLOps a producción sobre Google Cloud Platform, con foco en ventas, operación y calidad de atención.",
  pillars: [
    "Una demo no es un producto.",
    "Si negocio no lo entiende, no está listo.",
    "La IA necesita criterio antes que entusiasmo.",
  ],
  featuredCase: {
    label: "Un caso para empezar",
    title: "Speech Analytics end-to-end",
    problem: "muchas conversaciones y poca lectura operativa sobre calidad de atención.",
    decision: "un flujo en GCP con Airflow, Gemini, BigQuery ML y Power BI.",
    result: "TMO menor en decenas de segundos y más visibilidad para gestionar calidad.",
  },
};

export const about = {
  headline: "No llegué a la IA por moda.",
  paragraphs: [
    "Vengo de la estadística. Después profundicé en ciencia de datos y project management para construir con más criterio técnico y más cercanía al negocio.",
    "Hoy trabajo en IA generativa, agentes, NLP y MLOps sobre Google Cloud Platform. Diseño sistemas que llegan a producción y se pueden operar.",
    "Me importan tres cosas: que el sistema resuelva un problema real, que se entienda y que deje una decisión mejor instalada.",
  ],
  quote:
    "Me interesa construir sistemas útiles. Y después dejar claro por qué existen, cómo funcionan y qué decisión ayudan a tomar.",
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Una demo puede impresionar.",
    body: "Un producto sostiene valor.",
  },
  {
    number: "02",
    title: "La claridad no es documentación:",
    body: "es parte del producto.",
  },
  {
    number: "03",
    title: "La gobernanza de IA permite",
    body: "escalar con confianza.",
  },
  {
    number: "04",
    title: "Antes del modelo, hay que",
    body: "entender el problema.",
  },
];

export const thinkingStatements = [
  "Una demo no es un producto.",
  "Si no se puede explicar al área de negocio, no está terminado.",
  "La gobernanza de IA no es burocracia: es lo que permite que escale.",
  "Antes de entrenar un modelo, hay que entender el problema. Casi siempre el problema no es el que parece.",
];

export const timeline: TimelineEntry[] = [
  {
    period: "Feb. 2025 – Presente",
    company: "WOM Chile",
    role: "AI Engineer",
    context: "Speech Analytics, IA generativa y lineamientos técnicos en Cloud.",
    summary: "Convertí conversaciones de Call Center en señales para calidad y operación.",
  },
  {
    period: "Ene. 2024 – Feb. 2025",
    company: "ICB S.A.",
    role: "Data Analyst & Engineer",
    context: "Modelos predictivos, agentes de IA, ETL y MLOps en GCP.",
    summary: "Mejoré ventas en varios puntos y detección de anomalías en decenas de puntos.",
  },
  {
    period: "2023",
    company: "DATA UC",
    role: "Data Scientist",
    context: "Scraping, dashboards, modelos predictivos e IA generativa.",
    summary: "Construí insumos para decisiones de pricing en programas de posgrado.",
  },
  {
    period: "2022",
    company: "Entel S.A.",
    role: "Práctica profesional - NLP",
    context: "Procesamiento de lenguaje natural aplicado a atención al cliente.",
    summary: "Desarrollé análisis de sentimientos para optimizar procesos de atención.",
  },
];

export const education: EducationEntry[] = [
  {
    period: "2024",
    institution: "Universidad Adolfo Ibáñez",
    shortName: "UAI",
    degree: "Diplomado en Project Management",
    focus: "Gestión de proyectos, planificación y entrega de iniciativas técnicas con foco en valor.",
  },
  {
    period: "2023 – 2025",
    institution: "Pontificia Universidad Católica de Chile",
    shortName: "PUC",
    degree: "Magíster en Ciencia de Datos",
    focus: "Profundización en machine learning, MLOps e IA aplicada a problemas reales.",
  },
  {
    period: "2018 – 2022",
    institution: "Pontificia Universidad Católica de Chile",
    shortName: "PUC",
    degree: "Estadística",
    focus: "Base sólida en inferencia, modelamiento y análisis cuantitativo.",
  },
];

export const casesPage = {
  disclaimer:
    "Los casos muestran decisiones técnicas reales. Datos de clientes y métricas exactas están omitidos por confidencialidad.",
};

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    slug: "speech-analytics-calidad-atencion",
    title: "Speech Analytics end-to-end",
    shortProblem: "Había conversaciones suficientes para aprender de la atención, pero no una lectura clara de calidad y operación.",
    important: "Cerrar el ciclo entre audio, modelo, métrica y decisión.",
    notDoing: "No quedarme en transcripción ni en un dashboard aislado.",
    tags: ["GCP", "Gemini", "Speech Analytics"],
    eyebrow: "Caso de éxito",
    intro:
      "Diseñé y desplegué una solución de Speech Analytics en GCP para transformar llamadas en señales accionables de calidad de atención.",
  },
  {
    number: "02",
    slug: "agente-ia-apoyo-comercial",
    title: "Agente de IA para apoyo comercial",
    shortProblem: "El equipo comercial necesitaba convertir información disponible en acciones de venta con menos fricción.",
    important: "Que el agente calzara con el flujo comercial y llegara a adopción.",
    notDoing: "No construir una demo aislada del vendedor.",
    tags: ["IA generativa", "Agentes", "GCP"],
    eyebrow: "Caso de éxito",
    intro:
      "Desarrollé y llevé a adopción un agente de IA que apoyó el trabajo comercial y movió ventas en varios puntos durante su primer mes.",
  },
  {
    number: "03",
    slug: "modelos-predictivos-stock-mlops",
    title: "Anomalías de stock y MLOps",
    shortProblem: "La revisión de stock en camiones de autoventa necesitaba pasar de señal tardía a detección predictiva.",
    important: "Unir modelo, pipeline y despliegue para que la mejora llegara a la operación.",
    notDoing: "No dejar el modelo en un notebook desconectado de ETL y CI/CD.",
    tags: ["MLOps", "BigQuery", "CI/CD"],
    eyebrow: "Caso de éxito",
    intro:
      "Entrené modelos predictivos y automaticé flujos MLOps en Google Cloud para mejorar la detección de anomalías en decenas de puntos.",
  },
];

export const speechAnalyticsCase = {
  ...caseStudies[0],
  sections: [
    {
      number: "01",
      title: "Contexto de negocio",
      body:
        "En atención telefónica, la calidad no se entiende solo mirando promedios. Había que transformar conversaciones reales en señales que operación pudiera usar.",
    },
    {
      number: "02",
      title: "Restricciones",
      bullets: [
        "Procesar conversaciones de forma ordenada y trazable.",
        "Integrar IA generativa, analítica y visualización en un mismo flujo.",
        "Entregar una lectura clara para equipos técnicos y de negocio.",
      ],
    },
    {
      number: "03",
      title: "Decisiones clave",
      bullets: [
        "Orquesté el flujo end-to-end con Airflow.",
        "Usé Gemini para extraer señales desde conversaciones.",
        "Conecté BigQuery ML y Power BI para medición y seguimiento.",
      ],
    },
    {
      number: "05",
      title: "Impacto",
      bullets: [
        "TMO menor en decenas de segundos.",
        "Visibilidad completa sobre calidad de atención del Call Center.",
        "Mejor base para priorizar mejoras con evidencia.",
      ],
    },
    {
      number: "06",
      title: "Aprendizajes",
      bullets: [
        "Transcribir no basta. El valor aparece cuando la señal vuelve a la operación.",
        "La arquitectura importa tanto como el modelo cuando el sistema debe sostenerse en producción.",
      ],
    },
    {
      number: "07",
      title: "Qué quedó instalado",
      bullets: [
        "Un pipeline de Speech Analytics end-to-end.",
        "Métricas disponibles para seguimiento operativo.",
        "Un estándar técnico más claro para nuevas soluciones de IA.",
      ],
    },
  ],
};

export const architecture: ArchitectureStep[] = [
  { label: "Conversaciones", icon: FileSearch },
  { label: "Airflow", icon: Bot },
  { label: "Gemini", icon: Sparkles },
  { label: "BigQuery ML", icon: Database },
  { label: "Power BI", icon: LineChart },
  { label: "Seguimiento", icon: UserCheck },
];

export const teaching = {
  headline: "También enseño.",
  intro:
    "He enseñado Analytics y Machine Learning en la UC, modelos predictivos con Python en la Tesorería General de la República y adopción de IA generativa en organizaciones.",
  institutions: ["UC", "DUOC UC", "UAI", "Tesorería General de la República", "ICB", "WOM"],
  topics: [
    "IA generativa",
    "Modelos predictivos",
    "Machine Learning con R y Python",
    "Traducción de lo técnico a decisión de negocio",
  ],
  why:
    "La adopción no ocurre porque un modelo sea sofisticado. Ocurre cuando las personas entienden qué hace, cuándo confiar y cómo usarlo.",
  quote:
    "No me interesa impresionar con complejidad. Me interesa que una buena idea pueda entenderse, discutirse y ponerse en práctica.",
};

export const contactPage = {
  headline: "Si tiene sentido conversar, conversemos.",
  intro:
    "Trabajo mejor cuando el problema tiene una relación clara con el negocio, el usuario o una decisión que alguien necesita tomar.",
  closing:
    "No prometo magia. Prometo criterio, oficio y ganas de dejar las cosas funcionando.",
};

export const chatKnowledge = [
  {
    intent: ["vertex", "gcp", "google cloud", "producción", "produccion"],
    answer:
      "Sí. He llevado soluciones de IA y MLOps a producción sobre Google Cloud Platform, con foco en IA generativa, agentes, NLP y operación real. Lo más cercano en el sitio está en Casos y Trayectoria.",
    citation: "Casos · Trayectoria",
  },
  {
    intent: ["nlp", "lenguaje", "documentos", "atención", "atencion"],
    answer:
      "Sí. Mi experiencia en NLP cruza atención al cliente, Speech Analytics, análisis de sentimientos y sistemas con IA generativa. Me interesa especialmente que el sistema sea entendible y útil para el equipo que lo usa.",
    citation: "Casos · Sobre mí",
  },
  {
    intent: ["docencia", "enseña", "charla", "curso", "relator"],
    answer:
      "También enseño. He relatado y enseñado sobre IA generativa, Machine Learning, analítica y traducción de lo técnico a decisiones de negocio. Para mí comunicar no es accesorio: es parte del trabajo técnico.",
    citation: "Docencia",
  },
];

export const caseMetricRows = [
  { icon: Brain, label: "Problema:", value: home.featuredCase.problem },
  { icon: CheckCircle2, label: "Decisión:", value: home.featuredCase.decision },
  { icon: ShieldCheck, label: "Resultado:", value: home.featuredCase.result },
];
