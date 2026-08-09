import { motion, AnimatePresence } from 'framer-motion'
import { useIndependenceCountdown } from '../../hooks/useIndependenceCountdown'

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

function Unit({ value, label }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="font-mono tabular-nums text-pk-cream">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] text-pk-mist">{label}</span>
    </span>
  )
}

export default function IndependenceBadge({ className = '' }) {
  const { isToday, years, days, hours, minutes, seconds } = useIndependenceCountdown()

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className={`glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 ${className}`}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-pk-mint"
        animate={isToday ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 1.4, repeat: isToday ? Infinity : 0 }}
      />

      <AnimatePresence mode="wait">
        {isToday ? (
          <motion.span
            key="today"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-pk-cream"
          >
            🎉 Happy {ordinal(years)} Independence Day
          </motion.span>
        ) : (
          <motion.span
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[11px]"
          >
            <span className="hidden font-mono uppercase tracking-[0.15em] text-pk-mist sm:inline">
              {ordinal(years)} Independence Day in
            </span>
            <span className="font-mono uppercase tracking-[0.15em] text-pk-mist sm:hidden">
              Independence Day in
            </span>
            <span className="flex items-baseline gap-1.5">
              <Unit value={days} label="d" />
              <Unit value={hours} label="h" />
              <Unit value={minutes} label="m" />
              <Unit value={seconds} label="s" />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
