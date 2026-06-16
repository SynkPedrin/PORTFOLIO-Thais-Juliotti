import { loadFont } from '@remotion/google-fonts/Fraunces'
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { COLORS } from '../tokens'

const { fontFamily } = loadFont('italic', { weights: ['300'], subsets: ['latin'] })

export const INTRO_DURATION_IN_FRAMES = 130

function GrainOverlay({ opacity }: { opacity: number }) {
  const frame = useCurrentFrame()
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={3}
          stitchTiles="stitch"
          seed={frame}
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

function LightSweep({ frame, fps }: { frame: number; fps: number }) {
  const sweepStart = 0.3 * fps
  const sweepEnd = 2.6 * fps
  const x = interpolate(frame, [sweepStart, sweepEnd], [-60, 160], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const sweepOpacity = interpolate(
    frame,
    [sweepStart, sweepStart + 10, sweepEnd - 20, sweepEnd],
    [0, 0.5, 0.35, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  return (
    <div
      style={{
        position: 'absolute',
        inset: '-20%',
        transform: `translateX(${x}%) rotate(8deg)`,
        width: '40%',
        background: `linear-gradient(100deg, transparent, ${COLORS.accent} 45%, transparent)`,
        opacity: sweepOpacity,
        mixBlendMode: 'screen',
        filter: 'blur(40px)',
      }}
    />
  )
}

export function Intro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const revealStart = 0.5 * fps
  const revealEnd = 2.1 * fps
  const holdEnd = 3.6 * fps
  const fadeOutEnd = 4.33 * fps

  const progress = interpolate(frame, [revealStart, revealEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })

  const velocity = interpolate(
    frame,
    [revealStart, (revealStart + revealEnd) / 2, revealEnd],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  const scale = interpolate(progress, [0, 1], [1.22, 1])
  const blurIn = interpolate(progress, [0, 1], [22, 0])
  const motionBlurPx = velocity * 5
  const wordmarkOpacity = interpolate(frame, [revealStart, revealStart + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const masterFadeOut = interpolate(frame, [holdEnd, fadeOutEnd], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill style={{ opacity: masterFadeOut }}>
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 96,
              letterSpacing: '0.01em',
              color: COLORS.foreground,
              opacity: wordmarkOpacity,
              transform: `scale(${scale})`,
              filter: `blur(${blurIn + motionBlurPx}px)`,
            }}
          >
            Thaís Julioti
          </div>
        </AbsoluteFill>
        <LightSweep frame={frame} fps={fps} />
        <GrainOverlay opacity={0.05} />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
