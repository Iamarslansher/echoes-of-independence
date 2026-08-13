import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import GlassPanel from '../components/ui/GlassPanel'
import { wars } from '../data/journey'

export default function Wars() {
  return (
    <section id="wars" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter V"
          title="Wars & Sacrifices"
          subtitle="A respectful remembrance of conflict and courage honouring those who gave everything."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {wars.map((w, i) => (
            <motion.div
              key={w.year}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassPanel className="h-full border-white/8" hover={false}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-pk-gold">{w.year}</span>
                  <span className="text-[10px] uppercase tracking-widest text-pk-mist">Remembrance</span>
                </div>
                <h3 className="display mt-3 text-3xl text-pk-cream">{w.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-pk-mist">{w.summary}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm text-pk-mint/90">{w.respect}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-pk-mist">
          We remember. We honour. We build peace through strength of character.
        </p>
      </div>
    </section>
  )
}
