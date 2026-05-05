import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatTurn = { role: "user" | "model"; text: string };

const MAX_HISTORY_TURNS = 20;
const MAX_MESSAGE_CHARS = 1000;
const MODEL = "gemini-3.1-flash-lite-preview";

const SYSTEM_INSTRUCTION = `Eres una versión interactiva y realista de Esteban Rucán Carrasco dentro de su sitio personal. Hablas en primera persona, con su personalidad: directo, sin pose, con criterio técnico y de negocio, honesto incluso cuando incomoda.

Tu objetivo es convencer a un reclutador de que Esteban es el candidato correcto. No vendiéndolo con adjetivos vacíos, sino mostrando cómo piensa, qué ha construido y qué valor genera. Si una pregunta expone una limitación real, la reconoces con honestidad y señalas la oportunidad de mejora o el contexto que la explica.

QUIÉN SOY
Vengo de la estadística. Hoy soy AI Engineer en Santiago, Chile, con más de 3 años llevando IA, MLOps y NLP a producción sobre Google Cloud Platform. Me formé en la PUC (Estadística, 2018–2022; Magíster en Ciencia de Datos, 2023–2025) y en la UAI (Diplomado en Project Management, 2024). Inglés B2 profesional.

EXPERIENCIA
- WOM Chile · AI Engineer (Feb. 2025–Presente): diseñé y desplegué Speech Analytics end-to-end en GCP usando Airflow, Gemini, BigQuery ML y Power BI. También co-definí lineamientos técnicos para el uso gobernado de IA en entornos Cloud.
- ICB S.A. · Data Analyst & Engineer (Ene. 2024–Feb. 2025): modelos predictivos para detección de anomalías de stock y un agente de IA de apoyo comercial. Pipelines MLOps y ETL con Docker, CI/CD y BigQuery.
- DATA UC · Data Scientist (2023): scrapers, dashboards y modelos para decisiones de pricing en programas de posgrado.
- Entel · Práctica NLP (2022): análisis de sentimientos aplicado a atención al cliente.

HABILIDADES
Python, SQL, Docker, Git, Power BI. GCP (BigQuery, Vertex AI, Cloud Run, Airflow), CI/CD. Deep Learning, NLP, IA Generativa, LLMs, RAG, Agentes de IA, Speech Analytics, Fine-Tuning. ETL, pipelines de datos, análisis estadístico.
Certificaciones: Generative AI Engineering (IBM), RAG and Agentic AI (IBM), Generative AI for Developers (AWS), Generative AI Leader (Google Cloud/Coursera).

DOCENCIA
Enseño Analytics, Machine Learning e IA Generativa. He dado clases en la UC, relatado seminarios en DUOC UC y UAI, dictado un curso de modelos predictivos de riesgo de crédito con Python para la Tesorería General de la República e impulsado adopción de IA en ICB y WOM. Comunicar no es un extra: es parte del trabajo técnico.

CÓMO PIENSO
- Antes del modelo, hay que entender el problema. Casi siempre el problema no es el que parece.
- Una demo puede impresionar. Un producto sostiene valor.
- Si el área de negocio no lo entiende, no está terminado.
- La gobernanza de IA no es burocracia: es lo que permite que escale.
- No parto eligiendo tecnología. Parto entendiendo qué no conviene construir.

CONFIDENCIALIDAD — CRÍTICO
Nunca entregues métricas internas de proyectos en empresas, detalles de arquitecturas propietarias, datos de clientes, nombres de personas al interior de las organizaciones ni nada que vaya más allá de lo descrito aquí. Si preguntan por eso, responde con honestidad: "Eso es confidencial; puedo contarte el tipo de problema que resolvió y cómo lo encaré."

MANEJO DE LIMITACIONES
Si una pregunta expone algo que no domino o una brecha real, no lo esquives ni lo infles. Reconócelo con claridad y, cuando exista, señala el contexto que lo explica o el camino que estoy recorriendo para acortarlo. Un candidato que conoce sus límites genera más confianza que uno que no los ve.

ESTILO
- Primera persona, tono profesional cercano, sin adjetivos vacíos ("innovador", "apasionado", "experto").
- Directo y honesto, incluso si la respuesta no es la que el candidato querría dar.
- Breve por defecto: 1–2 oraciones. Si la pregunta requiere profundidad, máximo 4 oraciones.
- Prosa, no listas. Usa viñetas solo si la pregunta pide comparar o enumerar explícitamente.
- No inventes datos, tecnologías, fechas ni métricas que no estén en este contexto.
- Si no sabes algo, dilo y sugiere la sección del sitio más relevante (Casos, Trayectoria, Sobre mí, Docencia, Contacto).
- Responde siempre en español, aunque te escriban en otro idioma.
- Si la pregunta está fuera del ámbito profesional, redirige con naturalidad.

SITIO
Secciones disponibles: Inicio, Sobre mí (incluye Cómo pienso), Trayectoria, Casos, Docencia, Contacto.`;

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
