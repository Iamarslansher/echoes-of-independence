const WIDTH = 900
const HEIGHT = 1125

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let curY = y
  const lines = []
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
  lines.forEach((l, i) => ctx.fillText(l, x, curY + i * lineHeight))
  return curY + lines.length * lineHeight
}

/**
 * Draws the journey card onto a canvas and returns it.
 * @param {{badges: Array<{icon:string,title:string,unlocked:boolean}>, quizResult: {score:number,total:number,percent:number}|null, dream: string|null, visitorLabel: string}} data
 */
export function drawJourneyCard(data) {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')

  // Background
  const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  bg.addColorStop(0, '#06120c')
  bg.addColorStop(0.55, '#0a2318')
  bg.addColorStop(1, '#05100b')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Soft glow
  const glow = ctx.createRadialGradient(WIDTH / 2, 180, 20, WIDTH / 2, 180, 420)
  glow.addColorStop(0, 'rgba(29,185,84,0.25)')
  glow.addColorStop(1, 'rgba(29,185,84,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Border frame
  ctx.strokeStyle = 'rgba(201,162,39,0.4)'
  ctx.lineWidth = 2
  roundRect(ctx, 24, 24, WIDTH - 48, HEIGHT - 48, 28)
  ctx.stroke()

  // Flag mini icon
  const flagX = WIDTH / 2 - 70
  const flagY = 70
  ctx.fillStyle = '#f4f6f1'
  ctx.fillRect(flagX, flagY, 35, 88)
  ctx.fillStyle = '#0f8a4b'
  ctx.fillRect(flagX + 35, flagY, 105, 88)
  ctx.fillStyle = '#f4f6f1'
  ctx.beginPath()
  ctx.arc(flagX + 95, flagY + 44, 22, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#0f8a4b'
  ctx.beginPath()
  ctx.arc(flagX + 102, flagY + 40, 18, 0, Math.PI * 2)
  ctx.fill()

  // Eyebrow + title
  ctx.textAlign = 'center'
  ctx.fillStyle = '#6ee7a8'
  ctx.font = '600 16px "Courier New", monospace'
  ctx.fillText('E C H O E S   O F   I N D E P E N D E N C E', WIDTH / 2, 210)

  ctx.fillStyle = '#f4f6f1'
  ctx.font = '600 52px Georgia, "Times New Roman", serif'
  ctx.fillText('My Pakistan Journey', WIDTH / 2, 275)

  let cursorY = 350

  // Badges row
  const unlockedBadges = data.badges.filter((b) => b.unlocked)
  ctx.font = '15px "Courier New", monospace'
  ctx.fillStyle = '#9aa79f'
  ctx.fillText(
    `${unlockedBadges.length} of ${data.badges.length} badges earned`,
    WIDTH / 2,
    cursorY,
  )
  cursorY += 50

  const badgeSize = 88
  const gap = 24
  const totalW = data.badges.length * badgeSize + (data.badges.length - 1) * gap
  let bx = WIDTH / 2 - totalW / 2
  for (const badge of data.badges) {
    ctx.save()
    roundRect(ctx, bx, cursorY, badgeSize, badgeSize, 18)
    ctx.fillStyle = badge.unlocked ? 'rgba(201,162,39,0.12)' : 'rgba(255,255,255,0.03)'
    ctx.fill()
    ctx.strokeStyle = badge.unlocked ? 'rgba(201,162,39,0.6)' : 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.globalAlpha = badge.unlocked ? 1 : 0.35
    ctx.font = '40px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(badge.icon, bx + badgeSize / 2, cursorY + 58)
    ctx.restore()
    bx += badgeSize + gap
  }
  cursorY += badgeSize + 70

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.beginPath()
  ctx.moveTo(90, cursorY)
  ctx.lineTo(WIDTH - 90, cursorY)
  ctx.stroke()
  cursorY += 55

  // Quiz result
  if (data.quizResult) {
    ctx.fillStyle = '#c9a227'
    ctx.font = '600 14px "Courier New", monospace'
    ctx.fillText('KNOWLEDGE QUIZ', WIDTH / 2, cursorY)
    cursorY += 42
    ctx.fillStyle = '#f4f6f1'
    ctx.font = '600 44px Georgia, serif'
    ctx.fillText(`${data.quizResult.percent}%`, WIDTH / 2, cursorY)
    cursorY += 34
    ctx.fillStyle = '#9aa79f'
    ctx.font = '15px "Courier New", monospace'
    ctx.fillText(
      `${data.quizResult.score} of ${data.quizResult.total} correct`,
      WIDTH / 2,
      cursorY,
    )
    cursorY += 60
  }

  // Dream quote
  if (data.dream) {
    ctx.fillStyle = '#6ee7a8'
    ctx.font = '600 14px "Courier New", monospace'
    ctx.fillText('MY DREAM FOR PAKISTAN', WIDTH / 2, cursorY)
    cursorY += 40
    ctx.fillStyle = '#f4f6f1'
    ctx.font = 'italic 26px Georgia, serif'
    ctx.textAlign = 'center'
    cursorY = wrapText(ctx, `"${data.dream}"`, WIDTH / 2, cursorY, WIDTH - 180, 36)
    cursorY += 20
  }

  // Footer
  ctx.fillStyle = 'rgba(154,167,159,0.6)'
  ctx.font = '13px "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('echoesofindependence.app', WIDTH / 2, HEIGHT - 60)

  return canvas
}

export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95))
}
