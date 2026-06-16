'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_CINEMATIC } from '@/lib/motion/easings'

type Direction = 'up' | 'down' | 'left' | 'right'

const CLIP_FROM: Record<Direction, string> = {
  up: 'inset(100% 0 0 0)',
  down: 'inset(0 0 100% 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

/** Corte de cena entre seções: wipe direcional via clip-path, não um fade simples. */
export function SectionTransition({
  children,
  direction = 'up',
  className,
}: {
  children: ReactNode
  direction?: Direction
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: CLIP_FROM[direction] }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  )
}
