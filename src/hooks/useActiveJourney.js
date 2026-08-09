import { useEffect, useState } from 'react'
import { timelineYears } from '../data/timeline'

/** Track which timeline year / section is most visible while scrolling */
export function useActiveJourney(ready = true) {
  const [activeYear, setActiveYear] = useState(timelineYears[0].year)
  const [activeSection, setActiveSection] = useState('hero')
  const [mood, setMood] = useState('night')

  useEffect(() => {
    // Sections don't exist in the DOM until the loader finishes and
    // JourneyPage mounts — wait for that instead of observing nothing.
    if (!ready) return
    const sectionIds = [
      'hero',
      'before',
      'newspaper',
      'movement',
      'independence',
      'migration',
      'wars',
      'then-now',
      'museum',
      'achievements',
      'symbols',
      'innovators',
      'current',
      'challenges',
      'future',
      'dreams',
      'quiz',
      'contribute',
      'ending',
    ]

    const yearBySection = {
      hero: { year: '1857', mood: 'night' },
      before: { year: '1906', mood: 'sepia' },
      newspaper: { year: '1940', mood: 'sepia' },
      movement: { year: '1940', mood: 'sepia' },
      independence: { year: '1947', mood: 'midnight' },
      migration: { year: '1948', mood: 'dawn' },
      wars: { year: '1965', mood: 'solemn' },
      'then-now': { year: 'Today', mood: 'green' },
      museum: { year: '1947', mood: 'sepia' },
      achievements: { year: '1999', mood: 'dawn' },
      symbols: { year: '1947', mood: 'dawn' },
      innovators: { year: 'Today', mood: 'green' },
      current: { year: 'Today', mood: 'green' },
      challenges: { year: 'Today', mood: 'dawn' },
      future: { year: '2050', mood: 'neon' },
      dreams: { year: '2050', mood: 'neon' },
      quiz: { year: 'Today', mood: 'green' },
      contribute: { year: '2050', mood: 'neon' },
      ending: { year: '2050', mood: 'midnight' },
    }

    const observers = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
            setActiveSection(id)
            const meta = yearBySection[id]
            if (meta) {
              setActiveYear(meta.year)
              setMood(meta.mood)
            }
          }
        },
        { threshold: [0.28, 0.45], rootMargin: '-15% 0px -35% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [ready])

  return { activeYear, activeSection, mood, setMood, setActiveYear }
}
