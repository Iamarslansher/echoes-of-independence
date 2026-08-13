import SectionHeading from '../components/ui/SectionHeading'
import CultureExplorer from '../components/ui/CultureExplorer'
import LanguageWall from '../components/ui/LanguageWall'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Culture() {
  const revealRef = useGsapReveal()

  return (
    <section id="culture" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(29,185,84,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="One Country, Many Voices"
          title="Pakistani Culture"
          subtitle="Six regions, eleven languages the texture beneath the flag. Explored respectfully, not reduced to a stereotype."
        />

        <CultureExplorer />

        <div className="mt-20">
          <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-pk-gold">
            Language Wall
          </p>
          <h3 className="display mb-10 text-center text-2xl text-pk-cream sm:text-3xl">
            How Do You Say It in Your Language?
          </h3>
          <LanguageWall />
        </div>
      </div>
    </section>
  )
}
