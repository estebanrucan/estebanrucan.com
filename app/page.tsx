"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { LanguageProvider } from "@/context/language-context"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"
import LanguageSelector from "@/components/language-selector"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  // fade out effect en “scroll hint”
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9])

  // MODO OSCURO por defecto
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (!savedTheme) {
      // Si no hay preferencia, forzamos dark
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setDarkMode(true)
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }
  }, [])

  // CLICK DERECHO deshabilitado
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    window.addEventListener("contextmenu", handleContextMenu)
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <LanguageProvider>
      <div
        className="
          relative min-h-screen 
          bg-gradient-to-b from-gray-50 to-gray-100 
          text-gray-900 
          transition-colors duration-500 
          dark:from-gray-900 dark:to-gray-800 
          dark:text-gray-100
          overflow-hidden
        "
      >
        <CustomCursor />
        <ParticleBackground />

        <LanguageSelector />

        {/* Botón toggle dark mode */}
        <button
          onClick={toggleDarkMode}
          className="
            fixed right-4 md:right-6 top-4 md:top-6 z-50 
            rounded-full bg-white p-3 shadow-lg 
            transition-all duration-300 
            hover:scale-110 dark:bg-gray-800 
            border-2 border-gray-200 dark:border-gray-700
          "
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-indigo-700" />
          )}
        </button>

        {/* Barra de progreso al hacer scroll */}
        <motion.div
          className="fixed bottom-0 left-0 z-40 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* “Scroll para explorar” - hint */}
        <motion.div
          style={{ opacity, scale }}
          className="
            fixed bottom-10 right-10 z-40 
            rounded-full bg-white p-4 shadow-lg 
            dark:bg-gray-800
            hidden sm:block
          "
        >
          <p className="text-sm font-medium">Scroll para explorar</p>
        </motion.div>

        <main className="relative">
          <Hero />

          {/* Contenido principal */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 my-10 space-y-16">
            <About />
            <Experience />
            <Education />
            <Skills />
            <Contact />
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}