import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineEye } from 'react-icons/hi'
import { useVisitorCount } from '../../hooks/useVisitorCount'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === null) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    let raf
    const duration = 900
    const start = performance.now()
    const from = display
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - (1 - p) ** 3
      setDisplay(Math.round(from + (value - from) * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
   
  }, [value])

  return <span>{display.toLocaleString()}</span>
}

export default function VisitorCounter() {
  const { count, isGlobal, ready } = useVisitorCount()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-1.5 font-mono text-[11px] text-pk-mist/70"
      title={
        isGlobal
          ? 'Total visits across all visitors'
          : 'Counting locally the shared counter is warming up'
      }
    >
      <HiOutlineEye className="text-pk-mint/70" />
      {ready ? (
        <>
          <AnimatedNumber value={count} /> {isGlobal ? 'visitors' : 'visits'}
        </>
      ) : (
        <span className="opacity-50">counting…</span>
      )}
    </motion.div>
  )
}
