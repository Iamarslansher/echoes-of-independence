import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { innovators } from '../data/innovators'
import { useGsapReveal } from '../hooks/useGsapReveal'

function InnovatorCard({ person, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      data-reveal
      className="group [perspective:1200px]"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <motion.button
        type="button"
        data-cursor="hover"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-label={`${person.name} — ${person.achievement}`}
        className="relative h-56 w-full text-left [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 [backface-visibility:hidden]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-pk-gold/40 bg-pk-night">
            <span className="display text-base text-pk-gold">{person.initial}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-pk-mint">{person.role}</p>
            <h3 className="display mt-2 text-xl text-pk-cream">{person.name}</h3>
            <p className="mt-1 text-xs text-pk-mist">{person.achievement}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-pk-mint/30 bg-pk-forest/40 p-6 [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-pk-gold">{person.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-pk-cream">{person.description}</p>
        </div>
      </motion.button>
    </div>
  )
}

export default function InnovationWall() {
  const revealRef = useGsapReveal()

  return (
    <section id="innovators" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(29,185,84,0.1),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Innovation Wall"
          title="The People Building Pakistan"
          subtitle="Scientists, engineers, and founders — proof already in, that this country produces people who move the needle. Tap or hover a card to read more."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {innovators.map((person, i) => (
            <InnovatorCard key={person.id} person={person} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
