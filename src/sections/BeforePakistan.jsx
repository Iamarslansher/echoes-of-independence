import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import GlassPanel from '../components/ui/GlassPanel'
import { beforePakistan } from '../data/journey'

export default function BeforePakistan() {
  return (
    <section id="before" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(1,65,28,0.25),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter I"
          title="Before Pakistan"
          subtitle="Under British rule, a political awakening took shape from the Muslim League to the Lahore Resolution."
        />

        {/* Stylized map pulse */}
        <motion.div
          className="relative mx-auto mb-16 h-40 max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-pk-deep/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-24 w-40 rounded-[40%] border border-pk-mint/30 bg-pk-forest/40"
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <p className="absolute text-xs uppercase tracking-[0.3em] text-pk-mist">British India · Pre-1947</p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-pk-mint/60 via-pk-gold/40 to-transparent md:left-1/2" />

          <ul className="space-y-10">
            {beforePakistan.map((item, i) => (
              <motion.li
                key={item.id}
                className={`relative md:flex md:items-start md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
              >
                <div className="mb-4 ml-10 md:mb-0 md:ml-0 md:w-1/2 md:px-6">
                  <GlassPanel className="border-amber-900/20 bg-[#1a140c]/40 backdrop-blur-md">
                    <p className="font-mono text-sm text-pk-gold">{item.year}</p>
                    <h3 className="display mt-2 text-2xl text-pk-cream">{item.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-pk-mist">{item.place}</p>
                    <p className="mt-4 text-sm leading-relaxed text-pk-mist">{item.description}</p>
                    <p className="mt-3 text-sm text-pk-mint/90">{item.importance}</p>
                    <ul className="mt-4 space-y-1 border-t border-white/10 pt-3 text-xs text-pk-mist">
                      {item.facts.map((f) => (
                        <li key={f}>· {f}</li>
                      ))}
                    </ul>
                  </GlassPanel>
                </div>
                <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-pk-mint shadow-[0_0_12px_#1db954] md:left-1/2" />
                <div className="hidden md:block md:w-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
