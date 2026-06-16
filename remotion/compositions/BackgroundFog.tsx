import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS } from '../tokens'
import { mulberry32 } from './seed'

export const LOOP_DURATION_IN_FRAMES = 300

type Blob = {
  cx: number
  cy: number
  rx: number
  ry: number
  size: number
  phase: number
  opacity: number
}

const rand = mulberry32(7)
const BLOBS: Blob[] = Array.from({ length: 6 }, () => ({
  cx: 15 + rand() * 70,
  cy: 15 + rand() * 70,
  rx: 8 + rand() * 14,
  ry: 6 + rand() * 10,
  size: 28 + rand() * 26,
  phase: rand() * Math.PI * 2,
  opacity: 0.06 + rand() * 0.1,
}))

export function BackgroundFog() {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const t = (frame / durationInFrames) * Math.PI * 2

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: 'hidden' }}>
      {BLOBS.map((b, i) => {
        const x = b.cx + Math.cos(t + b.phase) * b.rx
        const y = b.cy + Math.sin(t + b.phase) * b.ry
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: `${b.size}vw`,
              height: `${b.size}vw`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.mutedGray} 0%, transparent 70%)`,
              opacity: b.opacity,
              filter: 'blur(60px)',
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
