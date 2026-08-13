import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineDownload, HiOutlineShare, HiOutlineSparkles } from 'react-icons/hi'
import { useJourneyCardData } from '../../hooks/useJourneyCardData'

const W = 1080
const H = 1350

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let lines = []
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight))
  return lines.length
}

function drawFlag(ctx, x, y, w, h) {
  ctx.save()
  ctx.translate(x, y)
  const stripeW = w * 0.25
  ctx.fillStyle = '#f4f0e6'
  ctx.fillRect(0, 0, stripeW, h)
  ctx.fillStyle = '#0f8a4b'
  ctx.fillRect(stripeW, 0, w - stripeW, h)

  const cx = stripeW + (w - stripeW) * 0.5
  const cy = h * 0.5
  const r = h * 0.28
  ctx.fillStyle = '#f4f0e6'
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#0f8a4b'
  ctx.beginPath()
  ctx.arc(cx + r * 0.35, cy - r * 0.12, r * 0.82, 0, Math.PI * 2)
  ctx.fill()

  // star
  const starCx = cx + r * 1.15
  const starCy = cy - r * 0.65
  const spikes = 5
  const outerR = r * 0.32
  const innerR = outerR * 0.5
  ctx.fillStyle = '#f4f0e6'
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const rad = i % 2 === 0 ? outerR : innerR
    const angle = (Math.PI / spikes) * i - Math.PI / 2
    const px = starCx + Math.cos(angle) * rad
    const py = starCy + Math.sin(angle) * rad
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

async function drawCard(canvas, { badges, quiz, dream }) {
  const ctx = canvas.getContext('2d')
  canvas.width = W
  canvas.height = H

  // Background
  const grad = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, H * 0.3, H)
  grad.addColorStop(0, '#0c2417')
  grad.addColorStop(1, '#020805')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // subtle vignette border
  ctx.strokeStyle = 'rgba(201,162,39,0.35)'
  ctx.lineWidth = 3
  ctx.strokeRect(24, 24, W - 48, H - 48)

  let y = 120

  // Flag
  drawFlag(ctx, W / 2 - 130, y, 260, 160)
  y += 220

  // Eyebrow
  ctx.fillStyle = '#1db954'
  ctx.font = '600 26px Outfit, sans-serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '4px'
  ctx.fillText('ECHOES OF INDEPENDENCE', W / 2, y)
  y += 70

  // Title
  ctx.fillStyle = '#f4f0e6'
  ctx.font = '600 68px "Cormorant Garamond", Georgia, serif'
  ctx.letterSpacing = '0px'
  ctx.fillText('My Pakistan Journey', W / 2, y)
  y += 90

  // Badges
  ctx.font = '500 22px Outfit, sans-serif'
  ctx.fillStyle = '#9fb3a8'
  if (badges.length) {
    ctx.fillText(`${badges.length} badge${badges.length > 1 ? 's' : ''} earned`, W / 2, y)
    y += 60
    const iconSize = 88
    const gap = 28
    const totalW = badges.length * iconSize + (badges.length - 1) * gap
    let bx = W / 2 - totalW / 2
    for (const b of badges) {
      ctx.fillStyle = 'rgba(201,162,39,0.12)'
      ctx.beginPath()
      ctx.roundRect(bx, y, iconSize, iconSize, 20)
      ctx.fill()
      ctx.strokeStyle = 'rgba(201,162,39,0.5)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.font = '44px sans-serif'
      ctx.fillStyle = '#f4f0e6'
      ctx.textBaseline = 'middle'
      ctx.fillText(b.icon, bx + iconSize / 2, y + iconSize / 2 + 4)
      ctx.textBaseline = 'alphabetic'
      bx += iconSize + gap
    }
    y += iconSize + 70
  } else {
    ctx.fillText('Just beginning the journey', W / 2, y)
    y += 80
  }

  // Quiz score
  if (quiz) {
    ctx.fillStyle = 'rgba(255,255,255,0.03)'
    ctx.beginPath()
    ctx.roundRect(W / 2 - 260, y, 520, 110, 18)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#c9a227'
    ctx.font = '600 52px "Cormorant Garamond", Georgia, serif'
    ctx.fillText(`${quiz.score} / ${quiz.total}`, W / 2, y + 55)
    ctx.fillStyle = '#9fb3a8'
    ctx.font = '500 20px Outfit, sans-serif'
    ctx.fillText('Pakistan Knowledge Quiz', W / 2, y + 88)
    y += 150
  }

  // Dream
  if (dream) {
    y += 30
    ctx.fillStyle = '#1db954'
    ctx.font = '600 22px Outfit, sans-serif'
    ctx.fillText('MY DREAM FOR PAKISTAN', W / 2, y)
    y += 50
    ctx.fillStyle = '#f4f0e6'
    ctx.font = 'italic 500 34px "Cormorant Garamond", Georgia, serif'
    const maxWidth = W - 200
    const linesDrawn = wrapText(ctx, `"${dream}"`, W / 2, y, maxWidth, 44)
    ctx.textAlign = 'center' // wrapText uses fillText with 'center' already set
    y += linesDrawn * 44 + 20
  }

  // Footer
  ctx.fillStyle = 'rgba(159,179,168,0.7)'
  ctx.font = '500 20px Outfit, sans-serif'
  ctx.fillText('echoes-of-independence · The Story of Pakistan', W / 2, H - 70)
}

export default function JourneyCard() {
  const canvasRef = useRef(null)
  const data = useJourneyCardData()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        await document.fonts?.ready
      } catch {
        /* proceed without waiting */
      }
      if (cancelled) return
      await drawCard(canvasRef.current, data)
      setReady(true)
    }
    render()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function download() {
    const canvas = canvasRef.current
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-pakistan-journey.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  async function share() {
    const canvas = canvasRef.current
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'my-pakistan-journey.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Pakistan Journey',
            text: 'I just explored the story of Pakistan — here is my journey.',
          })
        } catch {
          /* user cancelled */
        }
      } else {
        download()
      }
    }, 'image/png')
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5">
      <div className="w-full overflow-hidden rounded-2xl border border-pk-gold/20 bg-black/20">
        <canvas ref={canvasRef} className="w-full" style={{ aspectRatio: `${W}/${H}` }} />
      </div>

      <div className="flex gap-3">
        <motion.button
          type="button"
          data-cursor="hover"
          onClick={download}
          disabled={!ready}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-pk-cream transition-colors hover:border-pk-mint/40 disabled:opacity-40"
        >
          <HiOutlineDownload /> Download
        </motion.button>
        <motion.button
          type="button"
          data-cursor="hover"
          onClick={share}
          disabled={!ready}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-full bg-pk-mint/15 px-5 py-2.5 text-sm text-pk-mint transition-colors hover:bg-pk-mint/25 disabled:opacity-40"
        >
          <HiOutlineShare /> Share
        </motion.button>
      </div>
      <p className="flex items-center gap-1.5 text-center text-xs text-pk-mist/60">
        <HiOutlineSparkles className="text-pk-gold" /> Generated from your badges, quiz score, and
        dream — nothing is sent anywhere.
      </p>
    </div>
  )
}
