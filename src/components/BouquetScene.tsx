import { useEffect, useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===================== DETERMINISTIC BOUQUET DATA =====================

// Hand-designed, deterministic bouquet with dome shape.
// Larger flowers near center/top, smaller at edges. No Math.random().
// px/py are percentage offsets from the center of the export container.

const bouquetFlowers = [
  // Center-top large sunflowers (foreground)
  { id: 0, type: 'sunflower', px: 0, py: 5, size: 1.4, rotation: 5 },
  { id: 1, type: 'sunflower', px: 0, py: 8, size: 1.3, rotation: -3 },
  { id: 2, type: 'sunflower', px: -2, py: 12, size: 1.2, rotation: 8 },

  // Center ring sunflowers + daisies
  { id: 3, type: 'sunflower', px: -5, py: 20, size: 1.1, rotation: 2 },
  { id: 4, type: 'daisy', px: -5, py: 22, size: 1.0, rotation: -5 },
  { id: 5, type: 'sunflower', px: 5, py: 20, size: 1.1, rotation: -2 },
  { id: 6, type: 'daisy', px: 5, py: 22, size: 1.0, rotation: 5 },

  // Middle ring — mixed types
  { id: 7, type: 'wildflower', px: -8, py: 35, size: 0.9, rotation: 10 },
  { id: 8, type: 'daisy', px: -3, py: 38, size: 0.85, rotation: -8 },
  { id: 9, type: 'sunflower', px: 0, py: 35, size: 0.95, rotation: 3 },
  { id: 10, type: 'wildflower', px: 3, py: 38, size: 0.88, rotation: 7 },
  { id: 11, type: 'daisy', px: 8, py: 35, size: 0.85, rotation: -3 },

  // Lower ring — more wildflowers + daisies
  { id: 12, type: 'wildflower', px: -10, py: 52, size: 0.75, rotation: 15 },
  { id: 13, type: 'daisy', px: -6, py: 55, size: 0.7, rotation: -12 },
  { id: 14, type: 'wildflower', px: 0, py: 52, size: 0.78, rotation: 5 },
  { id: 15, type: 'daisy', px: 6, py: 55, size: 0.7, rotation: 12 },
  { id: 16, type: 'wildflower', px: 10, py: 52, size: 0.72, rotation: -15 },

  // Edge flowers — smallest, background
  { id: 17, type: 'wildflower', px: -12, py: 70, size: 0.55, rotation: 20 },
  { id: 18, type: 'daisy', px: -9, py: 72, size: 0.5, rotation: -18 },
  { id: 19, type: 'wildflower', px: 9, py: 72, size: 0.52, rotation: 18 },
  { id: 20, type: 'daisy', px: 12, py: 70, size: 0.55, rotation: -20 },

  // Scattered edge accents
  { id: 21, type: 'sunflower', px: -7, py: 65, size: 0.65, rotation: 10 },
  { id: 22, type: 'wildflower', px: 7, py: 65, size: 0.68, rotation: -10 },
  { id: 23, type: 'daisy', px: -4, py: 68, size: 0.6, rotation: -5 },
  { id: 24, type: 'sunflower', px: 4, py: 68, size: 0.62, rotation: 5 },
  { id: 25, type: 'wildflower', px: -11, py: 80, size: 0.45, rotation: 25 },
  { id: 26, type: 'daisy', px: 11, py: 80, size: 0.48, rotation: -25 },
  { id: 27, type: 'sunflower', px: -3, py: 85, size: 0.4, rotation: 15 },
  { id: 28, type: 'wildflower', px: 3, py: 85, size: 0.42, rotation: -15 },
  { id: 29, type: 'daisy', px: 0, py: 92, size: 0.35, rotation: 0 },
  { id: 30, type: 'sunflower', px: 0, py: 95, size: 0.3, rotation: 0 },
] as const

// ===================== BOUQUET SCENE COMPONENT =====================

export function BouquetScene({
  isVisible,
  reducedMotion,
}: {
  isVisible: boolean
  reducedMotion: boolean
}) {
  const [mounted, setMounted] = useState(false)

  // Mark mounted immediately (SVGs are local, no async loading needed)
  useEffect(() => {
    setMounted(true)
  }, [isVisible])

  if (!mounted) return null

  // ===================== EXPORT CONTAINER =====================
  // Fixed aspect ratio so html-to-image export has proper dimensions.
  // 4:5 ratio at max 640px width gives a nice bouquet proportion.
  const containerStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    maxWidth: '640px',
    aspectRatio: '4 / 5',
    boxShadow:
      '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.05)',
  }

  // Background layer inside the container
  const backgroundStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    background:
      'radial-gradient(ellipse 100% 60% at 50% -20%, rgba(251, 191, 36, 0.06) 0%, transparent 40%),' +
      'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),' +
      'linear-gradient(180deg, #faf3e8 0%, #f0f0e0 100%)',
  }

  // ===================== WRAPPING / RIBBON / LEAVES / STEMS =====================
  // Decorative elements integrated into the export container so the PNG capture
  // includes the full wrapped bouquet composition.

  // Kraft paper wrapper cone at the bottom
  const kraftPaperStyle: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
    zIndex: 1,
    width: '60%',
    maxWidth: '360px',
  }

  // Ribbon bow SVG at the top center wrap point
  const ribbonBowSvg = (
    <motion.svg
      style={{
        position: 'absolute',
        top: -4,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
      animate={{ opacity: [0, 1, 1], transition: { duration: reducedMotion ? 0 : 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <path
        fill="#fbbf24"
        d="M-10 -4 L 10 -4 L 0 -12 Z M-6 -8 L 6 -8 M-4 -12 L 4 -12 M-7 -6 L 7 -6"
      />
    </motion.svg>
  )

  // Green leaves scattered around
  const leaves = [
    { id: 0, px: -10, py: 30, rotate: 15 },
    { id: 1, px: 10, py: 30, rotate: -15 },
    { id: 2, px: -6, py: 50, rotate: 10 },
    { id: 3, px: 6, py: 50, rotate: -10 },
  ]

  // Stems from bottom center outward
  const stems = [
    { id: 0, px: -8, py: 80 },
    { id: 1, px: 8, py: 80 },
  ]

  return (
    <div
      id="bouquet-export"
      style={containerStyle}
    >
      {/* Background layer */}
      <div style={backgroundStyle} />

      {/* Kraft paper wrapper cone at the bottom */}
      <img
        src='/kraft-paper.svg'
        style={kraftPaperStyle}
        alt="Kraft paper wrapper cone"
      />

      {/* Flower arrangement area */}
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Flowers with Framer Motion entrance */}
        <AnimatePresence mode="wait">
          {bouquetFlowers.map((f) => {
            const imgSrc = `/${f.type}.svg`
            // Scale based on size; foreground flowers are larger
            const baseSize = 32 * f.size
            // Translate using both px and py percentages for proper 2D spread
            const translateX = f.px * 0.5
            const translateY = f.py * 0.5

            return (
              <div
                key={f.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${baseSize}px`,
                  height: `${baseSize}px`,
                  transform: `
                    translate(-50%, -50%) 
                    translate(${translateX}%, ${translateY}%)
                    scale(${0.7 + f.size * 0.3})
                    rotate(${f.rotation}deg)
                  `,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                <motion.img
                  animate={{ opacity: [0, 1], scale: [0.95, 1] }}
                  style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
                  src={imgSrc}
                />
              </div>
            )
          })}

          {/* Leaves - decorative elements integrated into the bouquet */}
          {!reducedMotion && (
            <AnimatePresence mode="wait">
              {leaves.map((l) => (
                <motion.img
                  key={l.id}
                  src='/leaf.svg'
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${l.px}%, ${l.py}%) rotate(${l.rotate}deg)`,
                    width: '24px',
                    height: 'auto',
                    opacity: 0.6,
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0, 1], x: [0, -10] }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />
              ))}
            </AnimatePresence>
          )}

          {/* Stems from bottom */}
          {!reducedMotion && (
            <AnimatePresence mode="wait">
              {stems.map((s) => (
                <motion.img
                  key={s.id}
                  src='/stem.svg'
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    transform: `translate(-50%, 0) translate(${s.px}%, ${s.py}%)`,
                    width: '4px',
                    height: 'auto',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0, 1], x: [0, 10] }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />
              ))}
            </AnimatePresence>
          )}

          {/* Ribbon bow */}
          {!reducedMotion && ribbonBowSvg}
        </AnimatePresence>
      </div>
    </div>
  )
}