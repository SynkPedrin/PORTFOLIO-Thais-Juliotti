'use client'

import { Maximize2, Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { TextLineReveal } from '@/components/motion/text-line-reveal'
import { ShowreelCard } from '@/components/showreel/showreel-card'
import { ShowreelFullscreen } from '@/components/showreel/showreel-fullscreen'
import { SHOWREEL_CASES, SHOWREEL_FEATURED, showreelVideoSrc } from '@/lib/media-manifest'
import type { ShowreelVideo } from '@/lib/media-manifest'

export function Showreel() {
  const [fullscreen, setFullscreen] = useState<ShowreelVideo | null>(null)
  const featuredRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function togglePlay() {
    const vid = featuredRef.current
    if (!vid) return
    if (vid.paused) {
      vid.play()
      setPlaying(true)
    } else {
      vid.pause()
      setPlaying(false)
    }
  }

  function openFeaturedFullscreen(e: React.MouseEvent) {
    e.stopPropagation()
    setFullscreen(SHOWREEL_FEATURED)
  }

  return (
    <>
      <section id="showreel" className="scroll-mt-24 py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <CinematicReveal stagger={0.12}>
            <CinematicRevealItem variant="fade-up">
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                Showreel
              </p>
            </CinematicRevealItem>
            <CinematicRevealItem>
              <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] text-foreground">
                <TextLineReveal>
                  <span>Trabalhos que falam por si</span>
                </TextLineReveal>
              </h2>
            </CinematicRevealItem>
          </CinematicReveal>

          {/* Featured — VIDEO-BASE vertical 9:16 */}
          <CinematicReveal variant="scale" delay={0.2} className="mt-14">
            <div
              className="group relative mx-auto aspect-[9/16] max-w-[320px] cursor-pointer overflow-hidden rounded-3xl bg-secondary md:max-w-[380px]"
              onClick={togglePlay}
              data-cursor="hover"
              role="button"
              tabIndex={0}
              aria-label={playing ? 'Pausar reel' : 'Reproduzir reel principal'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay() }
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={featuredRef}
                className="h-full w-full object-cover"
                src={showreelVideoSrc('base')}
                poster={showreelVideoSrc('base', 'jpg')}
                playsInline
                muted
                onEnded={() => setPlaying(false)}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Play/Pause indicator */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-foreground/40 bg-background/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  {playing
                    ? <Pause className="size-6 fill-foreground text-foreground" />
                    : <Play className="ml-1 size-6 fill-foreground text-foreground" />
                  }
                </span>
              </div>

              {/* Expand button */}
              <button
                type="button"
                aria-label="Abrir em tela cheia"
                onClick={openFeaturedFullscreen}
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-foreground/25 bg-background/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-background/70"
              >
                <Maximize2 className="size-4 text-foreground" />
              </button>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">{SHOWREEL_FEATURED.category}</p>
                <p className="mt-1 font-serif text-xl text-foreground">{SHOWREEL_FEATURED.label}</p>
              </div>
            </div>
          </CinematicReveal>

          {/* Case cards */}
          <div className="mt-6">
            <CinematicReveal stagger={0.1} className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {SHOWREEL_CASES.map((video) => (
                <CinematicRevealItem key={video.id} variant="scale">
                  <ShowreelCard video={video} onClick={setFullscreen} />
                </CinematicRevealItem>
              ))}
            </CinematicReveal>
          </div>
        </div>
      </section>

      <ShowreelFullscreen video={fullscreen} onClose={() => setFullscreen(null)} />
    </>
  )
}
