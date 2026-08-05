import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import ScrollToTop from './components/layout/ScrollToTop'
import CursorFx from './components/effects/CursorFx'
import JourneyPage from './pages/JourneyPage'
import { useLenis } from './hooks/useLenis'
import { useAmbientAudio } from './hooks/useAmbientAudio'
import { useApp } from './context/AppContext'

export default function App() {
  const { loaderDone } = useApp()
  useLenis(true)
  useAmbientAudio()

  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorFx />
      {loaderDone && (
        <>
          <Navbar />
          <ScrollToTop />
        </>
      )}
      <AnimatePresence mode="wait">
        {loaderDone && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Routes>
              <Route path="/" element={<JourneyPage />} />
              <Route path="*" element={<JourneyPage />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
