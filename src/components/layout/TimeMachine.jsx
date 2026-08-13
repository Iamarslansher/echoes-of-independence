import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineClock, HiOutlineX } from 'react-icons/hi'
import { timeMachineYears } from '../../data/timeline'
import { scrollToId } from '../../utils/scroll'
import { useApp } from '../../context/AppContext'

const MOOD_DOT = {
  neon: '#1db954',
  midnight: '#c9a227',
  solemn: '#8a8a8a',
  green: '#1db954',
  dawn: '#e0c470',
  sepia: '#a3773f',
}

export default function TimeMachine() {
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(false)
  const { journey } = useApp()

  function jumpTo(entry) {
    setOpen(false)
    // Cinematic time-travel flash before the destination settles in
    setFlash(true)
    setTimeout(() => {
      journey.setMood(entry.mood)
      journey.setActiveYear(entry.year)
      scrollToId(entry.id)
    }, 160)
    setTimeout(() => setFlash(false), 500)
  }

  return (
    <>
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.35, 1] }}
            className="pointer-events-none fixed inset-0 z-[90] bg-pk-mint"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-6 z-40">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="glass absolute bottom-16 left-0 max-h-[70vh] w-72 overflow-y-auto rounded-2xl p-3"
            >
              <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.3em] text-pk-mist">
                Travel through history
              </p>
              <div className="flex flex-col gap-1">
                {timeMachineYears.map((y) => (
                  <button
                    key={y.year}
                    type="button"
                    data-cursor="hover"
                    onClick={() => jumpTo(y)}
                    className="flex items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/10"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: MOOD_DOT[y.mood] ?? '#e0c470' }}
                    />
                    <span className="flex-1">
                      <span className="block font-mono text-sm text-pk-cream">{y.year}</span>
                      <span className="block text-xs leading-snug text-pk-mist">{y.blurb}</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          data-cursor="hover"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close time machine' : 'Open time machine'}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-pk-cream shadow-lg"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineX className="text-lg" />
              </motion.span>
            ) : (
              <motion.span
                key="clock"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineClock className="text-lg" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
