import { motion } from 'framer-motion'

export default function NewspaperPage({ edition }) {
  return (
    <motion.div
      key={edition.id}
      initial={{ opacity: 0, scaleY: 0.05, transformOrigin: 'top center' }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.05 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-3xl"
    >
      <div
        className="relative overflow-hidden rounded-sm border border-[#d8c9a3]/40 px-7 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:px-12 sm:py-10"
        style={{
          background: 'linear-gradient(160deg, #ede1c3 0%, #e4d5ae 45%, #ddc99c 100%)',
          color: '#2a2113',
        }}
      >
        {/* Paper grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Aged stains */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #8a6a3a, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6b5024, transparent 70%)' }}
        />
        {/* Center fold crease */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/10" />

        <div className="relative">
          {/* Masthead */}
          <div className="border-b-2 border-[#2a2113]/70 pb-3 text-center">
            <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#5a4726]">
              {edition.date}
            </p>
            <h2
              className="mt-1 text-4xl tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {edition.masthead}
            </h2>
          </div>

          {/* Ink-spread headline */}
          <motion.h3
            key={`${edition.id}-headline`}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
            className="mt-6 text-center text-2xl font-semibold uppercase leading-tight tracking-wide sm:text-3xl"
          >
            {edition.headline}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-2 text-center text-sm italic text-[#4a3a1e] sm:text-base"
          >
            {edition.subhead}
          </motion.p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-sm leading-relaxed sm:text-base"
              style={{ columns: '1', textAlign: 'justify' }}
            >
              {edition.body}
            </motion.p>

            {/* Stylized photo plate (no archival photography available) */}
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
              className="h-32 w-full overflow-hidden border-2 border-[#2a2113]/60 bg-[#d8c9a3] sm:h-36 sm:w-40"
            >
              {edition.image ? (
                <img
                  src={edition.image}
                  alt={edition.imageLabel}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ filter: 'sepia(0.5) contrast(1.05)' }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="px-2 text-center font-serif text-[10px] uppercase tracking-[0.25em] text-[#5a4726]">
                    {edition.imageLabel}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
