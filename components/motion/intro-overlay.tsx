'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { introVideoSrc } from '@/lib/media-manifest'
import { EASE_CINEMATIC } from '@/lib/motion/easings'

const SESSION_KEY = 'thais-intro-seen'

export function IntroOverlay() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const alreadySeen = sessionStorage.getItem(SESSION_KEY)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!alreadySeen && !prefersReducedMotion) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  useEffect(() => {
    if (!visible) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="size-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            src={introVideoSrc()}
          />
          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-8 right-8 rounded-full border border-foreground/25 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:bg-foreground/10"
          >
            Pular intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
