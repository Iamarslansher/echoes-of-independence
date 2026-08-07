import { motion } from 'framer-motion'
import { timelineYears } from '../../data/timeline'
import { scrollToId } from '../../utils/scroll'
import { useApp } from '../../context/AppContext'

export default function JourneyRail() {
  const { journey } = useApp()
  const activeIndex = timelineYears.findIndex((t) => t.year === journey.activeYear)
  const progressPct =
    activeIndex >= 0 ? (activeIndex / (timelineYears.length - 1)) * 100 : 0

  return (
    <nav
      aria-label="Historical journey timeline"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col items-center py-2">
        {/* Track */}
        <div className="absolute top-0 h-full w-px bg-white/10" />
        {/* Glowing progress line */}
        <motion.div
          className="absolute top-0 w-px bg-gradient-to-b from-pk-mint via-pk-gold to-pk-mint"
          style={{
            boxShadow: '0 0 8px rgba(29,185,84,0.7), 0 0 2px rgba(201,162,39,0.8)',
          }}
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        <ul className="relative flex flex-col justify-between" style={{ height: `${(timelineYears.length - 1) * 34}px` }}>
          {timelineYears.map((t, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex
            return (
              <li key={`${t.year}-${t.label}`} className="pointer-events-auto relative flex items-center">
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={() => scrollToId(t.id)}
                  aria-label={`Jump to ${t.year} — ${t.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative flex items-center gap-3 py-[1px]"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.5 : 1,
                      backgroundColor: isActive
                        ? '#c9a227'
                        : isPast
                          ? '#1db954'
                          : 'rgba(255,255,255,0.25)',
                    }}
                    transition={{ duration: 0.35 }}
                    className="block h-2 w-2 rounded-full"
                    style={
                      isActive
                        ? { boxShadow: '0 0 10px rgba(201,162,39,0.9)' }
                        : undefined
                    }
                  />
                  <span
                    className={`absolute right-5 whitespace-nowrap rounded-md border border-pk-gold/30 bg-pk-night/90 px-2.5 py-1 text-[11px] transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="font-mono text-pk-gold">{t.year}</span>{' '}
                    <span className="text-pk-mist">{t.label}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
