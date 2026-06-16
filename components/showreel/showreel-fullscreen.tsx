'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { EASE_CINEMATIC } from '@/lib/motion/easings'
import { showreelVideoSrc } from '@/lib/media-manifest'
import type { ShowreelVideo } from '@/lib/media-manifest'

type ShowreelFullscreenProps = {
  video: ShowreelVideo | null
  onClose: () => void
}

export function ShowreelFullscreen({ video, onClose }: ShowreelFullscreenProps) {
  useEffect(() => {
    if (!video) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[min(420px,90vw)]"
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 24 }}
            transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              key={video.id}
              className="w-full rounded-2xl object-cover"
              style={{ maxHeight: '88dvh' }}
              src={showreelVideoSrc(video.id)}
              autoPlay
              playsInline
              controls
              muted={!video.hasAudio}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/90"
            >
              <X className="size-4" />
            </button>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-background/80 to-transparent p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">{video.category}</p>
              <p className="mt-0.5 font-serif text-lg text-foreground">{video.label}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
