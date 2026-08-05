import { motion } from 'framer-motion'
import PakistanFlag from '../components/effects/PakistanFlag'
import Fireworks from '../components/effects/Fireworks'
import Starfield from '../components/effects/Starfield'
import Button from '../components/ui/Button'

export default function Ending() {
  return (
    <section id="ending" className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-pk-deep to-pk-night" />
      <Starfield count={90} />
      <Fireworks active bursts={8} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <PakistanFlag className="mb-10 h-32 w-52 md:h-40 md:w-64" />
        </motion.div>

        <motion.p
          className="display text-4xl leading-snug text-pk-cream md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          The story isn&apos;t over.
          <br />
          <span className="text-pk-mint">The next chapter will be written by us.</span>
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button as="a" href="#contribute" variant="gold">
            Build Pakistan
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
