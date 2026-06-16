/** Easings/durações cinematográficas compartilhadas entre GSAP, Framer Motion e CSS. */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const // expo-out suave
export const EASE_CINEMATIC_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const
export const EASE_SOFT_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  reveal: 1.4,
} as const
