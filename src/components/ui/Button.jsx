import { motion } from 'framer-motion'
import clsx from 'clsx'

const variants = {
  primary:
    'bg-pk-green text-pk-white hover:bg-pk-mint shadow-[0_0_40px_color-mix(in_oklab,#0a7a3a_35%,transparent)]',
  ghost:
    'glass text-pk-cream hover:bg-white/10',
  gold:
    'bg-pk-gold/90 text-pk-night hover:bg-pk-gold',
}

export default function Button({
  children,
  variant = 'primary',
  className,
  as: Comp = 'button',
  ...props
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <Comp
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300',
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  )
}
