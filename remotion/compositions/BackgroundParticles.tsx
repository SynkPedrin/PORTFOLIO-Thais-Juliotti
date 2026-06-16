import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS } from '../tokens'
import { mulberry32 } from './seed'

export const LOOP_DURATION_IN_FRAMES = 240

type Particle = {
  x: number
  baseY: number
  size: number
  speed: number
  depth: number
}

const rand = mulberry32(42)
const PARTICLES: Particle[] = Array.from({ length: 42 }, () => {
  const depth = rand()
  return {
    x: rand() * 100,
    baseY: rand() * 100,
    size: 2 + depth * 7,
    speed: 0.15 + depth * 0.5,
    depth,
  }
})

export function BackgroundParticles() {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const t = frame % durationInFrames

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(217,198,160,0.08), transparent 60%)`,
        }}
      />
      {PARTICLES.map((p, i) => {
        const progress = (t / durationInFrames) * p.speed
        const y = (((p.baseY - progress * 100) % 110) + 110) % 110 - 5
        const opacity = 0.15 + p.depth * 0.55
        const blur = (1 - p.depth) * 3
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: COLORS.accent,
              opacity,
              filter: `blur(${blur}px)`,
              boxShadow: `0 0 ${p.size * 2}px rgba(217,198,160,${opacity * 0.5})`,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
