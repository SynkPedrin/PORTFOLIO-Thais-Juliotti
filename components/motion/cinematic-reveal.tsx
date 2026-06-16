'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_CINEMATIC } from '@/lib/motion/easings'

export type RevealVariant = 'clip' | 'mask' | 'scale' | 'fade-up'

export const REVEAL_VARIANTS: Record<RevealVariant, Variants> = {
  clip: {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: { clipPath: 'inset(0 0 0% 0)' },
  },
  mask: {
    hidden: { opacity: 0, y: 36, filter: 'blur(14px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
}

type CinematicRevealProps = {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  /** Quando definido, os filhos diretos devem ser <CinematicRevealItem> — habilita stagger. */
  stagger?: number
  amount?: number
}

export function CinematicReveal({
  children,
  variant = 'mask',
  delay = 0,
  duration = 1.1,
  className,
  stagger,
  amount = 0.3,
}: CinematicRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={
        stagger
          ? { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }
          : REVEAL_VARIANTS[variant]
      }
      transition={stagger ? undefined : { duration, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  )
}

export function CinematicRevealItem({
  children,
  variant = 'mask',
  className,
  duration = 0.9,
}: {
  children: ReactNode
  variant?: RevealVariant
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      variants={REVEAL_VARIANTS[variant]}
      transition={{ duration, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  )
}
