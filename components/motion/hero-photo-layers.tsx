'use client'

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useMotionContext } from '@/components/motion/motion-provider'

type HeroPhotoLayersProps = {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Três camadas de movimento independentes, como pedido no brief:
 *  - scroll: parallax próprio via useScroll (camada externa)
 *  - idle: flutuação contínua quase imperceptível via CSS (camada intermediária)
 *  - mouse: rotação/translação 3D via pointermove (camada interna, ao redor da foto)
 */
export function HeroPhotoLayers({ src, alt, width, height }: HeroPhotoLayersProps) {
  const { tier } = useMotionContext()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [36, -36])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 80, damping: 18, mass: 0.4 })
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18, mass: 0.4 })

  const rotateX = useTransform(springY, [-1, 1], [8, -8])
  const rotateY = useTransform(springX, [-1, 1], [-10, 10])
  const tiltX = useTransform(springX, [-1, 1], [-14, 14])
  const tiltY = useTransform(springY, [-1, 1], [-10, 10])

  useEffect(() => {
    if (!tier.ready || !tier.hasFinePointer || tier.prefersReducedMotion) return
    const el = containerRef.current
    if (!el) return

    function onMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
      pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
    }
    function onLeave() {
      pointerX.set(0)
      pointerY.set(0)
    }

    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [tier.ready, tier.hasFinePointer, tier.prefersReducedMotion, pointerX, pointerY])

  return (
    <motion.div
      ref={containerRef}
      className="relative mx-auto max-w-sm lg:max-w-none"
      style={{ translateY: tier.prefersReducedMotion ? 0 : scrollTranslateY }}
    >
      <div className="absolute -inset-x-6 bottom-0 top-10 rounded-t-[3rem] bg-black/40 blur-2xl" aria-hidden="true" />
      <div className="absolute -inset-x-4 bottom-0 top-16 rounded-t-[3rem] bg-secondary" aria-hidden="true" />
      <div
        className="absolute -inset-x-4 bottom-0 top-16 rounded-t-[3rem] ring-1 ring-inset ring-accent/40"
        aria-hidden="true"
      />
      <div className="motion-idle-float" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX, rotateY, translateX: tiltX, translateY: tiltY }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            className="relative z-10 mx-auto w-full max-w-md object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
