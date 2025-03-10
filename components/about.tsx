"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { User } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import TiltCard from "./tilt-card"

export default function About() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-12 flex items-center justify-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className="text-3xl font-bold">{t("about.title")}</h2>
          </div>

          <TiltCard className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
            <div className="relative p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/50 dark:bg-blue-900/20" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-100/50 dark:bg-purple-900/20" />

              <div className="relative">
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{t("about.p1")}</p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{t("about.p2")}</p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{t("about.p3")}</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}

