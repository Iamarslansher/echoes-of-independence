import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import PakistanFlag from '../components/effects/PakistanFlag'
import Fireworks from '../components/effects/Fireworks'
import Starfield from '../components/effects/Starfield'
import { independenceMoments } from '../data/journey'
import { useApp } from '../context/AppContext'
import { HiOutlineMusicNote } from 'react-icons/hi'
import ADayIn1947 from '../components/ui/ADayIn1947'
import RadioPakistan from '../components/ui/RadioPakistan'

export default function Independence() {
  const { anthemOn, toggleAnthem } = useApp()

  return (
    <section id="independence" className="relative min-h-[90vh] overflow-hidden section-pad">
      <div className="absolute inset-0 bg-gradient-to-b from-pk-night via-pk-deep to-pk-night" />
      <Starfield count={60} />
      <Fireworks active bursts={7} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Chapter III"
          title="Independence"
          subtitle="14 August 1947 midnight opened a new chapter in world history."
        />

        <div className="mb-16">
          <ADayIn1947 />
        </div>

        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="mx-auto mb-2 h-32 w-px bg-gradient-to-b from-transparent to-pk-mist/50" />
            <PakistanFlag className="h-36 w-56 md:h-44 md:w-72" />
          </motion.div>

          <motion.div
            className="display text-6xl text-pk-gold md:text-8xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            00:00
          </motion.div>
          <p className="text-sm uppercase tracking-[0.4em] text-pk-mist">Clock strikes midnight</p>

          <button
            type="button"
            onClick={toggleAnthem}
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
            data-cursor="hover"
          >
            <HiOutlineMusicNote />
            {anthemOn ? 'Anthem Playing' : 'Play National Anthem'}
          </button>

          <div className="mt-6 w-full">
            <RadioPakistan />
          </div>

          <div className="mt-8 grid w-full gap-4 md:grid-cols-3">
            {independenceMoments.map((m, i) => (
              <motion.div
                key={m.title}
                className="glass rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <p className="text-xs uppercase tracking-widest text-pk-mint">{m.time}</p>
                <h3 className="display mt-2 text-2xl">{m.title}</h3>
                <p className="mt-3 text-sm text-pk-mist">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
