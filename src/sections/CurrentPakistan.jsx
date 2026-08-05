import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { currentPakistan } from '../data/journey'

const PakistanMap = lazy(() => import('../components/map/PakistanMap'))

const stats = [
  { label: 'IT Exports Trajectory', value: 'Rising' },
  { label: 'Young Talent', value: '60%+' },
  { label: 'Startup Energy', value: 'Live' },
  { label: 'Digital Push', value: 'On' },
]

export default function CurrentPakistan() {
  return (
    <section id="current" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter VII"
          title="Current Pakistan"
          subtitle="A digital generation is rewriting what Pakistan can be — in code, design, AI, and enterprise."
        />

        <motion.div
          className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-pk-deep/60 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-pk-mint">Live Pulse · Digital Pakistan</p>
            <span className="flex items-center gap-2 text-xs text-pk-mist">
              <span className="h-2 w-2 animate-pulse rounded-full bg-pk-mint" /> Online
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.04] p-4">
                <p className="display text-2xl text-pk-cream md:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] text-pk-mist">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex h-16 items-end gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-pk-forest to-pk-mint"
                animate={{ height: [`${20 + (i % 5) * 8}%`, `${40 + (i % 7) * 8}%`, `${20 + (i % 5) * 8}%`] }}
                transition={{ duration: 2.4 + (i % 4) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <h3 className="display mb-8 text-center text-3xl text-pk-cream md:text-4xl">
            Across Every Province
          </h3>
          <Suspense
            fallback={
              <div className="grid h-64 place-items-center rounded-3xl border border-white/10 text-sm text-pk-mist">
                Loading interactive map…
              </div>
            }
          >
            <PakistanMap />
          </Suspense>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPakistan.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl border border-white/10 p-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h3 className="display text-xl text-pk-cream">{c.title}</h3>
              <p className="mt-2 text-sm text-pk-mist">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
