import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import ScrollToTop from './components/layout/ScrollToTop'
import JourneyRail from './components/layout/JourneyRail'
import TimeMachine from './components/layout/TimeMachine'
import CursorFx from './components/effects/CursorFx'
import DynamicBackground from './components/effects/DynamicBackground'
import SecretToast from './components/ui/SecretToast'
import JourneyPage from './pages/JourneyPage'
import { useLenis } from './hooks/useLenis'
import { useAmbientAudio } from './hooks/useAmbientAudio'
import { useKonamiCode } from './hooks/useKonamiCode'
import { useApp } from './context/AppContext'
import { easterEggFacts } from './data/easterEggs'

export default function App() {
  const { loaderDone, revealSecret } = useApp()
  useLenis(true)
  useAmbientAudio()
  useKonamiCode(() => revealSecret(easterEggFacts.konami, 'secret-star'))

  return (
    <>
      <DynamicBackground />
      <Loader />
      <ScrollProgress />
      <CursorFx />
      <SecretToast />
      {loaderDone && (
        <>
          <Navbar />
          <ScrollToTop />
          <JourneyRail />
          <TimeMachine />
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
