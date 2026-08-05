import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineCode,
  HiOutlineChip,
  HiOutlineHeart,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineGlobe,
  HiOutlineBeaker,
  HiOutlineDesktopComputer,
} from 'react-icons/hi'
import SectionHeading from '../components/ui/SectionHeading'
import { contributions } from '../data/journey'
import { useApp } from '../context/AppContext'

const icons = {
  code: HiOutlineCode,
  brain: HiOutlineChip,
  heart: HiOutlineHeart,
  book: HiOutlineBookOpen,
  briefcase: HiOutlineBriefcase,
  leaf: HiOutlineGlobe,
  flask: HiOutlineBeaker,
  cpu: HiOutlineDesktopComputer,
}

export default function Contribution() {
  const { selectedContribution, setSelectedContribution } = useApp()
  const selected = contributions.find((c) => c.id === selectedContribution)

  return (
    <section id="contribute" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Chapter X"
          title="What will YOU build for Pakistan?"
          subtitle="Choose a path. Your contribution — however small it feels today — is the next line of this story."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contributions.map((c, i) => {
            const Icon = icons[c.icon] || HiOutlineCode
            const isOn = selectedContribution === c.id
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => setSelectedContribution(isOn ? null : c.id)}
                data-cursor="hover"
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  isOn ? 'border-pk-mint bg-pk-forest/50' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <Icon className="text-2xl text-pk-mint" />
                <h3 className="display mt-4 text-xl text-pk-cream">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-pk-mist">{c.prompt}</p>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass mt-10 rounded-3xl p-8 text-center md:p-10">
                <p className="text-xs uppercase tracking-[0.35em] text-pk-mint">Your pledge</p>
                <p className="display mt-3 text-3xl text-pk-cream md:text-4xl">
                  I will build for Pakistan through {selected.title}.
                </p>
                <p className="mx-auto mt-4 max-w-lg text-pk-mist">{selected.prompt}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
