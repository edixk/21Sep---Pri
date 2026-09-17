import { useRef, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { toPng } from 'html-to-image'
import { config } from '../config'

export function DownloadBouquetButton({
  reducedMotion,
}: {
  reducedMotion: boolean
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleDownload = () => {
    const exportContainer = document.getElementById('bouquet-export')
    if (!exportContainer) return

    const filename = config.pngFilename

    // Show temporary state
    const button = buttonRef.current!
    button.disabled = true
    button.style.opacity = '0.7'
    button.style.cursor = 'not-allowed'
    button.textContent = 'Preparando tu ramo…'

    toPng(exportContainer, {
      pixelRatio: 2,
      width: exportContainer.clientWidth,
      height: exportContainer.clientHeight,
      backgroundColor: '#faf3e8', // Paper background color
      style: {
        // Ensure fonts and layout are preserved
        fontFamily: 'inherit',
        transform: 'scale(1)', // Prevent unwanted transforms
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = filename
        link.href = dataUrl
        link.click()
      })
      .catch((error) => {
        console.error('Error exporting bouquet:', error)
      })
      .finally(() => {
        // Restore button state
        const button = buttonRef.current!
        button.disabled = false
        button.style.opacity = ''
        button.style.cursor = ''
        button.textContent = config.buttonBouquet
      })
  }

  // Hover/focus state handlers - apply/remove inline styles directly
  useEffect(() => {
    return () => {
      const button = buttonRef.current!
      button.style.transition = ''
      button.style.transform = ''
      button.style.background = ''
      button.style.outline = ''
      button.style.outlineOffset = ''
    }
  }, [])

  // Apply hover/focus styles on mouse/focus events
  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current!

    const handleMouseEnter = () => {
      button.style.transition = reducedMotion ? 'none' : 'transform 0.2s ease, background 0.2s ease'
      button.style.transform = 'translateY(-2px)'
      button.style.background = reducedMotion ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.35)'
    }

    const handleMouseLeave = () => {
      button.style.transition = reducedMotion ? 'none' : 'transform 0.2s ease, background 0.2s ease'
      button.style.transform = ''
      button.style.background = reducedMotion ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.2)'
    }

    const handleFocus = () => {
      button.style.outline = reducedMotion ? 'none' : '2px solid #fbbf24'
      button.style.outlineOffset = reducedMotion ? '0' : '4px'
    }

    const handleBlur = () => {
      button.style.outline = reducedMotion ? '' : '2px solid #fbbf24'
      button.style.outlineOffset = reducedMotion ? '' : '4px'
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('focus', handleFocus)
    button.addEventListener('blur', handleBlur)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('focus', handleFocus)
      button.removeEventListener('blur', handleBlur)
    }
  }, [reducedMotion])

  return (
    <button
      ref={buttonRef}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-full border border-floral bg-floral/20 text-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-floral/35 focus:outline-none focus:ring-2 focus:ring-floral focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label="Descargar el ramo como imagen"
    >
      <Heart className='h-4 w-4' style={{ fontSize: '0.875rem' }} aria-hidden />
      <span>{config.buttonBouquet}</span>
    </button>
  )
}