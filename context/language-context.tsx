"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Hero
    "hero.title": "ESTEBAN RUCÁN",
    "hero.subtitle": "Machine Learning Engineer",
    "hero.scroll": "Scroll para explorar",
    "hero.status": "Buscando nuevas oportunidades",

    // About
    "about.title": "Sobre mí",
    "about.p1":
      "Soy un profesional con alto sentido de la responsabilidad y proactividad. Me considero una persona agradable para trabajar en equipo, siempre dispuesto a colaborar y brindar apoyo a quienes me rodean.",
    "about.p2":
      "Destaco por una comunicación clara y empática, logrando involucrar eficazmente a stakeholders no técnicos, aumentando su confianza y fomentando la adopción de IA en sus procesos.",
    "about.p3":
      "Me apasiona la tecnología, y me encuentro en constante aprendizaje para mantenerme actualizado en las últimas tendencias y herramientas de la industria.",

    // Experience
    "experience.title": "Experiencia",
    "experience.job0.title": "Data Scientist Engineer",
    "experience.job0.company": "WOM Chile",
    "experience.job0.period": "2024 - Actualidad",
    "experience.job0.achievement1":
      "Implementación de soluciones de Machine Learning en Vertex AI para proyecto STT (Speech-to-Text).",
    "experience.job0.achievement2":
      "Desarrollo de modelos predictivos utilizando herramientas de Google Cloud Platform.",
    "experience.job0.achievement3":
      "Optimización de flujos de datos y procesos de análisis para mejorar la eficiencia operativa.",

    "experience.job1.title": "Data Analyst",
    "experience.job1.company": "IC S.A.",
    "experience.job1.period": "2024",
    "experience.job1.achievement1":
      "Diseñé e implementé un modelo predictivo que mejoró la detección de anomalías de stock en camiones de autoventa en un 63%.",
    "experience.job1.achievement2":
      "Desarrollé un asistente de IA basado en LLMs, LangChain y LangGraph de apoyo a las ventas, logrando un aumento del 8% en ventas en el primer mes de adopción entre sus usuarios.",
    "experience.job1.achievement3":
      "Automaticé flujos MLOps, integrando modelos en Google Cloud con Docker y CI/CD para garantizar despliegues y mejoras continuas.",
    "experience.job1.achievement4":
      "Implementé flujos automatizados de ETL desde distintas fuentes de datos de la empresa, centralizándolos en un datalake construido sobre BigQuery para su análisis y explotación en distintos proyectos.",
    "experience.job1.achievement5": "Impulsé la adopción de IA en la empresa mediante charlas para diversas áreas.",

    "experience.job2.title": "Data Scientist",
    "experience.job2.company": "DATAUC - Estudios y Servicios Estadísticos",
    "experience.job2.period": "2023",
    "experience.job2.achievement1":
      "Formé parte de un proyecto de inteligencia comercial que definió nuevas estrategias de pricing para programas de posgrado de la UC.",
    "experience.job2.achievement2":
      "Desarrollé scrapers y pipelines de datos en Python para extraer información del mercado educativo, integrando datos con dashboards interactivos.",
    "experience.job2.achievement3":
      "Realicé modelos de machine learning y técnicas de IA Generativa para tomar decisiones en tiempo real acorde a las estrategias de la competencia.",

    "experience.job3.title": "Pasantía y Práctica Profesional",
    "experience.job3.company": "Entel S.A. - Gerencia de Innovación",
    "experience.job3.period": "2022",
    "experience.job3.achievement1":
      "Desarrollé dos proyectos de análisis de sentimientos y en la creación de soluciones basadas en Machine Learning para optimizar y mejorar procesos de atención a clientes del segmento de pymes.",

    "experience.job4.title": "Docente en Data Science e Inteligencia Artificial",
    "experience.job4.company": "Varias instituciones",
    "experience.job4.period": "2022 - Actualidad",
    "experience.job4.achievement1":
      "Fui relator en seminarios en DUOC UC y charlas en UAI, donde compartí mi experiencia en la implementación de soluciones de IA Generativa en la industria (2024).",
    "experience.job4.achievement2":
      "Relaté un curso de Aplicaciones de Riesgo Financiero con Python para funcionarios de la Tesorería General de la República, donde enseñé técnicas de Machine Learning para la predicción de riesgo de crédito (2023).",
    "experience.job4.achievement3":
      "Dirigí cursos de Machine Learning y python en la UC, impartiendo técnicas avanzadas como aprendizaje supervisado y no supervisado utilizando scikit-learn, además de herramientas esenciales de ciencia de datos como numpy, pandas, y matplotlib (2022, 2023, 2024).",
    "experience.job4.achievement4":
      "Facilité laboratorios prácticos en estadística y programación en la UC, introduciendo a estudiantes de primer año en el análisis de datos con R, asegurando una sólida base para futuros estudios avanzados (2023).",

    // Education
    "education.title": "Educación",
    "education.degree1.name": "Diplomado en Project Management",
    "education.degree1.institution": "Universidad Adolfo Ibañez",
    "education.degree1.period": "2024",
    "education.degree1.location": "Santiago, Chile",

    "education.degree2.name": "Magíster en Ciencia de Datos",
    "education.degree2.institution": "Pontificia Universidad Católica de Chile",
    "education.degree2.period": "2023 - Actualidad",
    "education.degree2.location": "Santiago, Chile",

    "education.degree3.name": "Estadística",
    "education.degree3.institution": "Pontificia Universidad Católica de Chile",
    "education.degree3.period": "2018 - 2022",
    "education.degree3.location": "Santiago, Chile",

    "education.awards.title": "Reconocimientos",
    "education.awards.name": "Beca Rolando Chuaqui 2021",
    "education.awards.description":
      "Otorgada por la Facultad de Matemáticas UC debido a la excelencia académica mostrada durante 2020.",

    // Skills
    "skills.title": "Habilidades",
    "skills.technical": "Habilidades Técnicas",
    "skills.other": "Otras Habilidades",
    "skills.language": "Inglés - Nivel B2",
    "skills.language.reading": "Reading",
    "skills.language.speaking": "Speaking",
    "skills.language.writing": "Writing",
    "skills.language.listening": "Listening",
    "skills.level.intermediate": "Intermedio",
    "skills.level.advanced": "Avanzado",

    // Contact
    "contact.title": "Contacto",
    "contact.location": "Ubicación",
    "contact.location.value": "Santiago, Chile",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",

    // Language Selector
    "language.select": "Seleccionar idioma",
  },
  en: {
    // Hero
    "hero.title": "ESTEBAN RUCÁN",
    "hero.subtitle": "Machine Learning Engineer",
    "hero.scroll": "Scroll to explore",
    "hero.status": "Looking for new opportunities",

    // About
    "about.title": "About me",
    "about.p1":
      "I am a professional with a high sense of responsibility and proactivity. I consider myself a pleasant person to work with in a team, always willing to collaborate and provide support to those around me.",
    "about.p2":
      "I stand out for clear and empathetic communication, effectively involving non-technical stakeholders, increasing their confidence and promoting the adoption of AI in their processes.",
    "about.p3":
      "I am passionate about technology, and I am constantly learning to stay updated on the latest trends and tools in the industry.",

    // Experience
    "experience.title": "Experience",
    "experience.job0.title": "Data Scientist Engineer",
    "experience.job0.company": "WOM Chile",
    "experience.job0.period": "2025 - Present",
    "experience.job0.achievement1":
      "Implementation of Machine Learning solutions in Vertex AI for STT (Speech-to-Text) project.",
    "experience.job0.achievement2": "Development of predictive models using Google Cloud Platform tools.",
    "experience.job0.achievement3":
      "Optimization of data flows and analysis processes to improve operational efficiency.",

    "experience.job1.title": "Data Analyst & Engineer",
    "experience.job1.company": "IC S.A.",
    "experience.job1.period": "2024",
    "experience.job1.achievement1":
      "Designed and implemented a predictive model that improved stock anomaly detection in self-service trucks by 63%.",
    "experience.job1.achievement2":
      "Developed an AI assistant based on LLMs, LangChain, and LangGraph to support sales, achieving an 8% increase in sales in the first month of adoption among its users.",
    "experience.job1.achievement3":
      "Automated MLOps workflows, integrating models in Google Cloud with Docker and CI/CD to ensure continuous deployments and improvements.",
    "experience.job1.achievement4":
      "Implemented automated ETL flows from different company data sources, centralizing them in a data lake built on BigQuery for analysis and exploitation in different projects.",
    "experience.job1.achievement5": "Promoted AI adoption in the company through talks for various areas.",

    "experience.job2.title": "Data Scientist",
    "experience.job2.company": "DATAUC - Statistical Studies and Services",
    "experience.job2.period": "2023",
    "experience.job2.achievement1":
      "Was part of a business intelligence project that defined new pricing strategies for UC postgraduate programs.",
    "experience.job2.achievement2":
      "Developed scrapers and data pipelines in Python to extract information from the educational market, integrating data with interactive dashboards.",
    "experience.job2.achievement3":
      "Created machine learning models and Generative AI techniques to make real-time decisions according to competitor strategies.",

    "experience.job3.title": "Internship and Professional Practice",
    "experience.job3.company": "Entel S.A. - Innovation Management",
    "experience.job3.period": "2022",
    "experience.job3.achievement1":
      "Developed two sentiment analysis projects and created Machine Learning-based solutions to optimize and improve customer service processes for the SME segment.",

    "experience.job4.title": "Data Science and Artificial Intelligence Instructor",
    "experience.job4.company": "Various institutions",
    "experience.job4.period": "2022 - Present",
    "experience.job4.achievement1":
      "Was a speaker at seminars at DUOC UC and talks at UAI, where I shared my experience in implementing Generative AI solutions in the industry (2024).",
    "experience.job4.achievement2":
      "Taught a Financial Risk Applications with Python course for officials of the General Treasury of the Republic, where I taught Machine Learning techniques for credit risk prediction (2023).",
    "experience.job4.achievement3":
      "Led Machine Learning and Python courses at UC, teaching advanced techniques such as supervised and unsupervised learning using scikit-learn, as well as essential data science tools such as numpy, pandas, and matplotlib (2022, 2023, 2024).",
    "experience.job4.achievement4":
      "Facilitated practical laboratories in statistics and programming at UC, introducing first-year students to data analysis with R, ensuring a solid foundation for future advanced studies (2023).",

    // Education
    "education.title": "Education",
    "education.degree1.name": "Diploma in Project Management",
    "education.degree1.institution": "Adolfo Ibañez University",
    "education.degree1.period": "2024",
    "education.degree1.location": "Santiago, Chile",

    "education.degree2.name": "Master in Data Science",
    "education.degree2.institution": "Pontifical Catholic University of Chile",
    "education.degree2.period": "2023 - Present",
    "education.degree2.location": "Santiago, Chile",

    "education.degree3.name": "Statistics",
    "education.degree3.institution": "Pontifical Catholic University of Chile",
    "education.degree3.period": "2018 - 2022",
    "education.degree3.location": "Santiago, Chile",

    "education.awards.title": "Awards",
    "education.awards.name": "Rolando Chuaqui Scholarship 2021",
    "education.awards.description":
      "Awarded by the UC Faculty of Mathematics due to the academic excellence shown during 2020.",

    // Skills
    "skills.title": "Skills",
    "skills.technical": "Technical Skills",
    "skills.other": "Other Skills",
    "skills.language": "English - B2 Level",
    "skills.language.reading": "Reading",
    "skills.language.speaking": "Speaking",
    "skills.language.writing": "Writing",
    "skills.language.listening": "Listening",
    "skills.level.intermediate": "Intermediate",
    "skills.level.advanced": "Advanced",

    // Contact
    "contact.title": "Contact",
    "contact.location": "Location",
    "contact.location.value": "Santiago, Chile",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",

    // Language Selector
    "language.select": "Select language",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

