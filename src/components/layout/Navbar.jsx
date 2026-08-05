import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMoon, HiOutlineSun, HiOutlineVolumeOff, HiOutlineVolumeUp, HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useApp } from '../../context/AppContext'
import { navLinks } from '../../data/journey'

const Logo = '/images/logo.png'

export default function Navbar() {
  const { theme, toggleTheme, soundOn, toggleSound } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.7 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#hero" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-light-primary text-xs font-semibold text-pk-cream">
            {/* EOI */}
            <img src={Logo} alt="Logo" className="h-10 w-10" />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="display text-lg leading-none text-pk-cream transition-colors group-hover:text-pk-mint">
              Echoes of Independence
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-pk-mist">The Story of Pakistan</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.slice(0, 7).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-xs text-pk-mist transition-colors hover:text-pk-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Pause national anthem' : 'Play national anthem'}
            className="glass grid h-10 w-10 place-items-center rounded-full"
            data-cursor="hover"
          >
            {soundOn ? <HiOutlineVolumeUp /> : <HiOutlineVolumeOff />}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="glass grid h-10 w-10 place-items-center rounded-full"
            data-cursor="hover"
          >
            {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
          <button
            type="button"
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mx-4 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-pk-cream hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
