import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PakistanFlag from '../effects/PakistanFlag'

export default function Loader() {
  const { setLoaderDone, loaderDone } = useApp()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const run = (now) => {
      const t = Math.min(1, (now - start) / 2400)
      setPct(Math.round(t * 100))
      if (t < 1) frame = requestAnimationFrame(run)
      else setTimeout(() => setLoaderDone(true), 350)
    }
    frame = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frame)
  }, [setLoaderDone])

  return (
    <AnimatePresence>
      {!loaderDone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-pk-night"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <PakistanFlag className="h-20 w-32 md:h-24 md:w-40" />
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-pk-mint">Echoes of Independence</p>
              <h1 className="display mt-2 text-3xl text-pk-cream md:text-4xl">Loading the journey</h1>
            </div>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
              <motion.div
                className="h-full bg-gradient-to-r from-pk-forest via-pk-mint to-pk-gold"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="font-mono text-xs text-pk-mist">{pct}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
