'use client'

import dynamic from 'next/dynamic'

export const AmbientParticlesClient = dynamic(
  () =>
    import('@/components/motion/ambient-particles-scene').then((m) => m.AmbientParticlesScene),
  { ssr: false },
)
