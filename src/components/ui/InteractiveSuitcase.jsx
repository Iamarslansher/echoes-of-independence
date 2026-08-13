import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { suitcaseItems } from '../../data/suitcase'

export default function InteractiveSuitcase() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const active = suitcaseItems.find((i) => i.id === activeId)

  return (
    <div className="mx-auto max-w-2xl">
      {!open ? (
        <motion.button
          type="button"
          data-cursor="hover"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group mx-auto flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-12 text-center transition-colors hover:border-pk-gold/30"
        >
          <svg viewBox="0 0 120 90" className="h-20 w-28" aria-hidden="true">
            <rect x="50" y="8" width="20" height="10" rx="3" fill="none" stroke="#c9a227" strokeWidth="3" />
            <rect x="8" y="18" width="104" height="64" rx="8" fill="#1a2b22" stroke="#c9a227" strokeWidth="2.5" />
            <line x1="8" y1="42" x2="112" y2="42" stroke="#c9a227" strokeWidth="1.5" opacity="0.5" />
            <rect x="46" y="34" width="28" height="16" rx="2" fill="none" stroke="#c9a227" strokeWidth="2" />
            <circle cx="52" cy="42" r="2" fill="#c9a227" />
            <circle cx="68" cy="42" r="2" fill="#c9a227" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-pk-gold">
            What did they carry?
          </span>
          <span className="max-w-sm text-sm text-pk-mist">
            Tap the suitcase to open it eight things families carried across a new
            border in 1947.
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-pk-gold/20 bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-pk-gold">
              Inside the suitcase
            </span>
            <button
              type="button"
              data-cursor="hover"
              onClick={() => {
                setOpen(false)
                setActiveId(null)
              }}
              className="text-xs text-pk-mist hover:text-pk-cream"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {suitcaseItems.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                data-cursor="hover"
                onClick={() => setActiveId(item.id === activeId ? null : item.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -3 }}
                aria-label={item.name}
                aria-pressed={activeId === item.id}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-2xl transition-colors sm:text-3xl ${
                  activeId === item.id
                    ? 'border-pk-gold bg-pk-gold/10'
                    : 'border-white/10 bg-pk-night hover:border-pk-gold/30'
                }`}
              >
                {item.icon}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border-t border-white/10 pt-6"
              >
                <h4 className="display text-lg text-pk-cream">{active.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-pk-mist">{active.story}</p>
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-pk-mist/60"
              >
                Tap an item to read its story.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
