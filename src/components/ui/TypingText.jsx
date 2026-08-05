import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TypingText({
  text,
  className = '',
  speed = 48,
  delay = 0,
  as: Tag = 'span',
}) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let i = 0
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, speed)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(start)
  }, [text, speed, delay])

  return (
    <Tag className={className}>
      {shown}
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-pk-mint"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </Tag>
  )
}
