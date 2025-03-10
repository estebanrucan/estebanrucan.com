"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [trailPositions, setTrailPositions] = useState<
    Array<{ x: number; y: number }>
  >([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      // trailing effect
      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }]
        // Deja max 4
        if (newPositions.length > 4) {
          return newPositions.slice(-4)
        }
        return newPositions
      })
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant("default")
    const mouseEnterLink = () => setCursorVariant("hover")
    const mouseLeaveLink = () => setCursorVariant("default")

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", mouseEnterLink)
      link.addEventListener("mouseleave", mouseLeaveLink)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", mouseEnterLink)
        link.removeEventListener("mouseleave", mouseLeaveLink)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
      transition: {
        type: "tween",
        duration: 0.07,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(99, 102, 241, 0.4)",
      border: "2px solid rgba(255, 255, 255, 0.9)",
      boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
      transition: {
        type: "tween",
        duration: 0.07,
      },
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(124, 58, 237, 0.5)",
      border: "2px solid rgba(255, 255, 255, 1)",
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)",
      transition: {
        type: "tween",
        duration: 0.07,
      },
    },
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a,
        button {
          cursor: none;
        }
      `}</style>

      {/* trailing circles */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full md:block"
          style={{
            x: pos.x - 4,
            y: pos.y - 4,
            height: 8,
            width: 8,
            backgroundColor: "rgba(99, 102, 241, 0.4)",
            boxShadow: "0 0 5px rgba(99, 102, 241, 0.5)",
            opacity: 0.5 - i * 0.1,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        />
      ))}

      {/* Cursor principal */}
      <motion.div
        className="
          pointer-events-none fixed left-0 top-0 z-50 
          hidden rounded-full backdrop-blur-sm md:block
        "
        variants={variants}
        animate={cursorVariant}
      />
    </>
  )
}
