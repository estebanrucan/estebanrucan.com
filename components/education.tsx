"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import TiltCard from "./tilt-card"

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const education = [
    {
      degree: t("education.degree1.name"),
      institution: t("education.degree1.institution"),
      period: t("education.degree1.period"),
      location: t("education.degree1.location"),
    },
    {
      degree: t("education.degree2.name"),
      institution: t("education.degree2.institution"),
      period: t("education.degree2.period"),
      location: t("education.degree2.location"),
    },
    {
      degree: t("education.degree3.name"),
      institution: t("education.degree3.institution"),
      period: t("education.degree3.period"),
      location: t("education.degree3.location"),
    },
  ]

  return (
    <section id="education" className="relative py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-8 sm:mb-12 flex items-center justify-center">
            <div
              className="
                mr-4 flex h-12 w-12 items-center justify-center 
                rounded-full bg-green-100 dark:bg-green-900 shadow-lg
              "
            >
              <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-3xl font-bold">{t("education.title")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {education.map((edu, index) => (
              <TiltCard
                key={index}
                className="
                  glassmorphic 
                  group overflow-hidden rounded-xl shadow-lg 
                  transition-all duration-300 hover:shadow-xl
                "
                glareOpacity={0.1}
                tiltAmount={5}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="h-3 bg-gradient-to-r from-green-400 to-indigo-500" />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{edu.degree}</h3>
                    <p className="mb-1 text-gray-700 dark:text-gray-300">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{edu.period}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 sm:mt-12"
          >
            <TiltCard className="glassmorphic overflow-hidden rounded-xl p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <div
                  className="
                    mr-4 flex h-10 w-10 items-center justify-center 
                    rounded-full bg-yellow-100 dark:bg-yellow-900
                  "
                >
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-300">
                    🏆
                  </span>
                </div>
                <h3 className="text-xl font-bold">
                  {t("education.awards.title")}
                </h3>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                <h4 className="mb-1 font-semibold">
                  {t("education.awards.name")}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("education.awards.description")}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}