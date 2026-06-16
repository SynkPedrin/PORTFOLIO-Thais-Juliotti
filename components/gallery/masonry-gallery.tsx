'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { GalleryItemCard } from '@/components/gallery/gallery-item'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { TextLineReveal } from '@/components/motion/text-line-reveal'
import { EASE_CINEMATIC } from '@/lib/motion/easings'
import { GALLERY_CATEGORIES } from '@/lib/media-manifest'
import { cn } from '@/lib/utils'

const ALL_TAB = { id: 'all', label: 'Todos' }
const TABS = [ALL_TAB, ...GALLERY_CATEGORIES.map(({ id, label }) => ({ id, label }))]

export function MasonryGallery() {
  const [activeTab, setActiveTab] = useState('all')

  const visibleCategories =
    activeTab === 'all'
      ? GALLERY_CATEGORIES
      : GALLERY_CATEGORIES.filter((cat) => cat.id === activeTab)

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

        {/* Category filter tabs */}
        <CinematicReveal variant="fade-up" delay={0.2} className="mt-12 flex flex-wrap gap-2">
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

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4 lg:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          >
            {visibleCategories.map((cat) =>
              cat.items.map((item, i) => (
                <GalleryItemCard
                  key={`${cat.id}-${item.slug}`}
                  item={item}
                  categoryId={cat.id}
                  priority={i < 2 && activeTab !== 'all'}
                />
              )),
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
