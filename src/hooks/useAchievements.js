import { useCallback, useEffect, useState } from 'react'
import { badgeDefs } from '../data/quiz'
import { readJSON, writeJSON } from '../utils/scroll'

const KEY = 'eoi-badges'
const VISIT_KEY = 'eoi-visits'

export function useAchievements() {
  const [earned, setEarned] = useState(() => readJSON(KEY, []))
  const [visits, setVisits] = useState(() => readJSON(VISIT_KEY, {}))

  useEffect(() => writeJSON(KEY, earned), [earned])
  useEffect(() => writeJSON(VISIT_KEY, visits), [visits])

  const unlock = useCallback((id) => {
    setEarned((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const markVisit = useCallback(
    (sectionId) => {
      setVisits((v) => {
        const next = { ...v, [sectionId]: true }
        if (next.museum && next.innovators) unlock('innovation-supporter')
        return next
      })
    },
    [unlock],
  )

  const badges = badgeDefs.map((b) => ({
    ...b,
    unlocked: earned.includes(b.id),
  }))

  return { earned, badges, unlock, markVisit, visits }
}
