import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS } from '../tokens'

export const LOOP_DURATION_IN_FRAMES = 240

const LAYERS = [
  { amplitude: 18, frequency: 1, baseline: 70, opacity: 0.1, speed: 1 },
  { amplitude: 26, frequency: 0.6, baseline: 80, opacity: 0.08, speed: -0.7 },
  { amplitude: 14, frequency: 1.4, baseline: 90, opacity: 0.06, speed: 1.3 },
]

function wavePath(amplitude: number, frequency: number, baseline: number, phase: number) {
  const points: string[] = []
  for (let x = 0; x <= 100; x += 2) {
    const y = baseline + Math.sin((x / 100) * Math.PI * 2 * frequency + phase) * amplitude
    points.push(`${x},${y}`)
  }
  return `M0,100 L${points.join(' L')} L100,100 Z`
}

export function BackgroundWaves() {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const t = (frame / durationInFrames) * Math.PI * 2

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {LAYERS.map((layer, i) => (
          <path
            key={i}
            d={wavePath(layer.amplitude, layer.frequency, layer.baseline, t * layer.speed)}
            fill={COLORS.accent}
            opacity={layer.opacity}
          />
        ))}
      </svg>
    </AbsoluteFill>
  )
}
