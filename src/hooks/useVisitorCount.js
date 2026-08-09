import { useEffect, useState } from 'react'

const LOCAL_KEY = 'eoi-local-visits'
const SESSION_FLAG = 'eoi-counted-this-session'
const GLOBAL_ENDPOINT = 'https://countapi.mileshilliard.com/api/v1/hit/echoes-of-independence-pk'
const FETCH_TIMEOUT_MS = 3500

function bumpLocalCount() {
  const current = Number(localStorage.getItem(LOCAL_KEY) || '0')
  const next = current + 1
  localStorage.setItem(LOCAL_KEY, String(next))
  return next
}

async function fetchGlobalCount() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(GLOBAL_ENDPOINT, { signal: controller.signal })
    if (!res.ok) return null
    const data = await res.json()
    const value = data?.value ?? data?.count ?? data?.data
    return typeof value === 'number' ? value : null
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Returns { count, isGlobal, ready }.
 * - Increments exactly once per browser session (tab), not on every re-render.
 * - Always has a working number immediately (local count), then silently
 *   upgrades to a real global count if the counting service responds in time.
 */
export function useVisitorCount() {
  const [count, setCount] = useState(null)
  const [isGlobal, setIsGlobal] = useState(false)

  useEffect(() => {
    const alreadyCountedThisSession = sessionStorage.getItem(SESSION_FLAG)

    const localCount = alreadyCountedThisSession
      ? Number(localStorage.getItem(LOCAL_KEY) || '1')
      : bumpLocalCount()
    setCount(localCount)

    if (alreadyCountedThisSession) return
    sessionStorage.setItem(SESSION_FLAG, '1')

    fetchGlobalCount().then((globalValue) => {
      if (globalValue !== null) {
        setCount(globalValue)
        setIsGlobal(true)
      }
    })
  }, [])

  return { count, isGlobal, ready: count !== null }
}
