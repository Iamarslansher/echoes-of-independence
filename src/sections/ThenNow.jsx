import SectionHeading from '../components/ui/SectionHeading'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import { thenNowComparisons } from '../data/thenNow'
import { useGsapReveal } from '../hooks/useGsapReveal'

export default function ThenNow() {
  const revealRef = useGsapReveal()

  return (
    <section id="then-now" className="section-pad relative overflow-hidden" ref={revealRef}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(201,162,39,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pakistan Then vs Now"
          title="Drag to See What Changed"
          subtitle="Same cities, same country a different pace entirely. Drag each slider to compare."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {thenNowComparisons.map((c) => (
            <BeforeAfterSlider
              key={c.id}
              title={c.title}
              then={c.then}
              now={c.now}
              thenImage={c.thenImage}
              nowImage={c.nowImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
