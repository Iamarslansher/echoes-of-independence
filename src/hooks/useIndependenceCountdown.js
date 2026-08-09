import { useEffect, useState } from 'react'

const INDEPENDENCE_YEAR = 1947

function isIndependenceDay(d) {
  return d.getMonth() === 7 && d.getDate() === 14 // month is 0-indexed
}

function nextIndependenceDate(now) {
  const year = now.getFullYear()
  const thisYear = new Date(year, 7, 14, 0, 0, 0)
  if (now < thisYear || isIndependenceDay(now)) return thisYear
  return new Date(year + 1, 7, 14, 0, 0, 0)
}

function computeState() {
  const now = new Date()
  const today = isIndependenceDay(now)
  const target = nextIndependenceDate(now)
  const diffMs = Math.max(0, target - now)

  const days = Math.floor(diffMs / 86400000)
  const hours = Math.floor((diffMs % 86400000) / 3600000)
  const minutes = Math.floor((diffMs % 3600000) / 60000)
  const seconds = Math.floor((diffMs % 60000) / 1000)

  return {
    isToday: today,
    years: target.getFullYear() - INDEPENDENCE_YEAR,
    days,
    hours,
    minutes,
    seconds,
  }
}

/** Ticks every second. Automatically flips to celebratory mode on 14 August. */
export function useIndependenceCountdown() {
  const [state, setState] = useState(computeState)

  useEffect(() => {
    const id = setInterval(() => setState(computeState()), 1000)
    return () => clearInterval(id)
  }, [])

  return state
}
