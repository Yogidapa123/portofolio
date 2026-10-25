import React, { useEffect, useRef } from 'react'

interface CosmicBackgroundProps {
  darkMode: boolean
}

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  color: string
}

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  color: string
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate stars
    const starCount = darkMode ? 140 : 60
    const stars: Star[] = []
    const darkColors = ['#ffffff', '#93c5fd', '#60a5fa', '#a5b4fc', '#e0e7ff', '#2c67ed']
    const lightColors = ['#2c67ed', '#3b82f6', '#1d4ed8', '#60a5fa', '#ffffff']

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + (Math.random() > 0.9 ? 1.5 : 0.5),
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        color: darkMode
          ? darkColors[Math.floor(Math.random() * darkColors.length)]
          : lightColors[Math.floor(Math.random() * lightColors.length)],
      })
    }

    // Meteors / Shooting stars
    const meteors: Meteor[] = []
    let lastMeteorTime = Date.now()

    const createMeteor = () => {
      meteors.push({
        x: Math.random() * width + 200,
        y: Math.random() * (height / 2),
        length: Math.random() * 120 + 80,
        speed: Math.random() * 10 + 12,
        angle: (Math.PI / 180) * 215, // 215 degrees
        opacity: 1,
        color: darkMode ? '#93c5fd' : '#2c67ed',
      })
    }

    // Render loop
    let tick = 0
    const render = () => {
      tick++
      ctx.clearRect(0, 0, width, height)

      // Draw subtle starry glow
      stars.forEach((star) => {
        // Twinkle calculation
        const currentOpacity =
          star.opacity * (0.6 + 0.4 * Math.sin(tick * star.speed * 2 + star.x))

        ctx.fillStyle = star.color
        ctx.globalAlpha = currentOpacity
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Occasional star cross glimmer for bright stars
        if (star.size > 2.2 && darkMode) {
          ctx.strokeStyle = star.color
          ctx.lineWidth = 0.5
          ctx.globalAlpha = currentOpacity * 0.5
          ctx.beginPath()
          ctx.moveTo(star.x - star.size * 2, star.y)
          ctx.lineTo(star.x + star.size * 2, star.y)
          ctx.moveTo(star.x, star.y - star.size * 2)
          ctx.lineTo(star.x, star.y + star.size * 2)
          ctx.stroke()
        }
      })

      // Spawn meteors periodically
      const now = Date.now()
      if (now - lastMeteorTime > (darkMode ? 4500 : 7000)) {
        createMeteor()
        lastMeteorTime = now
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        const tailX = m.x - Math.cos(m.angle) * m.length
        const tailY = m.y - Math.sin(m.angle) * m.length

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, darkMode ? '#ffffff' : '#2c67ed')
        grad.addColorStop(0.3, darkMode ? 'rgba(44, 103, 237, 0.8)' : 'rgba(59, 130, 246, 0.6)')
        grad.addColorStop(1, 'transparent')

        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.globalAlpha = m.opacity
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        // Move meteor
        m.x += Math.cos(m.angle) * m.speed
        m.y += Math.sin(m.angle) * m.speed
        m.opacity -= 0.015

        if (m.opacity <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [darkMode])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* Background Gradient Base */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          darkMode
            ? 'bg-[#060814]'
            : 'bg-gradient-to-br from-[#cbe2fe] via-[#dcedfd] to-[#b8d7fb]'
        }`}
      />

      {/* Cosmic Nebula Clouds in Dark Mode */}
      {darkMode && (
        <>
          <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-[#2c67ed]/15 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 -right-40 w-[750px] h-[750px] rounded-full bg-indigo-600/12 blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-[150px] pointer-events-none" />
          <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
        </>
      )}

      {/* Celestial Solar Aura in Light Mode */}
      {!darkMode && (
        <>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#2c67ed]/20 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 -left-32 w-[650px] h-[650px] rounded-full bg-blue-400/25 blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[550px] h-[550px] rounded-full bg-sky-300/30 blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Orbit Rings Accent Decoration */}
      <div className="absolute top-20 right-[15%] w-[800px] h-[800px] rounded-full border border-blue-500/10 pointer-events-none animate-orbit hidden lg:block" />
      <div className="absolute top-28 right-[17%] w-[700px] h-[700px] rounded-full border border-dashed border-indigo-400/10 pointer-events-none animate-orbit-reverse hidden lg:block" />

      {/* Canvas for Twinkling Stars and Meteors */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  )
}
