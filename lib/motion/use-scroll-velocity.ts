'use client'

import { useMotionTemplate, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

/** Blur dinâmico proporcional à velocidade do scroll — usado em camadas de parallax/hero. */
export function useScrollVelocityBlur(maxBlurPx = 8) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const blur = useTransform(smoothVelocity, (v) => Math.min(Math.abs(v) / 60, maxBlurPx))
  const blurFilter = useMotionTemplate`blur(${blur}px)`
  return { blur, blurFilter }
}
