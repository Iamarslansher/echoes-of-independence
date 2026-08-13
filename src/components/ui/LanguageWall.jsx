import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import { languages } from '../../data/languages'

export default function LanguageWall() {
  const [activeId, setActiveId] = useState(null)

  function speak(lang) {
    setActiveId(lang.id)
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(lang.greeting)
      utter.lang = 'ur-PK'
      utter.rate = 0.85
      setTimeout(() => window.speechSynthesis.speak(utter), 30)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-6 text-center text-sm text-pk-mist">
        Tap a language to see and hear how to say hello.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {languages.map((lang, i) => (
          <motion.button
            key={lang.id}
            type="button"
            data-cursor="hover"
            onClick={() => speak(lang)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={`rounded-xl border p-4 text-left transition-colors ${
              activeId === lang.id
                ? 'border-pk-mint bg-pk-mint/10'
                : 'border-white/10 bg-white/[0.03] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-pk-cream">{lang.name}</span>
              <HiOutlineVolumeUp className="text-pk-mist/50" />
            </div>
            <span className="mt-1 block text-lg text-pk-gold" dir="rtl">
              {lang.native}
            </span>
            {activeId === lang.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 border-t border-white/10 pt-2"
              >
                <p className="text-xs text-pk-mint" dir="rtl">
                  {lang.greeting}
                </p>
                <p className="mt-0.5 text-[11px] text-pk-mist">{lang.greetingRoman}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-pk-mist/80">{lang.note}</p>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
