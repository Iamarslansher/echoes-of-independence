import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMicrophone, HiOutlinePlay, HiOutlinePause } from 'react-icons/hi'
import { useApp } from '../../context/AppContext'

export default function NarratorControl() {
  const { narration } = useApp()
  const [open, setOpen] = useState(false)
  const supported = typeof window !== 'undefined' && !!window.speechSynthesis

  return (
    <div className="relative">
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close narrator settings' : 'Open narrator settings'}
        aria-expanded={open}
        className={`glass grid h-10 w-10 place-items-center rounded-full transition-colors ${
          narration.enabled ? 'text-pk-mint' : ''
        }`}
      >
        <HiOutlineMicrophone />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass absolute right-0 top-12 z-10 w-64 rounded-2xl p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-pk-mist">AI Narrator</p>

            {!supported ? (
              <p className="mt-3 text-xs leading-relaxed text-pk-mist">
                Your browser doesn&apos;t support speech narration. Try Chrome or Edge.
              </p>
            ) : (
              <>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    data-cursor="hover"
                    onClick={narration.togglePlay}
                    aria-label={narration.playing ? 'Pause narration' : 'Play narration'}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-pk-mint/15 text-pk-mint"
                  >
                    {narration.playing ? <HiOutlinePause /> : <HiOutlinePlay />}
                  </button>
                  <span className="text-xs text-pk-cream">
                    {narration.enabled
                      ? narration.playing
                        ? 'Narrating this section'
                        : 'Paused'
                      : 'Tap to narrate as you scroll'}
                  </span>
                </div>

                <div className="mt-4">
                  <label htmlFor="narrator-volume" className="text-[10px] uppercase tracking-widest text-pk-mist">
                    Volume
                  </label>
                  <input
                    id="narrator-volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={narration.volume}
                    onChange={(e) => narration.setVolume(Number(e.target.value))}
                    className="mt-1 w-full accent-pk-mint"
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ur', label: 'اردو' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      data-cursor="hover"
                      onClick={() => narration.setLang(l.code)}
                      className={`flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors ${
                        narration.lang === l.code
                          ? 'border-pk-mint bg-pk-mint/15 text-pk-mint'
                          : 'border-white/10 text-pk-mist hover:text-pk-cream'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
