import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Esteban Rucán - Machine Learning Engineer",
  description: "CV interactivo de Esteban Rucán, Machine Learning Engineer",
  icons: {
    icon: "/favicon.svg", // <-- Ruta al archivo SVG
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={
          inter.className +
          " bg-gradient-to-tr from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 " +
          " transition-colors duration-700 relative overflow-x-hidden"
        }
      >
        {children}
      </body>
    </html>
  )
}
