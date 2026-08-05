import { motion } from 'framer-motion'

/** CSS/SVG Pakistan flag with gentle wave */
export default function PakistanFlag({ className = '', waving = true }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-sm shadow-2xl ${className}`}
      animate={waving ? { rotate: [0, 0.6, -0.4, 0] } : undefined}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Flag of Pakistan"
      role="img"
    >
      <svg viewBox="0 0 900 600" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#01411C" />
        <rect width="225" height="600" fill="#FFFFFF" />
        <circle cx="520" cy="300" r="120" fill="#FFFFFF" />
        <circle cx="555" cy="300" r="96" fill="#01411C" />
        <polygon
          fill="#FFFFFF"
          points="620,190 640,248 702,250 652,286 670,344 620,310 570,344 588,286 538,250 600,248"
        />
      </svg>
      {waving && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '120%'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
        />
      )}
    </motion.div>
  )
}
