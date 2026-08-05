import { useEffect } from 'react'
import Lenis from 'lenis'
import { useApp } from '../context/AppContext'

/** Smooth scroll via Lenis + scroll progress for the journey indicator. */
export function useLenis(enabled = true) {
  const { setProgress, loaderDone } = useApp()

  useEffect(() => {
    if (!enabled || !loaderDone) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onScroll = ({ progress: p }) => setProgress(p)
    lenis.on('scroll', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      if (window.__lenis === lenis) window.__lenis = null
    }
  }, [enabled, loaderDone, setProgress])
}
