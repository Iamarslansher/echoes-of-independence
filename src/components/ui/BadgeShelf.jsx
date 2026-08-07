import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export default function BadgeShelf() {
  const { achievements } = useApp()
  const unlockedCount = achievements.badges.filter((b) => b.unlocked).length

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-pk-mist">
        {unlockedCount} of {achievements.badges.length} badges earned
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {achievements.badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center gap-2"
            title={badge.unlocked ? badge.description : `Locked — ${badge.description}`}
          >
            <motion.div
              animate={
                badge.unlocked
                  ? { boxShadow: '0 0 24px rgba(201,162,39,0.35)' }
                  : { boxShadow: '0 0 0px rgba(201,162,39,0)' }
              }
              className={`flex h-16 w-16 items-center justify-center rounded-full border text-2xl transition-all sm:h-20 sm:w-20 sm:text-3xl ${
                badge.unlocked
                  ? 'border-pk-gold/50 bg-pk-gold/10'
                  : 'border-white/10 bg-white/[0.03] grayscale opacity-40'
              }`}
            >
              {badge.icon}
            </motion.div>
            <span
              className={`max-w-[6.5rem] text-center text-[10px] leading-tight ${
                badge.unlocked ? 'text-pk-gold' : 'text-pk-mist/50'
              }`}
            >
              {badge.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
