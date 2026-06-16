'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '@/lib/motion/use-magnetic'

type MagneticButtonProps = {
  href?: string
  strength?: number
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function MagneticButton({
  href,
  strength = 0.3,
  children,
  className,
  target,
  rel,
  type,
  onClick,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength)

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        data-cursor="hover"
        style={{ x, y }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? 'button'}
      onClick={onClick}
      data-cursor="hover"
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  )
}
