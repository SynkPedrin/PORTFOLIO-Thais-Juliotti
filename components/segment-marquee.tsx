'use client'

import { motion } from 'framer-motion'
import { useScrollVelocityBlur } from '@/lib/motion/use-scroll-velocity'
import { CinematicReveal } from '@/components/motion/cinematic-reveal'

const SEGMENTS = [
  'Branding',
  'Gastronomia',
  'Moda',
  'Beleza',
  'Eventos',
  'Lançamentos',
  'Lifestyle',
  'Institucional',
  'Produto',
  'Conteúdo Social',
]

const ITEMS = [...SEGMENTS, ...SEGMENTS]

export function SegmentMarquee() {
  const { blurFilter } = useScrollVelocityBlur(5)

  return (
    <CinematicReveal variant="clip" amount={0.8}>
      <section
        className="mt-16 border-y border-border bg-secondary py-4 lg:mt-24"
        aria-label="Segmentos de atuação"
      >
        <motion.div
          className="flex overflow-hidden"
          style={{ filter: blurFilter }}
        >
          <div className="flex shrink-0 animate-marquee items-center" aria-hidden="true">
            {ITEMS.map((seg, i) => (
              <span key={i} className="flex items-center">
                <span className="px-5 font-serif text-base italic text-secondary-foreground/75 sm:px-6 sm:text-lg">
                  {seg}
                </span>
                <span className="text-accent/60">✦</span>
              </span>
            ))}
          </div>
          {/* Screen-reader accessible copy */}
          <div className="sr-only">{SEGMENTS.join(' · ')}</div>
        </motion.div>
      </section>
    </CinematicReveal>
  )
}
