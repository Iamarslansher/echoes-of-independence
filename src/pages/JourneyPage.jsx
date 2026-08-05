import Hero from '../sections/Hero'
import BeforePakistan from '../sections/BeforePakistan'
import Movement from '../sections/Movement'
import Independence from '../sections/Independence'
import Migration from '../sections/Migration'
import Wars from '../sections/Wars'
import Achievements from '../sections/Achievements'
import CurrentPakistan from '../sections/CurrentPakistan'
import Challenges from '../sections/Challenges'
import FuturePakistan from '../sections/FuturePakistan'
import Contribution from '../sections/Contribution'
import WallOfDreams from '../sections/WallOfDreams'
import Ending from '../sections/Ending'
import Footer from '../components/layout/Footer'

/** Single-page cinematic journey through Pakistan's story */
export default function JourneyPage() {
  return (
    <main>
      <Hero />
      <BeforePakistan />
      <Movement />
      <Independence />
      <Migration />
      <Wars />
      <Achievements />
      <CurrentPakistan />
      <Challenges />
      <FuturePakistan />
      <Contribution />
      <WallOfDreams />
      <Ending />
      <Footer />
    </main>
  )
}
