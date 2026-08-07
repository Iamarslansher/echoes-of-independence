import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNarration } from '../hooks/useNarration'
import { useAchievements } from '../hooks/useAchievements'
import { useActiveJourney } from '../hooks/useActiveJourney'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('eoi-theme') || 'dark')
  const [soundOn, setSoundOn] = useState(false)
  const [anthemOn, setAnthemOn] = useState(false)
  const [muted, setMuted] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedContribution, setSelectedContribution] = useState(null)
  const [secretToast, setSecretToast] = useState(null)

  const narration = useNarration()
  const achievements = useAchievements()
  const journey = useActiveJourney(loaderDone)

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    document.body.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('eoi-theme', theme)
  }, [theme])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    document.body.classList.toggle('custom-cursor', fine)
  }, [])

  // Sync narrator with scroll-active section
  useEffect(() => {
    if (loaderDone) narration.setActiveSection(journey.activeSection)
  }, [journey.activeSection, loaderDone]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loaderDone) return
    achievements.markVisit(journey.activeSection)
  }, [journey.activeSection, loaderDone]) // eslint-disable-line react-hooks/exhaustive-deps

  const revealSecret = (message, badgeId) => {
    setSecretToast(message)
    if (badgeId) achievements.unlock(badgeId)
    window.setTimeout(() => setSecretToast(null), 3200)
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      soundOn,
      setSoundOn,
      toggleSound: () => {
        setMuted(false)
        setSoundOn((s) => {
          if (s || anthemOn) {
            setAnthemOn(false)
            return false
          }
          return true
        })
      },
      anthemOn,
      setAnthemOn,
      toggleAnthem: () => {
        setMuted(false)
        setAnthemOn((a) => {
          if (a || soundOn) {
            setSoundOn(false)
            return false
          }
          return true
        })
      },
      muted,
      setMuted,
      toggleMute: () => setMuted((m) => !m),
      loaderDone,
      setLoaderDone,
      progress,
      setProgress,
      selectedContribution,
      setSelectedContribution,
      narration,
      achievements,
      journey,
      secretToast,
      revealSecret,
    }),
    [
      theme,
      soundOn,
      anthemOn,
      muted,
      loaderDone,
      progress,
      selectedContribution,
      narration,
      achievements,
      journey,
      secretToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
