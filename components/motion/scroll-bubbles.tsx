'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { galleryImageSrc } from '@/lib/media-manifest'

const BUBBLES = [
  {
    src: galleryImageSrc('casamentos', 'eucalyptus', 800),
    alt: 'Casal abraçado em bosque de eucaliptos',
    size: 220,
    left: '6%',
    top: '12%',
    entryX: -120,
    entryY: 30,
    range: [0.0, 0.25] as [number, number],
    float: { y: [-12, 12], duration: 5.2 },
  },
  {
    src: galleryImageSrc('casamentos', 'chapel-dance', 800),
    alt: 'Noivos dançando na cerimônia',
    size: 160,
    left: '76%',
    top: '8%',
    entryX: 100,
    entryY: -40,
    range: [0.08, 0.3] as [number, number],
    float: { y: [10, -10], duration: 4.7 },
  },
  {
    src: galleryImageSrc('casamentos', 'closeup', 800),
    alt: 'Close-up íntimo do casal de noivos',
    size: 190,
    left: '42%',
    top: '2%',
    entryX: 0,
    entryY: -80,
    range: [0.14, 0.36] as [number, number],
    float: { y: [-8, 14], duration: 6.1 },
  },
  {
    src: galleryImageSrc('casamentos', 'couple-field', 800),
    alt: 'Casal em campo aberto sob a luz da tarde',
    size: 200,
    left: '22%',
    top: '52%',
    entryX: -80,
    entryY: 60,
    range: [0.2, 0.44] as [number, number],
    float: { y: [14, -8], duration: 5.8 },
  },
  {
    src: galleryImageSrc('casamentos', 'rings', 800),
    alt: 'Alianças de casamento',
    size: 140,
    left: '64%',
    top: '55%',
    entryX: 90,
    entryY: 50,
    range: [0.28, 0.5] as [number, number],
    float: { y: [-10, 10], duration: 4.4 },
  },
  {
    src: galleryImageSrc('familia', 'bolhas-de-sabao', 800),
    alt: 'Família soprando bolhas de sabão no parque',
    size: 170,
    left: '82%',
    top: '38%',
    entryX: 110,
    entryY: 20,
    range: [0.34, 0.56] as [number, number],
    float: { y: [8, -14], duration: 5.5 },
  },
  {
    src: galleryImageSrc('casamentos', 'hands', 800),
    alt: 'Mãos entrelaçadas da noiva',
    size: 150,
    left: '4%',
    top: '62%',
    entryX: -90,
    entryY: 40,
    range: [0.38, 0.6] as [number, number],
    float: { y: [-14, 8], duration: 6.3 },
  },
  {
    src: galleryImageSrc('batismo', 'agua-batismal', 800),
    alt: 'Batismo',
    size: 130,
    left: '50%',
    top: '72%',
    entryX: 0,
    entryY: 80,
    range: [0.44, 0.66] as [number, number],
    float: { y: [10, -10], duration: 4.9 },
  },
]

type BubbleProps = (typeof BUBBLES)[0] & {
  scrollProgress: ReturnType<typeof useSpring>
}

function Bubble({ src, alt, size, left, top, entryX, entryY, range, float, scrollProgress }: BubbleProps) {
  const opacity = useTransform(scrollProgress, [range[0], range[0] + 0.08, range[1], range[1] + 0.12], [0, 1, 1, 0])
  const x = useTransform(scrollProgress, [range[0], range[0] + 0.12], [entryX, 0])
  const y = useTransform(scrollProgress, [range[0], range[0] + 0.12], [entryY, 0])
  const scale = useTransform(scrollProgress, [range[0], range[0] + 0.1], [0.7, 1])

  return (
    <motion.div
      style={{ opacity, x, y, scale, left, top, width: size, height: size }}
      className="absolute overflow-hidden rounded-full border border-white/10 shadow-2xl shadow-black/40"
      animate={{ y: [float.y[0], float.y[1], float.y[0]] }}
      transition={{ y: { duration: float.duration, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
    </motion.div>
  )
}

export function ScrollBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 })

  return (
    <section
      ref={containerRef}
      aria-hidden="true"
      className="relative -mt-16 h-[140vh] overflow-hidden"
    >
      {/* gradient fade top/bottom so it blends with surrounding sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Centered label */}
      <motion.div
        className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-serif text-[clamp(1.4rem,3.5vw,2.6rem)] font-light text-foreground/80">
          Momentos que ficam para sempre
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.28em] text-muted-foreground">
          cada história, única
        </p>
      </motion.div>

      {/* Bubbles */}
      {BUBBLES.map((b, i) => (
        <Bubble key={i} {...b} scrollProgress={smoothProgress} />
      ))}
    </section>
  )
}
