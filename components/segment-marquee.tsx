const SEGMENTS = [
  "Branding",
  "Gastronomia",
  "Moda",
  "Beleza",
  "Eventos",
  "Lançamentos",
  "Lifestyle",
  "Institucional",
  "Produto",
  "Conteúdo Social",
]

export function SegmentMarquee() {
  return (
    <section className="mt-20 border-y border-border bg-secondary py-5 lg:mt-28" aria-label="Segmentos de atuação">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...SEGMENTS, ...SEGMENTS].map((seg, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 font-serif text-lg italic text-secondary-foreground/80">{seg}</span>
              <span className="text-accent-foreground/50" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
