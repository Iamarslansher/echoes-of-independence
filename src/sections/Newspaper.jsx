import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import NewspaperPage from '../components/ui/NewspaperPage'
import { newspaperEditions } from '../data/newspaper'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Newspaper() {
  const revealRef = useGsapReveal()
  const [activeId, setActiveId] = useState(newspaperEditions[0].id)
  const active = newspaperEditions.find((e) => e.id === activeId)

  return (
    <section id="newspaper" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(201,162,39,0.1),transparent_45%)]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="From the Archives"
          title="The Story, As It Broke"
          subtitle="Four moments, told the way a front page might have carried them headlines that mark how the idea of Pakistan moved from argument to nation."
        />

        <div data-reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {newspaperEditions.map((e) => (
            <button
              key={e.id}
              type="button"
              data-cursor="hover"
              onClick={() => setActiveId(e.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeId === e.id
                  ? 'border-pk-mint bg-pk-mint/15 text-pk-mint'
                  : 'border-white/10 text-pk-mist hover:text-pk-cream'
              }`}
            >
              {e.id}
            </button>
          ))}
        </div>

        <div data-reveal>
          <AnimatePresence mode="wait">
            <NewspaperPage key={active.id} edition={active} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
