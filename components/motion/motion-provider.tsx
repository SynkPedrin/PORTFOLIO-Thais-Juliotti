'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useDeviceTier, type DeviceTier } from '@/lib/motion/use-device-tier'

let scrollTriggerRegistered = false

type MotionContextValue = {
  lenis: Lenis | null
  tier: DeviceTier
}

const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  tier: { ready: false, hasFinePointer: false, prefersReducedMotion: false, isHighTier: false },
})

export function useMotionContext() {
  return useContext(MotionContext)
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const tier = useDeviceTier()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (!tier.ready) return

    document.documentElement.classList.toggle(
      'has-custom-cursor',
      tier.hasFinePointer && !tier.prefersReducedMotion,
    )

    if (tier.prefersReducedMotion) {
      setLenis(null)
      return
    }

    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger)
      scrollTriggerRegistered = true
    }

    const instance = new Lenis({ duration: 1.1, smoothWheel: true })
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      setLenis(null)
    }
  }, [tier.ready, tier.hasFinePointer, tier.prefersReducedMotion])

  return <MotionContext.Provider value={{ lenis, tier }}>{children}</MotionContext.Provider>
}
