import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS } from '../tokens'

export const LOOP_DURATION_IN_FRAMES = 240

const BEAMS = [
  { phase: 0, width: 28, angle: 12, opacity: 0.22 },
  { phase: 0.45, width: 18, angle: -8, opacity: 0.16 },
  { phase: 0.75, width: 22, angle: 16, opacity: 0.12 },
]

export function BackgroundLightSweep() {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const t = frame / durationInFrames

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.background} 0%, #15110c 60%, ${COLORS.background} 100%)`,
      }}
    >
      {BEAMS.map((beam, i) => {
        const cycle = (t + beam.phase) % 1
        const x = cycle * 160 - 30
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: '-30% 0',
              left: `${x}%`,
              width: `${beam.width}%`,
              transform: `rotate(${beam.angle}deg)`,
              background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
              opacity: beam.opacity,
              mixBlendMode: 'screen',
              filter: 'blur(50px)',
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
