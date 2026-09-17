import { useState, useEffect } from 'react'

export const FlashTransition = ({
  isActive,
  reducedMotion,
}: {
  isActive: boolean
  reducedMotion: boolean
}) => {
  const [flashOpacity, setFlashOpacity] = useState('0')

  useEffect(() => {
    if (isActive) {
      setFlashOpacity('1')
    }
  }, [isActive])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'white',
        opacity: flashOpacity,
        transition: reducedMotion ? 'none' : 'opacity 0.8s ease-out',
        zIndex: isActive ? 1000 : 0,
        pointerEvents: isActive ? 'none' : 'auto',
      }}
    />
  )
}