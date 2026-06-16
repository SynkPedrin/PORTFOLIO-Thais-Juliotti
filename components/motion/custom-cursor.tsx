'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMotionContext } from '@/components/motion/motion-provider'

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor="hover"]'

export function CustomCursor() {
  const { tier } = useMotionContext()
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 })

  const active = tier.ready && tier.hasFinePointer && !tier.prefersReducedMotion

  useEffect(() => {
    if (!active) return

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const onOver = (event: MouseEvent) => {
      setHovering(Boolean((event.target as Element)?.closest?.(INTERACTIVE_SELECTOR)))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <>
      {/* Dot — white + mix-blend-difference = always visible on any bg color */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[110] size-2.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0.4 : 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Ring — also mix-blend-difference for guaranteed contrast on every section */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[110] rounded-full border-2 border-white mix-blend-difference"
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
