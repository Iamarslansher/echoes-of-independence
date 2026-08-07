import { useEffect, useRef } from 'react'

const CODE = '1947'

/** Listens for the digits 1-9-4-7 typed in sequence anywhere on the page */
export function useKonamiCode(onUnlock) {
  const bufferRef = useRef('')

  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore typing while focused in an input/textarea (e.g. Wall of Dreams)
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      bufferRef.current = (bufferRef.current + e.key).slice(-CODE.length)
      if (bufferRef.current === CODE) {
        onUnlock()
        bufferRef.current = ''
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onUnlock])
}
