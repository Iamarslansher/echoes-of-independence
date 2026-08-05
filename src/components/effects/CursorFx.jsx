import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/** Soft custom cursor with trailing glow — fine pointers only */
export default function CursorFx() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const t = e.target
      setHover(Boolean(t?.closest?.('a, button, [data-cursor="hover"]')))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] hidden mix-blend-difference md:block"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: hover ? 2.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.4 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[99] hidden rounded-full border border-pk-mint/50 md:block"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: hover ? 1.4 : 1,
          opacity: 0.7,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ width: 36, height: 36 }}
      />
    </>
  )
}
