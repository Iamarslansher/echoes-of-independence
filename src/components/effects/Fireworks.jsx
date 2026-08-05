import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Fireworks({ active = true, bursts = 6 }) {
  const rockets = useMemo(
    () =>
      Array.from({ length: bursts }, (_, i) => ({
        id: i,
        left: 12 + (i * 76) / Math.max(bursts - 1, 1),
        delay: i * 0.55,
        color: ['#1db954', '#f8faf8', '#c9a227', '#0a7a3a'][i % 4],
      })),
    [bursts],
  )

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {rockets.map((r) => (
        <div key={r.id} className="absolute bottom-[10%] h-40 w-40" style={{ left: `${r.left}%` }}>
          {Array.from({ length: 12 }).map((_, p) => {
            const angle = (p / 12) * Math.PI * 2
            return (
              <motion.span
                key={p}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                style={{ background: r.color }}
                initial={{ x: 0, y: 40, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * 56,
                  y: Math.sin(angle) * 56 - 20,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  delay: r.delay,
                  repeat: Infinity,
                  repeatDelay: 2.8,
                  ease: 'easeOut',
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
