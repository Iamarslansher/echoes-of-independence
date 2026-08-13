import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 220
const FLOAT_COUNT = 36


function buildTargets(w, h) {
  const targets = []
  const cx = w * 0.5
  const cy = h * 0.52
  const scale = Math.min(w, h) * 0.38

  const outerR = scale
  const innerR = scale * 0.78
  const innerOffsetX = scale * 0.38

  const crescentTarget = Math.floor(PARTICLE_COUNT * 0.7)
  let tries = 0
  while (targets.length < crescentTarget && tries < crescentTarget * 50) {
    tries += 1
    const a = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random()) * outerR
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    const dx = x - (cx + innerOffsetX)
    const dy = y - cy
    if (dx * dx + dy * dy >= innerR * innerR) {
      targets.push({ x, y, isStar: false })
    }
  }

  const starCx = cx + scale * 0.72
  const starCy = cy - scale * 0.48
  const starOuter = scale * 0.36
  const starInner = starOuter * 0.4
  const starPath = []
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? starOuter : starInner
    const angle = (Math.PI / 5) * i - Math.PI / 2
    starPath.push({
      x: starCx + Math.cos(angle) * radius,
      y: starCy + Math.sin(angle) * radius,
    })
  }

  while (targets.length < PARTICLE_COUNT) {
    const idx = Math.floor(Math.random() * starPath.length)
    const p1 = starPath[idx]
    const p2 = starPath[(idx + 1) % starPath.length]
    const r1 = Math.random()
    const r2 = Math.random() * (1 - r1)
    targets.push({
      x: starCx + r1 * (p1.x - starCx) + r2 * (p2.x - starCx),
      y: starCy + r1 * (p1.y - starCy) + r2 * (p2.y - starCy),
      isStar: true,
    })
  }

  return targets
}

export default function CrescentStarGlow({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []
    let floaters = []
    let raf = 0
    let form = prefersReduced ? 1 : 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targets = buildTargets(w, h)
      particles = targets.map((t) => ({
        startX: w * 0.5 + (Math.random() - 0.5) * w * 0.35,
        startY: h * 0.55 + (Math.random() - 0.5) * h * 0.3,
        targetX: t.x,
        targetY: t.y,
        r: t.isStar ? 1.3 + Math.random() * 1.4 : 0.7 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.1,
        isStar: t.isStar,
      }))

      floaters = Array.from({ length: FLOAT_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.05 - Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        green: Math.random() > 0.45,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      if (!prefersReduced) form += (1 - form) * 0.035
      const eased = 1 - (1 - form) ** 3


      const glow = ctx.createRadialGradient(w * 0.5, h * 0.52, 0, w * 0.5, h * 0.52, Math.min(w, h) * 0.55)
      glow.addColorStop(0, `rgba(29, 185, 84, ${0.18 * eased})`)
      glow.addColorStop(0.45, `rgba(244, 247, 242, ${0.08 * eased})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Gentle fog ribbons
      for (let i = 0; i < 3; i += 1) {
        const ox = Math.sin(time * 0.00015 + i) * (20 + i * 10)
        const fog = ctx.createRadialGradient(
          w * 0.5 + ox,
          h * 0.7 + i * 8,
          10,
          w * 0.5 + ox,
          h * 0.75,
          w * (0.35 + i * 0.08),
        )
        fog.addColorStop(0, `rgba(1, 65, 28, ${0.12 + i * 0.04})`)
        fog.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = fog
        ctx.fillRect(0, 0, w, h)
      }

      for (const s of particles) {
        const x = s.startX + (s.targetX - s.startX) * eased
        const y = s.startY + (s.targetY - s.startY) * eased
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.001 * s.speed + s.phase)
        const alpha = (0.3 + 0.7 * eased) * twinkle

        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.isStar
          ? `rgba(232, 238, 221, ${alpha})`
          : `rgba(110, 231, 168, ${alpha * 0.95})`
        ctx.shadowBlur = s.isStar ? 10 : 6
        ctx.shadowColor = s.isStar
          ? 'rgba(244, 247, 242, 0.85)'
          : 'rgba(29, 185, 84, 0.75)'
        ctx.fill()
      }

      ctx.shadowBlur = 0
      for (const f of floaters) {
        if (!prefersReduced) {
          f.x += f.vx
          f.y += f.vy
          if (f.y < -4) {
            f.y = h + 4
            f.x = Math.random() * w
          }
          if (f.x < -4) f.x = w + 4
          if (f.x > w + 4) f.x = -4
        }
        const a = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(time * 0.001 + f.phase))
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = f.green
          ? `rgba(29, 185, 84, ${a * eased})`
          : `rgba(244, 247, 242, ${a * eased})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-[30%] z-0 h-72 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-96 md:top-[32%] md:h-96 md:w-[34rem] ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(29,185,84,0.12),transparent_65%)] blur-2xl" />
    </div>
  )
}
