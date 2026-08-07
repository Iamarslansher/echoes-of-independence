import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#1db954', '#f8faf8', '#c9a227', '#0a7a3a', '#8ba894']

export default function Confetti({ active, pieces = 60 }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 1.4,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        drift: (Math.random() - 0.5) * 120,
        size: 6 + Math.random() * 6,
      })),
    [pieces],
  )

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 0.4,
            background: b.color,
          }}
          initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: b.drift,
            opacity: [0, 1, 1, 0],
            rotate: b.rotate,
          }}
          transition={{ duration: b.duration, delay: b.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
