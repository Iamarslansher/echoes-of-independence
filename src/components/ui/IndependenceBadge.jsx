import { motion } from 'framer-motion'

const INDEPENDENCE_YEAR = 1947

function ordinal(n) {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

export default function IndependenceBadge({ className = '' }) {
  const years = new Date().getFullYear() - INDEPENDENCE_YEAR

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className={`glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-pk-mint" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pk-cream">
        Happy {ordinal(years)} Independence Day
      </span>
    </motion.div>
  )
}
