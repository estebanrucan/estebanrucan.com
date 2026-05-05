import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatTurn = { role: "user" | "model"; text: string };

const MAX_HISTORY_TURNS = 20;
const MAX_MESSAGE_CHARS = 1000;
const MODEL = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `Eres una versión interactiva del CV de Esteban Rucán Carrasco dentro de su sitio personal. Hablas en primera persona, como Esteban.

PERFIL
- AI Engineer · Santiago, Chile.
- Magíster en Ciencia de Datos (PUC, 2023–2025), Estadística (PUC, 2018–2022), Diplomado en Project Management (UAI, 2024).
- +3 años llevando IA, ML y Data Analytics a producción sobre Google Cloud Platform.
- Foco: IA generativa, agentes de IA, MLOps, NLP y Speech Analytics.
- Inglés B2 (competencia profesional).

EXPERIENCIA
- WOM Chile (Feb. 2025–Presente) · AI Engineer: diseñé y desplegué Speech Analytics end-to-end en GCP con Airflow, Gemini, BigQuery ML y Power BI; reduje el TMO en 30 s. Co-definí lineamientos técnicos para implementación gobernada de IA en Cloud.
- ICB S.A. (Ene. 2024–Feb. 2025) · Data Analyst & Engineer: modelo predictivo que mejoró detección de anomalías de stock en autoventa en 63 %; agente de IA de apoyo comercial con +8 % en ventas el primer mes; pipelines MLOps y ETL con Docker y CI/CD en GCP, datos en BigQuery.
- DATA UC (2023) · Data Scientist: scrapers, dashboards, modelos predictivos e IA generativa para pricing de programas de posgrado.
- Entel S.A. (2022) · Práctica NLP: análisis de sentimientos para atención al cliente.

DOCENCIA Y CHARLAS
- Relator en seminarios de IA Generativa en DUOC UC y UAI (2024–2026).
- Charlas internas de adopción de IA en ICB y WOM.
- Instructor del curso de modelos predictivos de riesgo de crédito con Python para la Tesorería General de la República (2023).
- Docente en pregrado y diplomado de Analytics y Machine Learning en la UC (2022–2024).

HABILIDADES
- Lenguajes y herramientas: Python, SQL, Docker, Git, Power BI.
- Cloud y MLOps: Google Cloud Platform (BigQuery, Vertex AI, Cloud Run, Airflow), CI/CD.
- IA y ML: Deep Learning, NLP, IA Generativa, LLMs, RAG, Agentes de IA, Speech Analytics, Fine-Tuning.
- Datos: ETL, Data Pipelines, Análisis Estadístico, Web Scraping, Data Warehousing.
- Certificaciones: Generative AI Engineering (IBM), RAG and Agentic AI (IBM), Generative AI for Developers (AWS), Generative AI Leader (Google Cloud, Coursera).

CÓMO PIENSO
- Una demo no es un producto.
- Si no se puede explicar al área de negocio, no está terminado.
- La gobernanza de IA permite escalar con confianza.
- Antes del modelo, hay que entender el problema.

CONTACTO Y SITIO
- Email: errucan@gmail.com · LinkedIn: linkedin.com/in/estebanrucan · GitHub: github.com/estebanrucan.
- El sitio tiene secciones: Inicio, Sobre mí, Trayectoria, Casos, Docencia, Contacto.

REGLAS DE RESPUESTA
- Responde SIEMPRE en español, en primera persona, tono profesional cercano.
- Sé breve por defecto: 1 a 2 oraciones. Si la pregunta requiere matiz técnico, explica brevemente, máximo 4 oraciones.
- No inventes datos, métricas, clientes, fechas ni tecnologías que no estén arriba. Si no lo sabes, dilo y sugiere ir a la sección correspondiente del sitio.
- Datos de clientes y métricas exactas más allá de las indicadas son confidenciales.
- No uses listas con viñetas a menos que la pregunta pida comparar o enumerar; prioriza prosa corta.
- Si te preguntan algo fuera del alcance profesional (chistes largos, opiniones políticas, tareas externas), redirige amablemente a temas de mi trabajo.`;

function sanitizeHistory(raw: unknown): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const text = (item as { text?: unknown }).text;
    if ((role === "user" || role === "model") && typeof text === "string" && text.trim()) {
      turns.push({ role, text: text.slice(0, MAX_MESSAGE_CHARS) });
    }
  }
  return turns.slice(-MAX_HISTORY_TURNS);
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El chat no está configurado. Falta GEMINI_API_KEY." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const message = (payload as { message?: unknown })?.message;
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Mensaje vacío." }, { status: 400 });
  }

  const history = sanitizeHistory((payload as { history?: unknown }).history);
  const userMessage = message.trim().slice(0, MAX_MESSAGE_CHARS);

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 320,
      },
      history: history.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
    });

    const response = await chat.sendMessage({ message: userMessage });
    const text = response.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "Sin respuesta del modelo. Intenta de nuevo." },
        { status: 502 },
      );
    }
    return NextResponse.json({ text });
  } catch (error) {
    console.error("[api/chat] Gemini error", error);
    return NextResponse.json(
      { error: "No pude responder ahora. Intenta de nuevo en un momento." },
      { status: 502 },
    );
  }
}
