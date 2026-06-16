'use client'

import { Children, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_CINEMATIC } from '@/lib/motion/easings'

/**
 * Elva Labs-style text reveal: each direct child slides up from behind an overflow-hidden mask.
 * Uses <span> tags throughout so it nests safely inside h1/h2/p elements.
 *
 * Usage:
 *   <h2 className="font-serif ...">
 *     <TextLineReveal>
 *       <span>First line of text</span>
 *       <span>Second line of text</span>
 *     </TextLineReveal>
 *   </h2>
 */
type TextLineRevealProps = {
  children: ReactNode
  stagger?: number
  delay?: number
  duration?: number
  className?: string
  amount?: number
}

export function TextLineReveal({
  children,
  stagger = 0.11,
  delay = 0,
  duration = 1.0,
  className,
  amount = 0.5,
}: TextLineRevealProps) {
  return (
    <motion.span
      className={className ? `block ${className}` : 'block'}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {Children.map(children, (child, i) => (
        <span key={i} className="block overflow-hidden leading-[inherit]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '112%', opacity: 0.01 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration, ease: EASE_CINEMATIC }}
          >
            {child}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
