import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { dayIn1947Stages } from '../../data/dayIn1947'

const MOOD_BG = {
  sepia: 'radial-gradient(ellipse at 40% 20%, rgba(139,90,43,0.22), transparent 55%), #120e08',
  dawn: 'radial-gradient(ellipse at 70% 10%, rgba(201,162,39,0.2), transparent 55%), #0a120c',
  midnight: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.22), transparent 50%), #02040a',
}

export default function ADayIn1947() {
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)
  const stage = dayIn1947Stages[step]
  const isLast = step === dayIn1947Stages.length - 1

  function next() {
    if (!started) {
      setStarted(true)
      return
    }
    if (!isLast) setStep((s) => s + 1)
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 transition-colors duration-700"
        style={{ background: started ? MOOD_BG[stage.mood] : MOOD_BG.sepia }}
      >
        {!started ? (
          <button
            type="button"
            data-cursor="hover"
            onClick={next}
            className="flex w-full flex-col items-center gap-3 px-8 py-16 text-center"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-pk-gold">
              Interactive
            </span>
            <span className="display text-2xl text-pk-cream sm:text-3xl">
              A Day That Changed Everything
            </span>
            <span className="max-w-sm text-sm text-pk-mist">
              Step through 14 August 1947 morning, to midnight.
            </span>
          </button>
        ) : (
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            {/* Progress dots */}
            <div className="mb-8 flex items-center justify-center gap-2">
              {dayIn1947Stages.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === step ? 'w-6 bg-pk-gold' : i < step ? 'w-1.5 bg-pk-gold/50' : 'w-1.5 bg-white/15'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="text-center"
              >
                <span className="text-4xl">{stage.icon}</span>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-pk-gold">
                  {stage.time}
                </p>
                <h3 className="display mt-2 text-2xl text-pk-cream sm:text-3xl">
                  {stage.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-pk-mist">
                  {stage.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                data-cursor="hover"
                onClick={prev}
                disabled={step === 0}
                aria-label="Previous moment"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-pk-cream transition-opacity disabled:opacity-30"
              >
                <HiOutlineChevronLeft />
              </button>

              {!isLast ? (
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={next}
                  className="rounded-full bg-pk-mint px-6 py-2.5 text-sm font-medium text-pk-night"
                >
                  Continue
                </button>
              ) : (
                <span className="rounded-full border border-pk-gold/40 bg-pk-gold/10 px-6 py-2.5 text-sm text-pk-gold">
                  🎉 The story continues below
                </span>
              )}

              <button
                type="button"
                data-cursor="hover"
                onClick={() => step < dayIn1947Stages.length - 1 && setStep((s) => s + 1)}
                disabled={isLast}
                aria-label="Next moment"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-pk-cream transition-opacity disabled:opacity-30"
              >
                <HiOutlineChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
