import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config'

export const Letter = ({
  isVisible,
  reducedMotion,
  onContinue,
}: {
  isVisible: boolean
  reducedMotion: boolean
  onContinue: () => void
}) => {
  const letterRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // ===================== ENTRANCE/EXIT ANIMATIONS (Framer Motion) =====================
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setMounted(true)
    }
  }, [isVisible])

  // Exit animation: fade out + scale down, then call onContinue
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!isVisible && mounted && !exiting) {
      setExiting(true)
      const timeout = setTimeout(() => {
        onContinue()
      }, reducedMotion ? 0 : 500)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, mounted, reducedMotion, onContinue])

  if (!mounted) return null

  if (exiting) return null

  // ===================== SALUTATION =====================
  const salutationText = config.salutation.replace('{personName}', config.personName)

  // ===================== LETTER BODY =====================
  const renderLetterBody = (): React.ReactNode => {
    const lines: React.ReactNode[] = []
    for (let i = 0; i < config.letterBody.length; i++) {
      const line = config.letterBody[i]
      // Use array index as key; skip empty-string dedup
      const key = line ? `line-${i}` : i
      lines.push(
        <p key={key} style={{ margin: '0 0 12px 0' }}>
          {line}
        </p>
      )
    }
    return <div>{lines}</div>
  }

  // ===================== RETURN =====================
  return (
    <motion.div
      ref={letterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#faf3e8',
          color: '#1e1b4b',
          padding: '24px',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <div
          style={{
            background: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22260%22 viewBox=%220 0 400 260%22 fill=%22none%22><rect x=%220%22 y=%220%22 width=%22400%22 height=%22260%22 fill=%23f0f0e0%22 opacity=%220.3%22/><path d=%22M10 10 L 30 10 L 10 30 M 30 10 L 30 30 M 10 30 L 30 30 %22 stroke=%23d4a5a5 stroke-width=%221%22 fill=%22none%22/></svg>")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: '32px',
            borderRadius: '12px',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '680px', textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '2.5rem',
                fontWeight: '400',
                lineHeight: '1.3',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                color: '#1e1b4b',
              }}
            >
              {salutationText}
            </h1>
            <div>{renderLetterBody()}</div>
            {/* Closing text - displayed above signature */}
            {config.closing && (
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  margin: '32px 0 24px 0',
                  color: '#6b4b3a',
                  lineHeight: '1.4',
                  textAlign: 'center',
                }}
              >
                {config.closing}
              </p>
            )}
            {config.signature && (
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: '0',
                  color: '#1e1b4b',
                  textAlign: 'center',
                }}
              >
                {config.signature}
              </p>
            )}
          </div>
        </div>

        <button
          ref={buttonRef}
          onClick={() => onContinue()}
          style={{
            all: 'unset',
            cursor: 'pointer',
            marginTop: '40px',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '1rem',
            fontWeight: '500',
            letterSpacing: '0.05em',
            color: '#1e1b4b',
            background: 'rgba(251, 191, 36, 0.2)',
            border: '2px solid #fbbf24',
            borderRadius: '50px',
            padding: '16px 40px',
            transition: 'transform 0.2s ease, background 0.2s ease',
            ...(reducedMotion && { animation: 'none' }),
          }}
          aria-label={config.buttonLetter}
        >
          <span style={{ fontSize: '0.875rem' }} aria-hidden>
            {'♲'}
          </span>
          <span>{config.buttonLetter}</span>
        </button>
      </div>
    </motion.div>
  )
}