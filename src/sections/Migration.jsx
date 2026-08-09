import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Counter from '../components/ui/Counter'
import InteractiveSuitcase from '../components/ui/InteractiveSuitcase'
import { migrationFacts } from '../data/journey'

export default function Migration() {
  return (
    <section id="migration" className="section-pad relative overflow-hidden bg-pk-deep/50">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Chapter IV"
          title="Migration"
          subtitle="One of history’s largest displacements — families crossing new borders with little more than hope and memory."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-10 overflow-hidden rounded-2xl border border-white/10"
        >
          <img
            src="/images/gallery/migration-train.jpg"
            alt="Refugees crowding a train during the 1947 Partition migration"
            loading="lazy"
            className="h-56 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pk-night via-pk-night/10 to-transparent" />
          <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.25em] text-pk-mist/80">
            A refugee train, 1947
          </p>
        </motion.div>

        {/* Animated train */}
        <div className="relative mb-16 h-28 overflow-hidden border-y border-white/5">
          <div className="absolute inset-x-0 bottom-8 h-px bg-pk-mist/30" />
          <motion.div
            className="absolute bottom-10 flex items-end gap-1"
            animate={{ x: ['-40%', '110%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex items-end gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-16 items-center justify-center rounded-sm border border-white/20 bg-pk-forest/80"
                >
                  <span className="grid grid-cols-2 gap-1">
                    <span className="h-2 w-2 bg-pk-gold/40" />
                    <span className="h-2 w-2 bg-pk-gold/40" />
                  </span>
                </div>
              ))}
              <div className="h-12 w-14 rounded-sm border border-white/25 bg-pk-green/70" />
            </div>
          </motion.div>
          <p className="absolute left-0 top-2 text-[10px] uppercase tracking-[0.35em] text-pk-mist">
            Refugee trains · 1947
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {migrationFacts.map((f) => (
            <div key={f.label} className="text-center">
              <Counter
                value={f.value}
                suffix={f.suffix}
                className="display text-5xl text-pk-cream md:text-6xl"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-pk-mint">{f.label}</p>
              <p className="mt-3 text-sm text-pk-mist">{f.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <InteractiveSuitcase />
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-xl text-center display text-2xl italic text-pk-cream/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Suitcases held photographs. Hearts held tomorrow. Nations were redrawn — but human dignity
          remained the true cargo.
        </motion.p>
      </div>
    </section>
  )
}
