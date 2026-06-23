'use client'

import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { TextLineReveal } from '@/components/motion/text-line-reveal'
import { EASE_CINEMATIC } from '@/lib/motion/easings'
import { GALLERY_CATEGORIES, galleryImageSrc } from '@/lib/media-manifest'
import type { GalleryItem } from '@/lib/media-manifest'
import { cn } from '@/lib/utils'

const ALL_TAB = { id: 'all', label: 'Todos' }
const TABS = [ALL_TAB, ...GALLERY_CATEGORIES.map(({ id, label }) => ({ id, label }))]

type CarouselItem = GalleryItem & { categoryId: string }

function buildItems(activeTab: string): CarouselItem[] {
  const cats =
    activeTab === 'all'
      ? GALLERY_CATEGORIES
      : GALLERY_CATEGORIES.filter((c) => c.id === activeTab)
  return cats.flatMap((cat) => cat.items.map((item) => ({ ...item, categoryId: cat.id })))
}

function CarouselCard({ item, priority }: { item: CarouselItem; priority?: boolean }) {
  const isPortrait = item.height >= item.width

  return (
    <div
      className={cn(
        'relative shrink-0 select-none overflow-hidden rounded-2xl bg-secondary',
        isPortrait
          ? 'h-[72vw] w-[48vw] sm:h-[520px] sm:w-[346px]'
          : 'h-[48vw] w-[72vw] sm:h-[346px] sm:w-[520px]',
      )}
    >
      <Image
        src={galleryImageSrc(item.categoryId, item.slug, 1200)}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 72vw, 520px"
        className="pointer-events-none object-cover transition-transform duration-700 ease-out"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        draggable={false}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}

export function MasonryGallery() {
  const [activeTab, setActiveTab] = useState('all')
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const items = buildItems(activeTab)

  const STEP = 360

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollLeft = 0
    updateArrows()
  }, [activeTab, updateArrows])

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' })
  }

  return (
    <section id="portfolio" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CinematicReveal stagger={0.12}>
          <CinematicRevealItem variant="fade-up">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              Portfólio
            </p>
          </CinematicRevealItem>
          <CinematicRevealItem>
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] text-foreground">
              <TextLineReveal>
                <span>Histórias que já contei</span>
              </TextLineReveal>
            </h2>
          </CinematicRevealItem>
        </CinematicReveal>

        {/* Tabs + arrows row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <CinematicReveal variant="fade-up" delay={0.2} className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-cursor="hover"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground',
                )}
              >
                {tab.label}
              </button>
            ))}
          </CinematicReveal>

          {/* Arrow buttons */}
          <CinematicReveal variant="fade-up" delay={0.3} className="flex gap-2">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:border-accent/60 hover:bg-muted disabled:opacity-25"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:border-accent/60 hover:bg-muted disabled:opacity-25"
            >
              <ChevronRight className="size-5" />
            </button>
          </CinematicReveal>
        </div>
      </div>

      {/* Full-width carousel track */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
          className="relative mt-10"
        >
          {/* Left/right fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-4 overflow-x-auto scroll-smooth px-6 pb-4 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((item, i) => (
              <div key={`${item.categoryId}-${item.slug}`} style={{ scrollSnapAlign: 'start' }}>
                <CarouselCard item={item} priority={i < 3} />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
