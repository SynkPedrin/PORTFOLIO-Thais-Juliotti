'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type MotionBackgroundVideoProps = {
  src: string
  poster?: string
  className?: string
}

/** Vídeo de fundo (loop ambiente / Remotion pré-renderizado) — só carrega quando próximo da viewport. */
export function MotionBackgroundVideo({ src, poster, className }: MotionBackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <video
        ref={ref}
        className="size-full object-cover"
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        src={shouldLoad ? src : undefined}
      />
    </div>
  )
}
