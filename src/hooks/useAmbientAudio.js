import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

const TRACK_PATH = '/audio/anthem.mp3'
const TARGET_VOLUME = 0.55
const FADE_MS = 900

/** Singleton so Hero + Independence toggles never spawn duplicate playback. */
let sharedAudio = null
let fadeRaf = 0

function getAudio() {
  if (!sharedAudio) {
    sharedAudio = new Audio(TRACK_PATH)
    sharedAudio.loop = true
    sharedAudio.preload = 'auto'
    sharedAudio.volume = 0
  }
  return sharedAudio
}

function cancelFade() {
  if (fadeRaf) {
    cancelAnimationFrame(fadeRaf)
    fadeRaf = 0
  }
}

function fadeVolume(audio, to, { onDone } = {}) {
  cancelFade()
  const from = audio.volume
  const start = performance.now()

  const step = (now) => {
    const t = Math.min(1, (now - start) / FADE_MS)
    const eased = t * (2 - t)
    audio.volume = from + (to - from) * eased
    if (t < 1) {
      fadeRaf = requestAnimationFrame(step)
    } else {
      fadeRaf = 0
      audio.volume = to
      onDone?.()
    }
  }

  fadeRaf = requestAnimationFrame(step)
}

/**
 * National anthem playback driven by existing sound / anthem toggles.
 * No autoplay — starts only after user interaction. Smooth fade in/out.
 */
export function useAmbientAudio() {
  const { soundOn, anthemOn, muted } = useApp()
  const wantPlayRef = useRef(false)

  useEffect(() => {
    const shouldPlay = (soundOn || anthemOn) && !muted
    wantPlayRef.current = shouldPlay
    const audio = getAudio()

    if (shouldPlay) {
      const start = () => {
        if (!wantPlayRef.current) return
        fadeVolume(audio, TARGET_VOLUME)
      }

      if (audio.paused) {
        audio.volume = 0
        const playPromise = audio.play()
        if (playPromise?.then) {
          playPromise.then(start).catch(() => {
            /* Autoplay blocked until a later user gesture — toggles already are gestures */
          })
        } else {
          start()
        }
      } else {
        fadeVolume(audio, TARGET_VOLUME)
      }
    } else {
      if (!audio.paused) {
        fadeVolume(audio, 0, {
          onDone: () => {
            if (!wantPlayRef.current) audio.pause()
          },
        })
      } else {
        audio.volume = 0
      }
    }

    return () => {
      /* Keep singleton alive across re-renders; cleanup on unmount only below */
    }
  }, [soundOn, anthemOn, muted])

  useEffect(() => {
    return () => {
      cancelFade()
      if (sharedAudio) {
        sharedAudio.pause()
        sharedAudio.currentTime = 0
        sharedAudio.volume = 0
      }
    }
  }, [])
}
