import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import { CinematicReveal } from '@/components/motion/cinematic-reveal'
import { HeroPhotoLayers } from '@/components/motion/hero-photo-layers'
import { MagneticButton } from '@/components/motion/magnetic-button'
import { MotionBackgroundVideo } from '@/components/motion/motion-background-video'
import { TextLineReveal } from '@/components/motion/text-line-reveal'
import { heroLoopSrc } from '@/lib/media-manifest'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 lg:pt-36">
      {/* Ambient loop bg — barely visible, mix-blend-screen lifts shadows */}
      <MotionBackgroundVideo
        src={heroLoopSrc()}
        className="opacity-20 mix-blend-screen [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/65 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Mobile portrait — full-width banner, fades at bottom, hidden on desktop */}
        <div className="relative mb-8 h-[52vw] max-h-[320px] overflow-hidden rounded-2xl lg:hidden">
          <Image
            src="/thais-julioti.png"
            alt="Thaís Julioti, fotógrafa e produtora de conteúdo"
            fill
            priority
            sizes="(max-width: 1024px) 100vw"
            className="object-cover object-[center_10%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-12">
          {/* ── Text column ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <CinematicReveal variant="fade-up" amount={0.6}>
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                Fotógrafa · Videomaker · Produtora de Conteúdo
              </p>
            </CinematicReveal>

            <h1 className="mt-5 font-serif text-[clamp(2.6rem,8vw,6rem)] font-light leading-[0.96] tracking-tight text-foreground">
              <TextLineReveal delay={0.12}>
                <span>Histórias que</span>
                <span>
                  <span className="italic text-accent-foreground/90">conectam</span>
                  {' '}e posicionam
                </span>
              </TextLineReveal>
            </h1>

            <CinematicReveal variant="fade-up" delay={0.55} amount={0.5}>
              <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
                Mais de uma década transformando marcas e pessoas em imagem. Não entrego apenas
                fotos e vídeos — entrego comunicação visual completa, com olhar editorial e
                estratégia em cada frame.
              </p>
            </CinematicReveal>

            <CinematicReveal variant="fade-up" delay={0.75} amount={0.5}>
              <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton
                  href="#contato"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-7 sm:py-4"
                >
                  Vamos criar juntos
                  <ArrowDownRight className="size-4" aria-hidden="true" />
                </MagneticButton>
                <MagneticButton
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:px-7 sm:py-4"
                >
                  Ver portfólio
                </MagneticButton>
              </div>
            </CinematicReveal>

            <CinematicReveal variant="fade-up" delay={0.95} amount={0.3}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-7 sm:gap-6 sm:pt-8">
                <div>
                  <dt className="font-serif text-2xl text-foreground sm:text-3xl">2016</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    onde tudo começou
                  </dd>
                </div>
                <div>
                  <dt className="font-serif text-2xl text-foreground sm:text-3xl">+10</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    anos de trajetória
                  </dd>
                </div>
                <div>
                  <dt className="font-serif text-2xl text-foreground sm:text-3xl">3</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    frentes criativas
                  </dd>
                </div>
              </dl>
            </CinematicReveal>
          </div>

          {/* ── Photo column — 3D layers, desktop only ──────────── */}
          <div className="hidden lg:col-span-5 lg:block">
            <HeroPhotoLayers
              src="/thais-julioti.png"
              alt="Thaís Julioti, produtora de conteúdo visual"
              width={780}
              height={1040}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
