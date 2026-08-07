import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { moodStyles } from '../../data/timeline'

export default function DynamicBackground() {
  const { journey } = useApp()
  const bg = moodStyles[journey.mood] ?? moodStyles.night

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={journey.mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ background: bg }}
        />
      </AnimatePresence>
    </div>
  )
}
