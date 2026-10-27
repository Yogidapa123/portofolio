import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CosmicSparkle {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  size: number
  color: string
  shape: 'star' | 'circle'
}

export const CosmicClickEffect: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [sparkles, setSparkles] = useState<CosmicSparkle[]>([])

  useEffect(() => {
    const colorsDark = ['#38bdf8', '#818cf8', '#f472b6', '#facc15', '#4ade80', '#ffffff']
    const colorsLight = ['#2c67ed', '#3b82f6', '#ec4899', '#f59e0b', '#10b981']

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking interactive inputs or buttons to keep it clean
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select')) return

      const count = 7
      const newSparkles: CosmicSparkle[] = []
      const currentColors = darkMode ? colorsDark : colorsLight

      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          angle: (i / count) * (Math.PI * 2) + (Math.random() - 0.5) * 0.5,
          distance: Math.random() * 45 + 25,
          size: Math.random() * 5 + 3,
          color: currentColors[Math.floor(Math.random() * currentColors.length)],
          shape: Math.random() > 0.4 ? 'star' : 'circle',
        })
      }

      setSparkles((prev) => [...prev.slice(-25), ...newSparkles])
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [darkMode])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sp) => {
          const destX = Math.cos(sp.angle) * sp.distance
          const destY = Math.sin(sp.angle) * sp.distance

          return (
            <motion.div
              key={sp.id}
              initial={{
                x: sp.x,
                y: sp.y,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: sp.x + destX,
                y: sp.y + destY,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setSparkles((prev) => prev.filter((item) => item.id !== sp.id))
              }}
              className="absolute"
              style={{
                width: sp.size,
                height: sp.size,
                backgroundColor: sp.shape === 'circle' ? sp.color : 'transparent',
                borderRadius: sp.shape === 'circle' ? '50%' : '0',
                boxShadow: `0 0 10px ${sp.color}`,
              }}
            >
              {sp.shape === 'star' && (
                <svg
                  viewBox="0 0 24 24"
                  fill={sp.color}
                  className="w-full h-full drop-shadow"
                >
                  <path d="M12 2L14.4 9.6H22L15.8 14.2L18.2 21.8L12 17.2L5.8 21.8L8.2 14.2L2 9.6H9.6L12 2Z" />
                </svg>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
