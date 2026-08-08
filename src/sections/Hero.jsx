import { motion } from 'framer-motion'
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi'
import Starfield from '../components/effects/Starfield'
import Fog from '../components/effects/Fog'
import Particles from '../components/effects/Particles'
import CrescentStarGlow from '../components/effects/CrescentStarGlow'
import PakistanFlag from '../components/effects/PakistanFlag'
import TypingText from '../components/ui/TypingText'
import Button from '../components/ui/Button'
import IndependenceBadge from '../components/ui/IndependenceBadge'
import { useApp } from '../context/AppContext'
import { easterEggFacts } from '../data/easterEggs'

export default function Hero() {
  const { soundOn, anthemOn, toggleSound, muted, toggleMute, loaderDone, revealSecret } = useApp()
  const playing = soundOn || anthemOn
  const audioLive = playing && !muted

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gradient-glow"
    >
      <Starfield count={100} />
      <Particles count={22} />
      <Fog />

      {/* Distant soft moon wash — kept subtle so emblem glow remains primary. Hidden easter egg: click it. */}
      <motion.button
        type="button"
        onClick={() => revealSecret(easterEggFacts.moon, 'secret-star')}
        aria-label="A quiet moon"
        className="absolute right-[10%] top-[14%] h-20 w-20 cursor-pointer rounded-full bg-[radial-gradient(circle,rgba(232,238,221,0.55),transparent_70%)] blur-sm md:h-28 md:w-28"
        animate={{ y: [0, 8, 0], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <IndependenceBadge className="mb-8" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={loaderDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <CrescentStarGlow />
          <button
            type="button"
            onClick={() => revealSecret(easterEggFacts.flag, 'secret-star')}
            aria-label="The flag of Pakistan"
            className="relative z-10 mx-auto block cursor-pointer"
          >
            <PakistanFlag className="h-28 w-44 md:h-36 md:w-56" />
          </button>
        </motion.div>

        <motion.p
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.45em] text-pk-mint"
          initial={{ opacity: 0, y: 12 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          Echoes of Independence
        </motion.p>

        {loaderDone ? (
          <TypingText
            text="The Story of Pakistan"
            as="h1"
            className="display text-5xl leading-[1.05] text-pk-cream md:text-7xl lg:text-8xl"
            speed={42}
            delay={400}
          />
        ) : (
          <h1 className="display text-5xl text-pk-cream md:text-7xl">The Story of Pakistan</h1>
        )}

        <motion.p
          className="mt-6 max-w-md text-lg text-pk-mist md:text-xl"
          initial={{ opacity: 0 }}
          animate={loaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          A dream that changed history.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
        >
          <Button as="a" href="#before">
            Begin the Journey
          </Button>
          <button
            type="button"
            onClick={toggleSound}
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm text-pk-cream"
            data-cursor="hover"
            aria-pressed={playing}
          >
            {audioLive ? <HiOutlineVolumeUp /> : <HiOutlineVolumeOff />}
            {playing ? (muted ? 'Muted' : 'Sound On') : 'Background Music'}
          </button>
          {playing && (
            <button
              type="button"
              onClick={toggleMute}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-xs text-pk-mist"
              data-cursor="hover"
              aria-label={muted ? 'Unmute anthem' : 'Mute anthem'}
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-pk-mist"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-pk-mint to-transparent" />
      </motion.div>
    </section>
  )
}
