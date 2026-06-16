'use client'

import { useEffect, useState } from 'react'

export type DeviceTier = {
  /** false até o efeito de resolução no client rodar (mantém paridade com o SSR). */
  ready: boolean
  hasFinePointer: boolean
  prefersReducedMotion: boolean
  /** Liga efeitos caros (R3F, parallax pesado, magnetic, dynamic blur). */
  isHighTier: boolean
}

const INITIAL: DeviceTier = {
  ready: false,
  hasFinePointer: false,
  prefersReducedMotion: false,
  isHighTier: false,
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(INITIAL)

  useEffect(() => {
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const resolve = () => {
      const hasFinePointer = fineQuery.matches
      const prefersReducedMotion = reducedQuery.matches
      const wideViewport = window.innerWidth >= 1024
      const hardwareOk = (navigator.hardwareConcurrency ?? 4) >= 4

      setTier({
        ready: true,
        hasFinePointer,
        prefersReducedMotion,
        isHighTier: hasFinePointer && !prefersReducedMotion && wideViewport && hardwareOk,
      })
    }

    resolve()
    fineQuery.addEventListener('change', resolve)
    reducedQuery.addEventListener('change', resolve)
    window.addEventListener('resize', resolve)

    return () => {
      fineQuery.removeEventListener('change', resolve)
      reducedQuery.removeEventListener('change', resolve)
      window.removeEventListener('resize', resolve)
    }
  }, [])

  return tier
}
