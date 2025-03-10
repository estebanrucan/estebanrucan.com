"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Experience() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const experiences = [
    {
      title: t("experience.job0.title"),
      company: t("experience.job0.company"),
      period: t("experience.job0.period"),
      achievements: [
        t("experience.job0.achievement1"),
        t("experience.job0.achievement2"),
        t("experience.job0.achievement3"),
      ],
    },
    {
      title: t("experience.job1.title"),
      company: t("experience.job1.company"),
      period: t("experience.job1.period"),
      achievements: [
        t("experience.job1.achievement1"),
        t("experience.job1.achievement2"),
        t("experience.job1.achievement3"),
        t("experience.job1.achievement4"),
        t("experience.job1.achievement5"),
      ],
    },
    {
      title: t("experience.job2.title"),
      company: t("experience.job2.company"),
      period: t("experience.job2.period"),
      achievements: [
        t("experience.job2.achievement1"),
        t("experience.job2.achievement2"),
        t("experience.job2.achievement3"),
      ],
    },
    {
      title: t("experience.job3.title"),
      company: t("experience.job3.company"),
      period: t("experience.job3.period"),
      achievements: [t("experience.job3.achievement1")],
    },
    {
      title: t("experience.job4.title"),
      company: t("experience.job4.company"),
      period: t("experience.job4.period"),
      achievements: [
        t("experience.job4.achievement1"),
        t("experience.job4.achievement2"),
        t("experience.job4.achievement3"),
        t("experience.job4.achievement4"),
      ],
    },
  ]

  return (
    <section id="experience" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-12 flex items-center justify-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
              <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h2 className="text-3xl font-bold">{t("experience.title")}</h2>
          </div>

          <div className="relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-12 ml-6 last:mb-0"
              >
                {index < experiences.length - 1 && (
                  <div className="absolute bottom-0 left-0 top-0 -ml-[9px] w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400" />
                )}

                <motion.div
                  className="absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-purple-500 bg-white dark:bg-gray-800"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: index * 0.2 + 0.3,
                  }}
                />

                <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
                  <div className="border-b border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span>{exp.company}</span>
                      <span className="text-sm">•</span>
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 + 0.5 }}
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

