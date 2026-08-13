import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineDownload, HiOutlineShare, HiOutlineX } from 'react-icons/hi'
import { useApp } from '../../context/AppContext'
import { drawJourneyCard, canvasToBlob } from '../../utils/journeyCard'
import { readJSON } from '../../utils/scroll'
import { DREAMS_STORAGE_KEY } from '../../data/dreams'

export default function ShareJourneyButton() {
  const { achievements } = useApp()
  const [previewUrl, setPreviewUrl] = useState(null)
  const [blob, setBlob] = useState(null)
  const [generating, setGenerating] = useState(false)

  async function generate() {
    setGenerating(true)
    const quizResult = readJSON('eoi-quiz-result', null)
    const ownDreams = readJSON(DREAMS_STORAGE_KEY, [])
    const latestDream = ownDreams.length ? ownDreams[ownDreams.length - 1].text : null

    const canvas = drawJourneyCard({
      badges: achievements.badges,
      quizResult,
      dream: latestDream,
    })
    const pngBlob = await canvasToBlob(canvas)
    setBlob(pngBlob)
    setPreviewUrl(URL.createObjectURL(pngBlob))
    setGenerating(false)
  }

  function close() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setBlob(null)
  }

  function download() {
    const a = document.createElement('a')
    a.href = previewUrl
    a.download = 'my-pakistan-journey.png'
    a.click()
  }

  async function share() {
    if (navigator.share && navigator.canShare) {
      const file = new File([blob], 'my-pakistan-journey.png', { type: 'image/png' })
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Pakistan Journey',
            text: 'I explored the story of Pakistan here is my journey.',
          })
          return
        } catch {
         console.warn('Sharing failed, falling back to download')
        }
      }
    }
    download()
  }

  return (
    <>
      <button
        type="button"
        data-cursor="hover"
        onClick={generate}
        disabled={generating}
        className="inline-flex items-center gap-2 rounded-full border border-pk-mint/30 bg-pk-mint/10 px-5 py-2.5 text-sm text-pk-mint transition-colors hover:bg-pk-mint/20 disabled:opacity-60"
      >
        <HiOutlineShare />
        {generating ? 'Creating your card…' : 'Share My Journey'}
      </button>

      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl p-4"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-pk-cream"
              >
                <HiOutlineX />
              </button>
              <img
                src={previewUrl}
                alt="My Pakistan Journey card preview"
                className="w-full rounded-xl border border-white/10"
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={share}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-pk-mint py-2.5 text-sm font-medium text-pk-night"
                >
                  <HiOutlineShare /> Share
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-2.5 text-sm text-pk-cream"
                >
                  <HiOutlineDownload /> Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
