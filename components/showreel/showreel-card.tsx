'use client'

import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { showreelVideoSrc } from '@/lib/media-manifest'
import type { ShowreelVideo } from '@/lib/media-manifest'

type ShowreelCardProps = {
  video: ShowreelVideo
  onClick: (video: ShowreelVideo) => void
}

export function ShowreelCard({ video, onClick }: ShowreelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid || !isVisible) return
    if (isHovered) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
      vid.currentTime = 0
    }
  }, [isHovered, isVisible])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(video)
    }
  }

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`Abrir vídeo: ${video.label}`}
      className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl bg-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(video)}
      onKeyDown={handleKeyDown}
      data-cursor="hover"
    >
      <img
        src={showreelVideoSrc(video.id, 'jpg')}
        alt={video.label}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        loading="lazy"
      />

      {isVisible && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          src={showreelVideoSrc(video.id)}
          muted
          playsInline
          loop
          preload="none"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 scale-90 items-center justify-center rounded-full border border-foreground/30 bg-background/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:border-foreground/60">
          <Play className="ml-0.5 size-5 fill-foreground text-foreground" />
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-foreground/50">{video.category}</p>
        <p className="mt-1 font-serif text-base text-foreground">{video.label}</p>
      </div>
    </div>
  )
}
