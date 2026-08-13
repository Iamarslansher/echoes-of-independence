import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { achievements } from '../data/journey'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Achievements() {
  const revealRef = useGsapReveal()

  return (
    <section id="achievements" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.08),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter VI"
          title="Pakistan's Achievements"
          subtitle="From space research to software exports milestones that prove what this nation can do."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <motion.article
              key={a.id}
              data-reveal
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6"
              whileHover={{ y: -6 }}
              data-cursor="hover"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-pk-gold">{a.category}</p>
              <h3 className="display mt-3 text-2xl text-pk-cream group-hover:text-pk-mint transition-colors">
                {a.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-pk-mist">{a.year}</p>
              <p className="mt-4 text-sm leading-relaxed text-pk-mist">{a.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
