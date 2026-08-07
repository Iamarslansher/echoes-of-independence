import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useApp } from '../../context/AppContext'

export default function SecretToast() {
  const { secretToast } = useApp()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4">
      <AnimatePresence>
        {secretToast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex max-w-sm items-center gap-3 rounded-full px-5 py-3 text-sm text-pk-cream shadow-xl"
          >
            <HiOutlineSparkles className="shrink-0 text-lg text-pk-gold" />
            <span>{secretToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
