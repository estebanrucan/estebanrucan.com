"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLanguageChange = (lang: "es" | "en") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="fixed left-6 top-6 z-50">
      <div className="relative">
        <motion.button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-105 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <img
              src={language === "es" ? "/es-flag.svg" : "/gb-flag.svg"}
              alt={language === "es" ? "Español" : "English"}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-40 rounded-lg bg-white shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === "es" ? "Seleccionar idioma" : "Select language"}
              </div>
              <div className="p-1">
                <button
                  onClick={() => handleLanguageChange("es")}
                  className={`flex w-full items-center space-x-2 rounded-md p-2 transition-colors ${
                    language === "es"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="relative h-5 w-5 overflow-hidden rounded-full">
                    <img src="/es-flag.svg" alt="Español" className="h-full w-full object-cover" />
                  </div>
                  <span>Español</span>
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex w-full items-center space-x-2 rounded-md p-2 transition-colors ${
                    language === "en"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="relative h-5 w-5 overflow-hidden rounded-full">
                    <img src="/gb-flag.svg" alt="English" className="h-full w-full object-cover" />
                  </div>
                  <span>English</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

