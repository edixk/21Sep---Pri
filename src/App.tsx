import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroScreenComponent as IntroScreen } from './components/IntroScreen'
import { FlashTransition } from './components/FlashTransition'
import { Letter } from './components/Letter'
import { BouquetScene } from './components/BouquetScene'
import { DownloadBouquetButton } from './components/DownloadBouquetButton'

// App state machine
enum AppState {
  Intro = 'intro',
  Transition = 'transition',
  Letter = 'letter',
  Bouquet = 'bouquet',
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handleChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}

// eslint-disable-next-line react-hooks/exhaustive-deps
export function App() {
  const reducedMotion = useReducedMotion()
  const [state, setState] = useState<AppState>(AppState.Intro)

  // Intro button click - lock further clicks while transitioning
  const handleIntroClick = () => {
    // Guard against double-clicks: only transition from Intro state
    if (state === AppState.Intro) {
      setState(AppState.Transition)
    }
  }

  // Transition complete - move to letter state (flash lasts ~500ms-1s)
  useEffect(() => {
    if (state === AppState.Transition) {
      const timeout = setTimeout(() => {
        setState(AppState.Letter)
      }, reducedMotion ? 0 : 800)
      return () => clearTimeout(timeout)
    }
  }, [state, reducedMotion])

  // Letter exit - move to bouquet
  const handleLetterContinue = () => {
    setState(AppState.Bouquet)
  }

  // Determine which component to render based on state
  let child: React.ReactNode
  if (state === AppState.Intro) {
    child = (
      <IntroScreen
        onSelect={handleIntroClick}
        reducedMotion={reducedMotion}
      />
    )
  } else if (state === AppState.Transition) {
    child = <FlashTransition isActive={true} reducedMotion={reducedMotion} />
  } else if (state === AppState.Letter) {
    child = (
      <Letter
        isVisible={true}
        reducedMotion={reducedMotion}
        onContinue={handleLetterContinue}
      />
    )
  } else if (state === AppState.Bouquet) {
    child = (
      <div>
        <BouquetScene
          isVisible={true}
          reducedMotion={reducedMotion}
        />
        <DownloadBouquetButton reducedMotion={reducedMotion} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {child}
      </AnimatePresence>
    </div>
  )
}