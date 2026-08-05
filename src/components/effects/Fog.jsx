import { motion } from 'framer-motion'

/** Soft layered fog drifting across the hero */
export default function Fog() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] overflow-hidden" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-[-20%] bottom-0 h-full rounded-[100%] bg-gradient-to-t from-pk-forest/40 via-pk-green/10 to-transparent blur-2xl"
          style={{ opacity: 0.35 + i * 0.12 }}
          animate={{ x: i % 2 === 0 ? ['-8%', '8%', '-8%'] : ['6%', '-10%', '6%'] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
