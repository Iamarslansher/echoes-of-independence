import { useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import QuoteBlock from '../components/ui/QuoteBlock'
import { leaders } from '../data/journey'

const MinarPakistan3D = lazy(() => import('../components/effects/MinarPakistan3D'))

function MonumentSkeleton() {
  return (
    <div className="h-72 w-full animate-pulse rounded-2xl border border-pk-gold/10 bg-black/20 sm:h-96" />
  )
}

export default function Movement() {
  const [active, setActive] = useState(leaders[0])

  return (
    <section id="movement" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter II"
          title="Pakistan Movement"
          subtitle="Leaders who turned a vision into a nation — through resolve, poetry, courage, and statecraft."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            {leaders.map((l) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => setActive(l)}
                data-cursor="hover"
                className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                  active.id === l.id
                    ? 'border-pk-mint/40 bg-pk-forest/40'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
                whileHover={{ x: 4 }}
              >
                <p className="display text-xl text-pk-cream">{l.name}</p>
                <p className="text-xs text-pk-mist">{l.role}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-pk-gold">{active.years}</p>
              <h3 className="display mt-2 text-4xl text-pk-cream">{active.name}</h3>
              <p className="mt-1 text-sm text-pk-mint">{active.role}</p>
              <p className="mt-6 leading-relaxed text-pk-mist">{active.bio}</p>
              <div className="mt-8">
                <QuoteBlock quote={active.quote} author={active.name} />
              </div>
              <ul className="mt-8 space-y-2 text-sm text-pk-mist">
                {active.facts.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-pk-mint">▸</span> {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-2xl text-center text-sm text-pk-mist"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Lahore Resolution of 23 March 1940 crystallized the demand for independent states for
          Muslim-majority regions — the political birth certificate of Pakistan.
        </motion.p>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-pk-mist/50">
            Minar-e-Pakistan now stands on this ground, in Lahore
          </p>
          <Suspense fallback={<MonumentSkeleton />}>
            <MinarPakistan3D />
          </Suspense>
          <p className="mt-3 text-center text-[11px] text-pk-mist/40">
            3D model:{' '}
            <a
              href="https://sketchfab.com/3d-models/minar-e-pakistan-eb3a6e9b06a34b30a8e101c6631040a8"
              target="_blank"
              rel="noreferrer noopener"
              className="underline hover:text-pk-mist/70"
            >
              "Minar-e-Pakistan"
            </a>{' '}
            by{' '}
            <a
              href="https://sketchfab.com/talhataram"
              target="_blank"
              rel="noreferrer noopener"
              className="underline hover:text-pk-mist/70"
            >
              talhataram
            </a>
            , licensed{' '}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer noopener"
              className="underline hover:text-pk-mist/70"
            >
              CC-BY-4.0
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
