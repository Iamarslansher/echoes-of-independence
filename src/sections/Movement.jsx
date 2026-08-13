import { useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import QuoteBlock from '../components/ui/QuoteBlock'
import { leaders } from '../data/journey'

const MinarPakistan3D = lazy(() => import('../components/effects/MinarPakistan3D'))

function MonumentSkeleton() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-pk-gold/10 sm:h-96">
      <img
        src="/images/gallery/minar-e-pakistan-night.jpg"
        alt="Minar-e-Pakistan at night"
        loading="lazy"
        className="h-full w-full animate-pulse object-cover"
      />
    </div>
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
          subtitle="Leaders who turned a vision into a nation through resolve, poetry, courage, and statecraft."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            {leaders.map((l) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => setActive(l)}
                data-cursor="hover"
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                  active.id === l.id
                    ? 'border-pk-mint/40 bg-pk-forest/40'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
                whileHover={{ x: 4 }}
              >
                {l.image && (
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover object-top"
                  />
                )}
                <div>
                  <p className="display text-xl text-pk-cream">{l.name}</p>
                  <p className="text-xs text-pk-mist">{l.role}</p>
                </div>
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
              className="glass overflow-hidden rounded-3xl"
            >
              {active.image && (
                <div className="relative h-72 w-full overflow-hidden sm:h-80 md:h-[26rem]">
                  {/* Blurred, scaled-up copy fills the frame edge-to-edge */}
                  <img
                    src={active.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-110 object-cover object-top blur-2xl opacity-60"
                  />
                  {/* The real photo, always shown in full never cropped */}
                  <img
                    src={active.image}
                    alt={active.name}
                    loading="lazy"
                    className="relative z-10 h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-pk-night via-transparent to-transparent" />
                </div>
              )}
              <div className="p-8 md:p-10">
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
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-[1.1fr_1fr] sm:items-center">
          <motion.p
            className="text-sm leading-relaxed text-pk-mist"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Lahore Resolution of 23 March 1940 crystallized the demand for independent states for
            Muslim-majority regions the political birth certificate of Pakistan.
          </motion.p>
          <motion.img
            src="/images/gallery/lahore-resolution-text.jpg"
            alt="The Lahore Resolution, as inscribed at Minar-e-Pakistan"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-pk-gold/20 object-cover shadow-lg"
          />
        </div>

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
              Arsala Sher
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
