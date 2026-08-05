import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineSparkles, HiOutlineX } from 'react-icons/hi'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { seedDreams, DREAM_MAX_LENGTH, DREAMS_STORAGE_KEY } from '../data/dreams'
import { readJSON, writeJSON } from '../utils/scroll'
import { useApp } from '../context/AppContext'

function makeId() {
  return `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

// Gentle, staggered idle float so the wall feels alive rather than static.
const floatTransition = (i) => ({
  duration: 5 + (i % 4),
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
  delay: (i % 5) * 0.3,
})

export default function WallOfDreams() {
  const { achievements } = useApp()
  const [ownDreams, setOwnDreams] = useState(() => readJSON(DREAMS_STORAGE_KEY, []))
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)

  useEffect(() => writeJSON(DREAMS_STORAGE_KEY, ownDreams), [ownDreams])

  const allDreams = [...seedDreams, ...ownDreams]
  const remaining = DREAM_MAX_LENGTH - draft.length

  function handleSubmit(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    setOwnDreams((prev) => [...prev, { id: makeId(), text, seed: false }])
    setDraft('')
    achievements.unlock('future-builder')
    inputRef.current?.focus()
  }

  function handleDelete(id) {
    setOwnDreams((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <section id="dreams" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Our Dreams for Pakistan"
          title="What are you building?"
          subtitle="Write one line. It stays only on your device — no account, no backend, just your word to yourself."
        />

        <form
          onSubmit={handleSubmit}
          className="glass mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, DREAM_MAX_LENGTH))}
            placeholder="I will build..."
            aria-label="Write your dream for Pakistan"
            className="flex-1 bg-transparent px-3 py-2 text-pk-cream placeholder:text-pk-mist/50 focus:outline-none"
          />
          <span className="px-3 text-xs text-pk-mist/60 sm:px-0">{remaining}</span>
          <Button type="submit" variant="primary" className="shrink-0" disabled={!draft.trim()}>
            <HiOutlineSparkles className="text-base" />
            Add to the wall
          </Button>
        </form>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <AnimatePresence initial={false}>
            {allDreams.map((dream, i) => (
              <motion.div
                key={dream.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: floatTransition(i),
                }}
                className={`group relative max-w-[16rem] rounded-2xl border px-5 py-4 text-sm leading-relaxed ${
                  dream.seed
                    ? 'border-white/10 bg-white/[0.03] text-pk-mist'
                    : 'border-pk-mint/30 bg-pk-forest/30 text-pk-cream'
                }`}
              >
                “{dream.text}”
                {!dream.seed && (
                  <button
                    type="button"
                    onClick={() => handleDelete(dream.id)}
                    aria-label="Delete this dream"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pk-night border border-white/15 text-pk-mist opacity-0 transition-opacity group-hover:opacity-100 hover:text-pk-cream"
                  >
                    <HiOutlineX className="text-xs" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {ownDreams.length === 0 && (
          <p className="mt-8 text-center text-xs uppercase tracking-widest text-pk-mist/40">
            The dimmer cards above are examples — yours will glow green.
          </p>
        )}
      </div>
    </section>
  )
}
