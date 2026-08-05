import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function GlassPanel({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      className={clsx('glass rounded-2xl p-6 md:p-8', className)}
      whileHover={hover ? { y: -4, borderColor: 'rgba(29,185,84,0.35)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
