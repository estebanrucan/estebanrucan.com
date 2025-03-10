"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Github, Linkedin, MapPin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Hero() {
  const { t } = useLanguage()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || !containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const x = (e.clientX - centerX) / 25
      const y = (e.clientY - centerY) / 25

      parallaxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)
        rotateX(${y * -0.1}deg) rotateY(${x * 0.1}deg)`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      className="
        relative flex min-h-[calc(100vh-4rem)] flex-col items-center 
        justify-center
        px-4 sm:px-6 md:px-8
      "
    >
      {/* Fondo con burbujas animadas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20" />
        <div
          ref={parallaxRef}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-700/20 animate-float" />
          <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-700/20 animate-float-lg" />
          <div className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-pink-300/20 blur-2xl dark:bg-pink-700/20" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-violet-300/10 blur-3xl dark:bg-violet-700/10" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Contenedor para la foto con anillo pulsante */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 flex items-center justify-center">
          {/* Anillo pulsante */}
          <div
            className="
              absolute inset-0 rounded-full 
              bg-gradient-to-r from-purple-500 to-indigo-500 
              blur-xl opacity-40 animate-pulse
            "
          />
          {/* Imagen con mayor espacio arriba (object-[50%_10%]) */}
          <motion.div
            className="
              relative w-full h-full rounded-full 
              overflow-hidden border-4 border-white 
              dark:border-gray-800 shadow-xl
            "
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/perfil.jpg"
              alt="Esteban Rucán"
              fill
              className="object-cover object-[50%_10%]"
              priority
            />
          </motion.div>
        </div>

        {/* Título y subtítulo (leading-relaxed) */}
        <motion.h1
          className="
            mb-2 text-4xl sm:text-5xl md:text-6xl 
            font-bold tracking-tight leading-relaxed
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("hero.title")}
          </motion.span>
          <motion.span
            className="
              mt-2 block bg-gradient-to-r from-indigo-600 to-purple-600
              bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400
              text-3xl sm:text-4xl md:text-5xl leading-relaxed
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("hero.subtitle")}
          </motion.span>
        </motion.h1>

        {/* Ubicación */}
        <motion.div
          className="mt-2 flex items-center justify-center text-base sm:text-lg text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <MapPin className="mr-1 h-5 w-5" />
          <span>{t("contact.location.value")}</span>
        </motion.div>

        {/* Estado en color rojo */}
        <motion.div
          className="
            mt-4 inline-block rounded-full 
            bg-red-100 px-4 py-1 
            text-sm font-medium text-red-800 
            dark:bg-red-900/30 dark:text-red-300
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Enfocado en mi desarrollo profesional
        </motion.div>

        {/* Botones (GitHub / LinkedIn / flecha scroll) */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a
            href="https://github.com/estebanrucan"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative flex items-center space-x-2 
              overflow-hidden rounded-full bg-white px-6 py-3 
              font-medium text-gray-900 shadow-lg transition-all 
              duration-300 hover:scale-105 hover:shadow-xl 
              dark:bg-gray-800 dark:text-white
            "
          >
            <Github className="mr-2 h-5 w-5" />
            <span className="relative z-10">GitHub</span>
            <div
              className="
                absolute inset-0 -translate-x-full bg-gradient-to-r 
                from-gray-500 to-gray-700 opacity-0 transition-all 
                duration-300 group-hover:translate-x-0 
                group-hover:opacity-10
              "
            />
          </a>

          <a
            href="https://www.linkedin.com/in/estebanrucan"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative flex items-center space-x-2 
              overflow-hidden rounded-full bg-white px-6 py-3 
              font-medium text-gray-900 shadow-lg transition-all 
              duration-300 hover:scale-105 hover:shadow-xl 
              dark:bg-gray-800 dark:text-white
            "
          >
            <Linkedin className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="relative z-10">LinkedIn</span>
            <div
              className="
                absolute inset-0 -translate-x-full bg-gradient-to-r 
                from-blue-500 to-blue-700 opacity-0 transition-all 
                duration-300 group-hover:translate-x-0 
                group-hover:opacity-10
              "
            />
          </a>

          <motion.button
            onClick={scrollToAbout}
            className="
              group relative flex items-center space-x-2
              overflow-hidden rounded-full bg-white px-6 py-3
              font-medium text-gray-900 shadow-lg transition-all
              duration-300 hover:scale-105 hover:shadow-xl
              dark:bg-gray-800 dark:text-white
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <ArrowDown className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="relative z-10">Seguir explorando</span>
            <div
              className="
                absolute inset-0 -translate-x-full bg-gradient-to-r
                from-purple-500 to-pink-500 opacity-0 transition-all
                duration-300 group-hover:translate-x-0
                group-hover:opacity-10
              "
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}