import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineArrowsExpand } from 'react-icons/hi'

export default function BeforeAfterSlider({ title, then, now, thenImage, nowImage }) {
  const trackRef = useRef(null)
  const [pct, setPct] = useState(50)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.min(100, Math.max(0, raw)))
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      updateFromClientX(clientX)
    }
    function onUp() {
      draggingRef.current = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [updateFromClientX])

  function startDrag(e) {
    draggingRef.current = true
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    updateFromClientX(clientX)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') setPct((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPct((p) => Math.min(100, p + 5))
  }

  return (
    <div data-reveal className="overflow-hidden rounded-2xl border border-white/10">
      <div
        ref={trackRef}
        className="relative h-64 w-full cursor-ew-resize select-none sm:h-72"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* NOW layer — full width base */}
        <div className="absolute inset-0">
          {nowImage ? (
            <img
              src={nowImage}
              alt={`${title} today`}
              loading="lazy"
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          ) : null}
          <div
            className={`absolute inset-0 flex flex-col justify-end p-6 ${
              nowImage
                ? 'bg-gradient-to-t from-black/80 via-black/10 to-transparent'
                : 'bg-gradient-to-br from-pk-forest/70 via-pk-deep to-pk-night'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-pk-mint">Now</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-pk-cream sm:text-base">{now}</p>
          </div>
        </div>

        {/* THEN layer — clipped to reveal based on drag position */}
        <div
          className="absolute inset-0 flex flex-col justify-end overflow-hidden p-6"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          {thenImage ? (
            <>
              <img
                src={thenImage}
                alt={`${title}, historically`}
                loading="lazy"
                draggable={false}
                style={{ filter: 'sepia(0.35)' }}
                className="absolute inset-0 h-full w-full select-none object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #3a2f1e 0%, #241a10 55%, #150e08 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            </>
          )}
          <p className="relative text-[10px] uppercase tracking-[0.3em] text-pk-gold">Then</p>
          <p className="relative mt-2 max-w-md text-sm leading-relaxed text-pk-cream/90 sm:text-base">
            {then}
          </p>
        </div>

        {/* Handle */}
        <motion.div
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-0.5 bg-pk-cream/70" />
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${title} then-versus-now slider`}
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-pk-night/90 text-pk-cream shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-pk-mint"
          >
            <HiOutlineArrowsExpand className="rotate-90 text-sm" />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.03] px-5 py-3">
        <h3 className="display text-lg text-pk-cream">{title}</h3>
      </div>
    </div>
  )
}
