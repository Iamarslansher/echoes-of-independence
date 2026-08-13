import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePlay, HiOutlinePause } from 'react-icons/hi'
import { radioBroadcastScript } from '../../data/narration'

const BAR_COUNT = 24

export default function RadioPakistan() {
  const [phase, setPhase] = useState('idle') // idle | tuning | broadcasting | done
  const [dialAngle, setDialAngle] = useState(-40)
  const utterRef = useRef(null)

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  function tuneIn() {
    if (phase === 'broadcasting') {
      window.speechSynthesis?.cancel()
      setPhase('done')
      return
    }

    setPhase('tuning')
    setDialAngle(-40)

    // Animate the dial sweeping to "find the station"
    let raf
    const start = performance.now()
    const duration = 1400
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration)
      setDialAngle(-40 + p * 75)
      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        beginBroadcast()
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }

  function beginBroadcast() {
    setPhase('broadcasting')
    if (!window.speechSynthesis) {
      setTimeout(() => setPhase('done'), 4000)
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(radioBroadcastScript.en)
    utter.rate = 0.92
    utter.pitch = 0.95
    utter.onend = () => setPhase('done')
    utter.onerror = () => setPhase('done')
    utterRef.current = utter
    setTimeout(() => window.speechSynthesis.speak(utter), 30)
  }

  const isBroadcasting = phase === 'broadcasting'
  const isTuning = phase === 'tuning'

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-[#5a4020]/50 bg-gradient-to-b from-[#3a2a18] to-[#241a10] p-6 shadow-2xl sm:p-8">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#e0c470]/80">
          Radio Pakistan · Recreated Broadcast
        </p>

        {/* Speaker grille */}
        <div className="mx-auto mt-5 grid w-40 grid-cols-8 gap-1.5">
          {Array.from({ length: 32 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-black/40" />
          ))}
        </div>

        {/* Dial */}
        <div className="relative mx-auto mt-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#e0c470]/30 bg-[#150e08]" />
          <motion.div
            animate={{ rotate: dialAngle }}
            transition={{ type: 'tween', ease: 'linear', duration: isTuning ? 0 : 0.3 }}
            className="absolute h-9 w-1 origin-bottom rounded-full bg-[#e0c470]"
            style={{ bottom: '50%' }}
          />
          <div className="absolute h-2.5 w-2.5 rounded-full bg-[#e0c470]" />
        </div>

        {/* Waveform */}
        <div className="mt-6 flex h-10 items-end justify-center gap-[3px]">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-[#e0c470]/70"
              animate={
                isBroadcasting
                  ? { height: [4, 6 + ((i * 37) % 26), 4] }
                  : isTuning
                    ? { height: [4, 3 + ((i * 13) % 10), 4] }
                    : { height: 4 }
              }
              transition={{
                duration: isBroadcasting ? 0.6 + (i % 5) * 0.1 : 0.3,
                repeat: isBroadcasting || isTuning ? Infinity : 0,
                delay: i * 0.02,
              }}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[#c9b896]/80">
          {phase === 'idle' && 'Tune in to hear a recreated 1947 broadcast.'}
          {phase === 'tuning' && 'Searching for the signal…'}
          {phase === 'broadcasting' && 'On air — recreated narration, not an original recording.'}
          {phase === 'done' && 'Broadcast ended. Tune in again anytime.'}
        </p>

        <button
          type="button"
          data-cursor="hover"
          onClick={tuneIn}
          disabled={isTuning}
          className="mx-auto mt-5 flex items-center gap-2 rounded-full bg-[#e0c470] px-6 py-2.5 text-sm font-medium text-[#241a10] disabled:opacity-60"
        >
          {isBroadcasting ? <HiOutlinePause /> : <HiOutlinePlay />}
          {isBroadcasting ? 'Stop' : phase === 'done' ? 'Listen Again' : 'Listen to 1947'}
        </button>
      </div>
    </div>
  )
}
