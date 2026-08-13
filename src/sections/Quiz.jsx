import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCheck, HiOutlineX, HiOutlineSparkles } from 'react-icons/hi'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Confetti from '../components/effects/Confetti'
import { quizQuestions } from '../data/quiz'
import { useApp } from '../context/AppContext'
import { writeJSON } from '../utils/scroll'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Quiz() {
  const revealRef = useGsapReveal()
  const { achievements } = useApp()

  const [phase, setPhase] = useState('intro') // intro | question | result
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const advancingRef = useRef(false)

  const total = quizQuestions.length
  const current = quizQuestions[index]
  const percent = total ? Math.round((score / total) * 100) : 0

  useEffect(() => {
    if (phase !== 'result') return
    achievements.unlock('history-explorer')
    if (percent >= 80) achievements.unlock('pakistan-expert')
    writeJSON('eoi-quiz-result', { score, total, percent, at: Date.now() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function startQuiz() {
    advancingRef.current = false
    setIndex(0)
    setScore(0)
    setSelected(null)
    setPhase('question')
  }

  function chooseOption(i) {
    if (selected !== null || advancingRef.current) return
    advancingRef.current = true
    setSelected(i)
    if (i === current.answer) setScore((s) => s + 1)

    window.setTimeout(() => {
      setIndex((prevIndex) => {
        const next = prevIndex + 1
        if (next < total) {
          setSelected(null)
          advancingRef.current = false
          return next
        }
        setPhase('result')
        advancingRef.current = false
        return prevIndex
      })
    }, 900)
  }

  function optionClasses(i) {
    if (selected === null) {
      return 'border-white/10 bg-white/[0.03] hover:border-pk-mint/40 hover:bg-white/[0.06]'
    }
    if (i === current.answer) {
      return 'border-pk-mint bg-pk-mint/15 text-pk-mint'
    }
    if (i === selected) {
      return 'border-red-400/60 bg-red-400/10 text-red-300'
    }
    return 'border-white/5 bg-white/[0.02] opacity-50'
  }

  let resultTier = 'Keep exploring history rewards another look.'
  if (percent >= 80) resultTier = "Pakistan Expert that's a near-perfect score."
  else if (percent >= 50) resultTier = 'Well done a solid grasp of the story.'

  return (
    <section id="quiz" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(29,185,84,0.09),transparent_45%)]" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Test Yourself"
          title="Pakistan Knowledge Quiz"
          subtitle="Twelve questions, one story. See how well you know it."
        />

        <div data-reveal className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
          <Confetti active={phase === 'result' && percent >= 50} pieces={70} />

          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-center gap-6 py-10 text-center"
              >
                <HiOutlineSparkles className="text-4xl text-pk-mint" />
                <p className="max-w-sm text-pk-mist">
                  {total} questions covering the movement, independence, and the country today.
                  Ready?
                </p>
                <Button variant="primary" onClick={startQuiz}>
                  Start the Quiz
                </Button>
              </motion.div>
            )}

            {phase === 'question' && current && (
              <motion.div
                key={`q-${current.id}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress bar */}
                <div className="mb-2 flex items-center justify-between text-xs text-pk-mist">
                  <span>
                    Question {index + 1} / {total}
                  </span>
                  <span>{score} correct so far</span>
                </div>
                <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pk-green to-pk-mint"
                    initial={false}
                    animate={{ width: `${(index / total) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>

                <h3 className="display text-xl leading-snug text-pk-cream sm:text-2xl">
                  {current.q}
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {current.options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      data-cursor="hover"
                      disabled={selected !== null}
                      onClick={() => chooseOption(i)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${optionClasses(i)}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && i === current.answer && <HiOutlineCheck />}
                      {selected !== null && i === selected && i !== current.answer && (
                        <HiOutlineX />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-5 py-6 text-center"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-pk-mint">Your Score</p>
                <p className="display text-6xl text-pk-cream">
                  {score}
                  <span className="text-2xl text-pk-mist">/{total}</span>
                </p>
                <p className="max-w-sm text-pk-mist">{resultTier}</p>

                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {achievements.badges
                    .filter((b) => b.unlocked && (b.id === 'history-explorer' || b.id === 'pakistan-expert'))
                    .map((b) => (
                      <span
                        key={b.id}
                        className="flex items-center gap-2 rounded-full border border-pk-gold/30 bg-pk-gold/10 px-4 py-2 text-xs text-pk-gold"
                      >
                        <span>{b.icon}</span>
                        {b.title}
                      </span>
                    ))}
                </div>

                <Button variant="ghost" className="mt-4" onClick={startQuiz}>
                  Retake the Quiz
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
