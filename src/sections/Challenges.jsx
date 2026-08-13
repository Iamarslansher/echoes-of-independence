import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { challenges } from '../data/journey'

export default function Challenges() {
  return (
    <section id="challenges" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter VIII"
          title="Challenges and Hope"
          subtitle="Every difficulty is a design brief for the next generation. We name the problem so we can build the solution."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {challenges.map((c, i) => (
            <motion.article
              key={c.id}
              className="overflow-hidden rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-white/[0.03] p-6">
                <h3 className="display text-2xl text-pk-cream">{c.challenge}</h3>
                <p className="mt-3 text-sm text-pk-mist">{c.problem}</p>
              </div>
              <div className="border-t border-pk-mint/20 bg-pk-forest/30 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-pk-mint">Path forward</p>
                <p className="mt-2 text-sm leading-relaxed text-pk-cream/90">{c.solution}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
