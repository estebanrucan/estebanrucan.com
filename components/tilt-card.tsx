"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareOpacity?: number
  tiltAmount?: number
  perspective?: number
  glareColor?: string
}

export default function TiltCard({
  children,
  className = "",
  glareOpacity = 0.2,
  tiltAmount = 10,
  perspective = 1000,
  glareColor = "rgba(124, 58, 237, 0.5)", // Color púrpura para tema de IA
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount
    const rotateX = -((mouseY / (rect.height / 2)) * tiltAmount)

    setRotation({ x: rotateX, y: rotateY })

    // Calculate glare position (inverted from mouse position)
    const glareX = (mouseX / rect.width) * 100
    const glareY = (mouseY / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}

      {/* Neural glow effect - simula el brillo de las conexiones neuronales */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 80%)`,
          opacity: isHovered ? glareOpacity * 2 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Neural network pattern overlay - añade un patrón sutil de red neuronal */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-5 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      )}
    </motion.div>
  )
}

