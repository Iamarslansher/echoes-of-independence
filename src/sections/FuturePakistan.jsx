import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Particles from '../components/effects/Particles'
import { futureVisions } from '../data/journey'

export default function FuturePakistan() {
  return (
    <section id="future" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pk-night via-[#021810] to-pk-night" />
      <Particles count={36} color="rgba(29,185,84,0.35)" />

      {/* Futuristic city skyline silhouette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-center gap-1 opacity-40" aria-hidden>
        {[40, 70, 55, 90, 60, 110, 75, 95, 50, 80, 65, 100, 45].map((h, i) => (
          <motion.div
            key={i}
            className="w-6 rounded-t bg-gradient-to-t from-pk-mint/40 to-pk-forest/20 md:w-10"
            style={{ height: h }}
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter IX"
          title="Future Pakistan"
          subtitle="AI, green energy, space, and a digital economy — the skyline we have not built yet."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futureVisions.map((v, i) => (
            <motion.div
              key={v.title}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ borderColor: 'rgba(29,185,84,0.45)' }}
            >
              <h3 className="display text-2xl text-pk-cream">{v.title}</h3>
              <p className="mt-3 text-sm text-pk-mist">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
