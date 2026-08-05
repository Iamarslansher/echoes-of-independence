import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <motion.header
      className={`mb-14 flex max-w-3xl flex-col gap-4 ${alignClass} ${align === 'center' ? 'mx-auto' : ''}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-pk-mint/80">{eyebrow}</p>
      )}
      <h2 className="display text-4xl leading-tight text-balance md:text-5xl lg:text-6xl">{title}</h2>
      {subtitle && (
        <p className="max-w-xl text-base leading-relaxed text-pk-mist md:text-lg">{subtitle}</p>
      )}
    </motion.header>
  )
}
