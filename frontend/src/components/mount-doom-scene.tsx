"use client"

import { useRef, useEffect, useState } from "react"

export function MountDoomScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    let animationId: number

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ASCII mountain
      ctx.fillStyle = '#444'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      
      const mountain = [
        "    /\\    ",
        "   /  \\   ",
        "  /    \\  ",
        " /      \\ ",
        "/        \\",
        "|        |",
        "|        |",
        "|        |"
      ]

      mountain.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 200 + i * 15)
      })

      // Draw lava pool
      ctx.fillStyle = '#666'
      ctx.fillText("~~~~~~~~", canvas.width / 2, 320)

      // Update and draw particles
      setParticles(prev => {
        const newParticles = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          }))
          .filter(p => p.life > 0)

        // Add new particles
        if (Math.random() < 0.1) {
          newParticles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 20,
            y: 200,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 0.5,
            life: 60 + Math.random() * 40
          })
        }

        // Draw particles
        newParticles.forEach(p => {
          const alpha = p.life / 80
          ctx.fillStyle = `rgba(255, 165, 0, ${alpha})`
          ctx.fillText('*', p.x, p.y)
        })

        return newParticles
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-60"
      style={{ background: 'transparent' }}
    />
  )
}
