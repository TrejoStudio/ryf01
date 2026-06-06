"use client"

import { useEffect, useRef } from "react"

const colorThemes = {
  cosmic: ["#534235ff", "#836f46ff", "#383631ff", "#afafafff", "#a5a5a5ff"],
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let isLargeScreen = window.innerWidth > 1920
    let isMobile = window.innerWidth < 768

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      isLargeScreen = window.innerWidth > 1920
      isMobile = window.innerWidth < 768
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let isMouseDown = false

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    const handleMouseDown = () => { isMouseDown = true }
    const handleMouseUp = () => { isMouseDown = false }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("touchmove", updateTouchPosition, { passive: true })
    window.addEventListener("touchstart", updateTouchPosition, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleMouseUp)

    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      baseSpeedX: number
      baseSpeedY: number
      angle: number
      rotationSpeed: number
      mass: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height

        this.baseSize = Math.random() * 1 * 1 + 1
        if (isLargeScreen) this.baseSize *= 1.5
        this.size = this.baseSize

        const particleSpeed = 1.5
        this.baseSpeedX = Math.random() * (particleSpeed * 2) - particleSpeed
        this.baseSpeedY = Math.random() * (particleSpeed * 2) - particleSpeed
        this.speedX = this.baseSpeedX
        this.speedY = this.baseSpeedY
        this.mass = this.size * 0.5

        const themeColors = colorThemes.cosmic
        this.color = themeColors[Math.floor(Math.random() * themeColors.length)]

        this.angle = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
      }

      update() {
        // Normal physics
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const angle = Math.atan2(dy, dx)
          const force = (150 - distance) / 10
          this.speedX += Math.cos(angle) * force * 0.2
          this.speedY += Math.sin(angle) * force * 0.2
        }

        const maxSpeed = 3
        this.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedX))
        this.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedY))

        this.speedX = this.speedX * 0.98 + this.baseSpeedX * 0.02
        this.speedY = this.speedY * 0.98 + this.baseSpeedY * 0.02

        this.x += this.speedX
        this.y += this.speedY

        // Wrap around
        if (this.x < 0) this.x = canvas!.width
        if (this.x > canvas!.width) this.x = 0
        if (this.y < 0) this.y = canvas!.height
        if (this.y > canvas!.height) this.y = 0

        this.angle += this.rotationSpeed
      }

      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    let particles: Particle[] = []

    const createParticles = () => {
      particles = []
      const baseCount = isMobile ? 80 : 150
      const actualParticleCount = isLargeScreen ? baseCount * 1.5 : baseCount
      for (let i = 0; i < actualParticleCount; i++) {
        particles.push(new Particle())
      }
    }

    createParticles()

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // transparent background for overlay
      ctx.globalAlpha = 0.2

      if (isMouseDown) {
        ctx.fillStyle = "rgba(200, 200, 255, 0.05)"
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const particle of particles) {
        particle.update()
      }

      for (const particle of particles) {
        particle.draw()
      }

      // Draw connections
      const maxConnections = isMobile ? 1000 : 5000
      let connectionCount = 0
      ctx.lineWidth = 0.5
      const connectionDistance = 120

      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        const checkLimit = isMobile ? 5 : isLargeScreen ? 25 : 15
        for (let j = i + 1; j < Math.min(particles.length, i + checkLimit) && connectionCount < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.2})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connectionCount++
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("touchmove", updateTouchPosition)
      window.removeEventListener("touchstart", updateTouchPosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
    />
  )
}
