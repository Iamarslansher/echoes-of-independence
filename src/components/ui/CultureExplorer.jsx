import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cultureRegions } from '../../data/culture'

const FIELDS = [
  ['clothing', 'Clothing'],
  ['food', 'Food'],
  ['music', 'Music'],
  ['festivals', 'Festivals'],
  ['landmark', 'Landmark'],
]

export default function CultureExplorer() {
  const [activeId, setActiveId] = useState(cultureRegions[0].id)
  const region = cultureRegions.find((r) => r.id === activeId)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {cultureRegions.map((r) => (
          <button
            key={r.id}
            type="button"
            data-cursor="hover"
            onClick={() => setActiveId(r.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors sm:text-sm ${
              activeId === r.id
                ? 'border-pk-mint bg-pk-mint/15 text-pk-mint'
                : 'border-white/10 text-pk-mist hover:text-pk-cream'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <h3 className="display text-2xl text-pk-cream">{region.name}</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FIELDS.map(([key, label]) => (
              <div key={key}>
                <p className="text-[10px] uppercase tracking-widest text-pk-gold">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-pk-mist">{region[key]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
