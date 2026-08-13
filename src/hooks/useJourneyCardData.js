import { useMemo } from 'react'
import { badgeDefs } from '../data/quiz'
import { DREAMS_STORAGE_KEY } from '../data/dreams'
import { readJSON } from '../utils/scroll'

export function useJourneyCardData() {
  return useMemo(() => {
    const earned = readJSON('eoi-badges', [])
    const quiz = readJSON('eoi-quiz-result', null)
    const dreams = readJSON(DREAMS_STORAGE_KEY, [])
    const latestDream = dreams.length ? dreams[dreams.length - 1] : null

    const badges = badgeDefs.filter((b) => earned.includes(b.id))

    return { badges, quiz, dream: latestDream?.text ?? null }
  }, [])
}
