import SectionHeading from '../components/ui/SectionHeading'
import MuseumCard from '../components/ui/MuseumCard'
import { museumArtifacts } from '../data/museum'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function Museum() {
  const revealRef = useGsapReveal()

  return (
    <section id="museum" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,39,0.09),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Digital Museum"
          title="Objects That Carried History"
          subtitle="A pen, a resolution, a train token — small things that were present for the biggest moments. Move your cursor over a case, then tap to read its story."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {museumArtifacts.map((artifact, i) => (
            <MuseumCard key={artifact.id} artifact={artifact} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
