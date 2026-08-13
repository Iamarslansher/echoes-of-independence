import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MuseumCard({ artifact, index }) {
  const cardRef = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 220, damping: 20 })
  const spotlightX = useTransform(mx, (v) => `${v * 100}%`)
  const spotlightY = useTransform(my, (v) => `${v * 100}%`)

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseEnter() {
    setHovered(true)
  }

  function handleMouseLeave() {
    mx.set(0.5)
    my.set(0.5)
    setHovered(false)
  }

  return (
    <div data-reveal style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="relative h-52 w-full"
      >
        {/* Cursor-following soft spotlight, museum vitrine lighting */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-20 rounded-2xl transition-opacity duration-300"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(255,255,255,0.14), transparent 65%)`,
            ),
          }}
        />

        {/* Flip wrapper */}
        <motion.button
          type="button"
          data-cursor="hover"
          onClick={() => setFlipped((f) => !f)}
          aria-label={`${artifact.title} tap to ${flipped ? 'show summary' : 'read more'}`}
          className="absolute inset-0 h-full w-full text-left"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="glass absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {artifact.image && (
              <>
                <img
                  src={artifact.image}
                  alt={artifact.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              </>
            )}
            <div className="relative flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-pk-mint">
                {artifact.category}
              </span>
              <span className="font-mono text-[10px] text-pk-mist">{artifact.era}</span>
            </div>
            <div className="relative">
              <h3 className="display text-xl text-pk-cream">{artifact.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pk-mist">{artifact.front}</p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-pk-gold/25 bg-pk-forest/40 p-5"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-pk-gold">
              {artifact.title}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-pk-cream">{artifact.back}</p>
          </div>
        </motion.button>
      </motion.div>
    </div>
  )
}
