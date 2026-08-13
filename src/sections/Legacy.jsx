import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { scienceTimeline } from '../data/science'
import { sportsLegacy } from '../data/sports'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Legacy() {
  const revealRef = useGsapReveal()

  return (
    <section id="legacy" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(29,185,84,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Science, Space & Sport"
          title="Proof in the Record Books"
          subtitle="From Sonmiani's launch pad to the world's hardest peaks a look at where Pakistan has already led."
        />

        {/* Science & Space timeline */}
        <div className="mb-6">
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-pk-mint">
            Science &amp; Space Journey
          </p>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2" />
            <div className="flex flex-col gap-8">
              {scienceTimeline.map((item, i) => {
                const isEven = i % 2 === 0
                return (
                  <div key={item.year + item.title} className="relative flex sm:justify-center">
                    <span className="absolute left-4 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-pk-mint shadow-[0_0_10px_rgba(29,185,84,0.7)] sm:left-1/2" />
                    <motion.div
                      data-reveal
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className={`ml-10 w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:ml-0 sm:w-[44%] ${
                        isEven ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-sm text-pk-gold">{item.year}</span>
                        <span className="text-[10px] uppercase tracking-widest text-pk-mist">
                          {item.org}
                        </span>
                      </div>
                      <h4 className="display mt-1 text-lg text-pk-cream">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-pk-mist">{item.text}</p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sports Legacy */}
        <div className="mt-20">
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-pk-gold">
            Sports Legacy
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sportsLegacy.map((s, i) => (
              <motion.div
                key={s.id}
                data-reveal
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                data-cursor="hover"
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6"
              >
                <span className="text-3xl">{s.icon}</span>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-pk-gold">{s.sport}</p>
                <h4 className="display mt-1 text-lg text-pk-cream">{s.headline}</h4>
                <p className="mt-2 text-sm leading-relaxed text-pk-mist">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
