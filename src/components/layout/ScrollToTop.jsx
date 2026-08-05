import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineArrowUp } from 'react-icons/hi'
import { useApp } from '../../context/AppContext'

export default function ScrollToTop() {
  const { progress } = useApp()
  const show = progress > 0.12

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="glass fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-pk-cream"
          aria-label="Back to top"
          data-cursor="hover"
        >
          <HiOutlineArrowUp />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
