import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { nationalSymbols } from '../data/symbols'
import { useGsapReveal } from '../hooks/useGsapReveal'

function SymbolSeal({ symbol, isOpen, onToggle, index }) {
  return (
    <div data-reveal style={{ transitionDelay: `${index * 40}ms` }}>
      <motion.button
        type="button"
        data-cursor="hover"
        onClick={onToggle}
        aria-expanded={isOpen}
        whileHover={{ y: -4 }}
        className={`flex w-full flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-colors ${
          isOpen
            ? 'border-pk-mint bg-pk-mint/10'
            : 'border-white/10 bg-white/[0.03] hover:border-pk-mint/30'
        }`}
      >
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full border text-2xl transition-all ${
            isOpen ? 'border-pk-gold/50 bg-pk-gold/10' : 'border-white/15 bg-pk-night'
          }`}
        >
          {symbol.icon}
        </span>
        <span>
          <span className="block text-sm font-medium text-pk-cream">{symbol.title}</span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-pk-mist">
            {symbol.tagline}
          </span>
        </span>
      </motion.button>
    </div>
  )
}

export default function NationalSymbols() {
  const revealRef = useGsapReveal()
  const [openId, setOpenId] = useState(nationalSymbols[0].id)
  const active = nationalSymbols.find((s) => s.id === openId)

  return (
    <section id="symbols" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="National Symbols"
          title="What Represents a Nation"
          subtitle="Nine symbols, each carrying meaning chosen deliberately at the founding. Tap one to read its story."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {nationalSymbols.map((symbol, i) => (
            <SymbolSeal
              key={symbol.id}
              symbol={symbol}
              index={i}
              isOpen={openId === symbol.id}
              onToggle={() => setOpenId(openId === symbol.id ? null : symbol.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass mt-8 rounded-3xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-pk-gold/40 bg-pk-night text-xl">
                  {active.icon}
                </span>
                <div>
                  <h3 className="display text-xl text-pk-cream sm:text-2xl">{active.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pk-mist sm:text-base">
                    {active.story}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
