import { useCallback, useEffect, useRef, useState } from 'react'
import { narrationScripts } from '../data/narration'

/**
 * Optional AI narrator via Web Speech API.
 * English active; Urdu future-ready via lang switch.
 */
export function useNarration() {
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [lang, setLang] = useState('en')
  const [volume, setVolume] = useState(0.85)
  const [activeSection, setActiveSection] = useState('hero')
  const utterRef = useRef(null)
  const sectionRef = useRef('hero')

  useEffect(() => {
    sectionRef.current = activeSection
  }, [activeSection])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    utterRef.current = null
    setPlaying(false)
  }, [])

  const speakSection = useCallback(
    (sectionId) => {
      if (!enabled || !window.speechSynthesis) return
      const script = narrationScripts[sectionId]
      if (!script) return

      stop()
      const text = script[lang] || script.en
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang === 'ur' ? 'ur-PK' : 'en-US'
      utter.rate = lang === 'ur' ? 0.92 : 0.95
      utter.volume = volume
      utter.onend = () => setPlaying(false)
      utter.onerror = () => setPlaying(false)
      utterRef.current = utter
      setPlaying(true)
      window.speechSynthesis.speak(utter)
    },
    [enabled, lang, volume, stop],
  )

  const toggleEnabled = useCallback(() => {
    setEnabled((on) => {
      if (on) {
        window.speechSynthesis?.cancel()
        setPlaying(false)
        return false
      }
      return true
    })
  }, [])

  const togglePlay = useCallback(() => {
    if (!enabled) {
      setEnabled(true)
      // speak after enable on next tick
      requestAnimationFrame(() => speakSection(sectionRef.current))
      return
    }
    if (playing) {
      window.speechSynthesis?.pause()
      setPlaying(false)
      return
    }
    if (window.speechSynthesis?.paused) {
      window.speechSynthesis.resume()
      setPlaying(true)
      return
    }
    speakSection(sectionRef.current)
  }, [enabled, playing, speakSection])

  useEffect(() => {
    if (!enabled) return
    speakSection(activeSection)
  }, [activeSection]) // eslint-disable-line react-hooks/exhaustive-deps -- intentional: re-narrate on section change when enabled

  useEffect(() => () => stop(), [stop])

  return {
    enabled,
    playing,
    lang,
    setLang,
    volume,
    setVolume,
    activeSection,
    setActiveSection,
    toggleEnabled,
    togglePlay,
    speakSection,
    stop,
  }
}
