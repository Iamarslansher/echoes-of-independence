import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { partitionStories } from '../../data/partitionStories'

export default function PartitionStories() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const story = partitionStories[index]

  function go(delta) {
    setDirection(delta)
    setIndex((i) => (i + delta + partitionStories.length) % partitionStories.length)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-pk-gold">
        Voices of the Crossing
      </p>
      <p className="mb-6 text-center text-xs text-pk-mist/70">
        Illustrative composites reflecting documented patterns of the Partition experience
        not accounts of specific named individuals.
      </p>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={story.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="display text-xl text-pk-cream sm:text-2xl">{story.name}</h3>
              <span className="font-mono text-xs text-pk-mist">{story.age}</span>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-pk-mint">
              {story.from} → {story.to}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-pk-mist">{story.journey}</p>

            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-pk-gold">What they carried</p>
                <p className="mt-1 text-sm text-pk-cream">{story.carried}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-pk-gold">What they remembered</p>
                <p className="mt-1 text-sm text-pk-cream">{story.remembered}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          data-cursor="hover"
          onClick={() => go(-1)}
          aria-label="Previous story"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-pk-cream"
        >
          <HiOutlineChevronLeft />
        </button>
        <div className="flex gap-1.5">
          {partitionStories.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-pk-gold' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          data-cursor="hover"
          onClick={() => go(1)}
          aria-label="Next story"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-pk-cream"
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  )
}
