"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, BarChart, Cloud, GitBranch, LineChart, Brain } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technicalSkills = [
    { name: "Machine Learning", level: 95, icon: Brain, category: t("skills.level.advanced") },
    { name: "Python", level: 90, icon: Code, category: t("skills.level.advanced") },
    { name: "Google Cloud Platform", level: 85, icon: Cloud, category: t("skills.level.advanced") },
    { name: "Vertex AI", level: 85, icon: BarChart, category: t("skills.level.advanced") },
    { name: "SQL", level: 80, icon: Database, category: t("skills.level.advanced") },
    { name: "MLOps", level: 75, icon: GitBranch, category: t("skills.level.intermediate") },
  ]

  const otherSkills = [
    "Análisis Estadístico",
    "Cloud Computing",
    "Dashboards",
    "Data Science",
    "Data Viz",
    "DB",
    "Deep Learning",
    "EDA",
    "GenAI",
    "Inteligencia Artificial",
    "Machine Learning",
    "MLOps",
    "NLP",
    "Optimización",
    "Version Control",
    "Web Scraping",
  ]

  const languages = [
    { name: t("skills.language.reading"), level: t("skills.level.intermediate") },
    { name: t("skills.language.speaking"), level: t("skills.level.intermediate") },
    { name: t("skills.language.writing"), level: t("skills.level.intermediate") },
    { name: t("skills.language.listening"), level: t("skills.level.intermediate") },
  ]

  return (
    <section id="skills" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-12 flex items-center justify-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
              <LineChart className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h2 className="text-3xl font-bold">{t("skills.title")}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xl font-bold">{t("skills.technical")}</h3>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <skill.icon className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + 0.3,
                          ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
                        }}
                      />
                    </div>

                    {/* Skill level indicator */}
                    <motion.div
                      className="relative mt-1"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 1.5 }}
                    >
                      <div
                        className="absolute h-4 w-1 bg-indigo-500 dark:bg-indigo-400"
                        style={{ left: `${skill.level}%`, transform: "translateX(-50%)" }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold">{t("skills.other")}</h3>
              <div className="flex flex-wrap gap-2">
                {otherSkills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="group relative rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-100 hover:shadow-md dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-indigo-900"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                    <span className="absolute inset-0 -z-10 scale-0 rounded-full bg-indigo-100 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 dark:bg-indigo-900/30"></span>
                  </motion.span>
                ))}
              </div>

              <h3 className="mb-6 mt-10 text-xl font-bold">{t("skills.language")}</h3>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="group overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
                  >
                    <div className="mb-2 text-gray-700 dark:text-gray-300">{lang.name}</div>
                    <div className="font-medium text-indigo-600 dark:text-indigo-400">{lang.level}</div>
                    <div className="mt-2 h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

