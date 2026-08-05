import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-8">
      <motion.div
        className="glass mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-3xl px-6 py-6 sm:flex-row sm:justify-between sm:gap-8 md:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="#hero"
          className="group flex items-center gap-4"
          data-cursor="hover"
          aria-label="Echoes of Independence — back to top"
        >
          <motion.img
            src="/images/logo.png"
            alt="Echoes of Independence: The Story of Pakistan"
            className="h-14 w-auto object-contain drop-shadow-[0_0_18px_rgba(29,185,84,0.35)] sm:h-16"
            whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          />
          <span className="hidden flex-col sm:flex">
            <span className="display text-lg leading-none text-pk-cream transition-colors group-hover:text-pk-mint">
              Echoes of Independence
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-pk-mist">
              The Story of Pakistan
            </span>
          </span>
        </a>

        <motion.p
          className="text-center text-sm text-pk-mist sm:text-right"
          whileHover={{ color: '#f4f7f2' }}
        >
          Built with pride for Pakistan{' '}
          <span className="text-red-400" aria-hidden>
            ❤️
          </span>{' '}
          by{' '}
          <span className="text-pk-mint transition-colors">Arsalan Sher</span>
        </motion.p>
      </motion.div>

      <p className="mx-auto mt-5 max-w-6xl text-center text-[11px] text-pk-mist/60">
        Historical content curated for educational storytelling. © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
