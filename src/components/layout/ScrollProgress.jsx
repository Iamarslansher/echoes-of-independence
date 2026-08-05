import { useApp } from '../../context/AppContext'

export default function ProgressBar() {
  const { progress } = useApp()

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-pk-forest via-pk-mint to-pk-gold transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
