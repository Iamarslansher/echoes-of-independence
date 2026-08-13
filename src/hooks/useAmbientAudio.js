import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

const TRACK_PATH = '/audio/anthem.mp3'
const TARGET_VOLUME = 0.55
const FADE_MS = 900
const STEP_MS = 30

/** Singleton so Hero + Independence toggles never spawn duplicate playback. */
let sharedAudio = null
let fadeTimer = 0

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
  if (fadeTimer) {
    clearTimeout(fadeTimer)
    fadeTimer = 0
  }
}

/**
 * Fades audio.volume toward `to` using setTimeout rather than
 * requestAnimationFrame. rAF can be fully suspended by the browser when a
 * tab is backgrounded/minimized, which was leaving the fade-out stuck
 * mid-way forever (audio.pause() gated behind the fade completing)
 * the anthem would keep playing indefinitely if you switched tabs while
 * it faded out. setTimeout keeps firing (throttled, but it fires) even
 * in background tabs, so the fade and the pause() at the end always
 * completes.
 */
function fadeVolume(audio, to, { onDone } = {}) {
  cancelFade()
  const from = audio.volume
  const start = performance.now()

  const step = () => {
    const now = performance.now()
    const t = Math.min(1, (now - start) / FADE_MS)
    const eased = t * (2 - t)
    audio.volume = from + (to - from) * eased
    if (t < 1) {
      fadeTimer = setTimeout(step, STEP_MS)
    } else {
      fadeTimer = 0
      audio.volume = to
      onDone?.()
    }
  }

  step()
}

/**
 * National anthem playback driven by existing sound / anthem toggles.
 * No autoplay starts only after user interaction. Smooth fade in/out,
 * with a hard-stop safety net so it can never keep playing silently
 * forever if a fade gets interrupted.
 */
export function useAmbientAudio() {
  const { soundOn, anthemOn, muted } = useApp()
  const wantPlayRef = useRef(false)

  useEffect(() => {
    const shouldPlay = (soundOn || anthemOn) && !muted
    wantPlayRef.current = shouldPlay
    const audio = getAudio()

    let safetyTimer = 0

    if (shouldPlay) {
      audio.muted = false
      const start = () => {
        if (!wantPlayRef.current) return
        fadeVolume(audio, TARGET_VOLUME)
      }

      if (audio.paused) {
        audio.volume = 0
        const playPromise = audio.play()
        if (playPromise?.then) {
          playPromise.then(start).catch(() => {
            /* Autoplay blocked until a later user gesture toggles already are gestures */
          })
        } else {
          start()
        }
      } else {
        fadeVolume(audio, TARGET_VOLUME)
      }
    } else {
      // Mute immediately as a hard guarantee of silence decoupled from
      // the fade entirely, so even if the fade logic never completes for
      // any reason, nothing is audible.
      audio.muted = true

      if (!audio.paused) {
        fadeVolume(audio, 0, {
          onDone: () => {
            if (!wantPlayRef.current) audio.pause()
          },
        })
      } else {
        audio.volume = 0
      }

      // Safety net: force a real stop shortly after regardless of whether
      // the fade callback fired (covers backgrounded-tab edge cases).
      safetyTimer = setTimeout(() => {
        if (!wantPlayRef.current) {
          audio.pause()
          audio.volume = 0
        }
      }, FADE_MS + 500)
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer)
    }
  }, [soundOn, anthemOn, muted])

  useEffect(() => {
    return () => {
      cancelFade()
      if (sharedAudio) {
        sharedAudio.pause()
        sharedAudio.currentTime = 0
        sharedAudio.volume = 0
        sharedAudio.muted = true
      }
    }
  }, [])
}
