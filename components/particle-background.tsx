"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const isDarkMode = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Función modificada para crear una red neuronal más densa
    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          color: isDarkMode.current
            ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`
            : `rgba(79, 70, 229, ${Math.random() * 0.2 + 0.1})`, // Color indigo para tema de IA
        })
      }
    }

    const updateParticles = () => {
      particles.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
    }

    // Función modificada para simular una red neuronal
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar los nodos (partículas)
      particles.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Dibujar las conexiones neuronales
      ctx.strokeStyle = isDarkMode.current ? "rgba(255, 255, 255, 0.07)" : "rgba(79, 70, 229, 0.07)"
      ctx.lineWidth = 0.8 // Líneas más delgadas para simular conexiones neuronales

      for (let i = 0; i < particles.current.length; i++) {
        // Conectar cada partícula con más partículas cercanas
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Aumentar el rango de conexión para simular más conexiones neuronales
          if (distance < 150) {
            // Gradiente de opacidad basado en la distancia
            const opacity = 1 - distance / 150
            ctx.strokeStyle = isDarkMode.current
              ? `rgba(255, 255, 255, ${opacity * 0.07})`
              : `rgba(79, 70, 229, ${opacity * 0.07})`

            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()

            // Ocasionalmente dibujar un "pulso" en la conexión para simular actividad neuronal
            if (Math.random() > 0.998) {
              const pulsePosition = Math.random()
              const pulseX = particles.current[i].x * (1 - pulsePosition) + particles.current[j].x * pulsePosition
              const pulseY = particles.current[i].y * (1 - pulsePosition) + particles.current[j].y * pulsePosition

              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = isDarkMode.current ? "rgba(255, 255, 255, 0.6)" : "rgba(124, 58, 237, 0.6)" // Color púrpura más brillante
              ctx.fill()
            }
          }
        }
      }
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    const checkDarkMode = () => {
      isDarkMode.current = document.documentElement.classList.contains("dark")
      initParticles()
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    checkDarkMode()
    animate()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-70" />
}

