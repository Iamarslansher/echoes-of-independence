import { motion } from 'framer-motion'

export default function QuoteBlock({ quote, author, className = '' }) {
  return (
    <motion.blockquote
      className={`relative max-w-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className="display absolute -top-6 left-0 text-6xl text-pk-green/40" aria-hidden>
        “
      </span>
      <p className="display text-2xl italic leading-snug text-pk-cream md:text-3xl">{quote}</p>
      {author && <footer className="mt-4 text-sm tracking-wide text-pk-mist">— {author}</footer>}
    </motion.blockquote>
  )
}
