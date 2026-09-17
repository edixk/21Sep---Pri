import { config } from '../config'

export function IntroScreenComponent({
  onSelect,
  reducedMotion,
}: {
  onSelect: () => void
  reducedMotion: boolean
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          reducedMotion
            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
            : 'linear-gradient(135deg, #0f0e27, #1e1b4b)',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle animated background blobs */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none',
          top: '-100px',
          left: '-50px',
          animation: reducedMotion ? 'none' : 'float 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          pointerEvents: 'none',
          bottom: '-50px',
          right: '-50px',
          animation: reducedMotion ? 'none' : 'float 25s ease-in-out infinite reverse',
        }}
      />

      <button
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '20px 48px',
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.25rem',
          fontWeight: '500',
          letterSpacing: '0.02em',
          color: '#1e1b4b',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50px',
          boxShadow:
            '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(251, 191, 36, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
          ...(reducedMotion && {
            animation: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }),
        }}
        onMouseEnter={(event: React.MouseEvent<HTMLButtonElement>) => {
          const button = event.currentTarget
          button.style.transform = 'translateY(-2px) scale(1.02)'
          button.style.boxShadow =
            '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.25)'
          button.style.background = '#fff'
        }}
        onMouseLeave={(event: React.MouseEvent<HTMLButtonElement>) => {
          const button = event.currentTarget
          button.style.transform = ''
          button.style.boxShadow =
            '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(251, 191, 36, 0.15)'
          button.style.background = 'rgba(255, 255, 255, 0.9)'
        }}
        onFocus={(event: React.FocusEvent<HTMLButtonElement>) => {
          const button = event.currentTarget
          button.style.outline = '2px solid #fbbf24'
          button.style.outlineOffset = '4px'
        }}
        onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
          const button = event.currentTarget
          button.style.outline = ''
          button.style.outlineOffset = ''
        }}
        onClick={onSelect}
        aria-label={config.salutation}
      >
        <span style={{ fontSize: '1.5rem', verticalAlign: 'middle' }}>
          <i
            style={{ display: 'inline-block', width: '1em', height: '1em' }}
            aria-hidden
          />
          <span>{config.buttonIntro}</span>
        </span>
      </button>

      <p
        style={{
          marginTop: '24px',
          fontSize: '0.875rem',
          opacity: '0.7',
          letterSpacing: '0.05em',
          ...(reducedMotion && { animation: 'none' }),
        }}
      >
        Haz clic aquí{' '}
        <span aria-hidden>
          <i
            style={{ display: 'inline-block', width: '1em', height: '1em', marginLeft: '-0.1em' }}
            aria-hidden
          />
        </span>
      </p>
    </div>
  )
}