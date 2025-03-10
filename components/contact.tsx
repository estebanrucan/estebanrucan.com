"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Linkedin, Github } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import TiltCard from "./tilt-card"

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="contact" className="relative py-20">
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
              <Linkedin className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <TiltCard className="overflow-hidden rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Linkedin className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("contact.linkedin")}</h3>
                <a
                  href="https://www.linkedin.com/in/estebanrucan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-2 inline-flex items-center rounded-full bg-blue-100 px-6 py-2 font-medium text-blue-700 transition-all duration-300 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  <span>linkedin.com/in/estebanrucan</span>
                  <div className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</div>
                </a>
              </motion.div>
            </TiltCard>

            <TiltCard className="overflow-hidden rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Github className="h-8 w-8 text-gray-800 dark:text-gray-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("contact.github")}</h3>
                <a
                  href="https://github.com/estebanrucan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-2 inline-flex items-center rounded-full bg-gray-100 px-6 py-2 font-medium text-gray-800 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <span>github.com/estebanrucan</span>
                  <div className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</div>
                </a>
              </motion.div>
            </TiltCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

