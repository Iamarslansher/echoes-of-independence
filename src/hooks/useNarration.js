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
  // Mirror the latest state in refs so speakSection always reads fresh
  // values even when called from an async callback (rAF/setTimeout)
  // whose closure captured an older render this was the bug that made
  // the very first "Play" press silently do nothing.
  const enabledRef = useRef(false)
  const langRef = useRef('en')
  const volumeRef = useRef(0.85)

  useEffect(() => {
    sectionRef.current = activeSection
  }, [activeSection])
  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])
  useEffect(() => {
    langRef.current = lang
  }, [lang])
  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    utterRef.current = null
    setPlaying(false)
  }, [])

  const speakSection = useCallback((sectionId) => {
    if (!enabledRef.current || !window.speechSynthesis) return
    const script = narrationScripts[sectionId]
    if (!script) return

    window.speechSynthesis.cancel()

    const text = script[langRef.current] || script.en
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = langRef.current === 'ur' ? 'ur-PK' : 'en-US'
    utter.rate = langRef.current === 'ur' ? 0.92 : 0.95
    utter.volume = volumeRef.current
    utter.onend = () => setPlaying(false)
    utter.onerror = () => setPlaying(false)
    utterRef.current = utter
    setPlaying(true)

    // Chrome has a known race where speak() called in the same tick as a
    // preceding cancel() can silently drop the utterance. A short delay
    // avoids it reliably.
    setTimeout(() => {
      if (utterRef.current === utter) {
        window.speechSynthesis.speak(utter)
      }
    }, 30)
  }, [])

  const toggleEnabled = useCallback(() => {
    setEnabled((on) => {
      const next = !on
      enabledRef.current = next
      if (!next) {
        window.speechSynthesis?.cancel()
        setPlaying(false)
      }
      return next
    })
  }, [])

  const togglePlay = useCallback(() => {
    if (!enabled) {
      // Update both the state (for UI) and the ref (so speakSection,
      // called immediately below, sees the change without waiting for
      // a re-render).
      setEnabled(true)
      enabledRef.current = true
      speakSection(sectionRef.current)
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
