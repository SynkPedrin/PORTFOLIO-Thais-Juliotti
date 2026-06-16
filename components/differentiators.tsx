import { Eye, Layers, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AmbientParticlesClient } from '@/components/motion/particles-client'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { TextLineReveal } from '@/components/motion/text-line-reveal'

type Point = {
  icon: LucideIcon
  title: string
  text: string
}

const POINTS: Point[] = [
  {
    icon: Eye,
    title: 'Visão completa da comunicação visual',
    text: 'Não enxergo a imagem isolada. Penso na narrativa, na estética e na estratégia como um só sistema — para que cada peça fortaleça o posicionamento da marca.',
  },
  {
    icon: Layers,
    title: 'Experiência em múltiplos segmentos',
    text: 'Mais de uma década atuando entre branding, gastronomia, moda, eventos e lifestyle me deu repertório para adaptar a linguagem a cada universo.',
  },
  {
    icon: Workflow,
    title: 'Foto, vídeo e conteúdo em um só lugar',
    text: 'Da captação à entrega final, conduzo todo o processo criativo com consistência — sem ruídos entre fotografia, audiovisual e produção de conteúdo.',
  },
]

export function Differentiators() {
  return (
    <section id="diferenciais" className="relative scroll-mt-24 overflow-hidden bg-secondary py-24 lg:py-36">
      {/* R3F ambient particles — only painted, never blocks layout */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <AmbientParticlesClient className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <CinematicReveal stagger={0.1} className="lg:col-span-5">
            <CinematicRevealItem variant="fade-up">
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px w-10 bg-accent-foreground/40" aria-hidden="true" />
                Por que trabalhar comigo
              </p>
            </CinematicRevealItem>
            <CinematicRevealItem>
              <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] text-secondary-foreground">
                <TextLineReveal>
                  <span>O que me diferencia</span>
                  <span>da maioria</span>
                </TextLineReveal>
              </h2>
            </CinematicRevealItem>
            <CinematicRevealItem variant="fade-up">
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-secondary-foreground/70">
                Mais do que técnica, entrego um olhar estratégico que une marca, história e imagem
                em uma comunicação coerente do início ao fim.
              </p>
            </CinematicRevealItem>
          </CinematicReveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <CinematicReveal
              stagger={0.13}
              className="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border"
            >
              {POINTS.map((point) => (
                <CinematicRevealItem key={point.title} variant="fade-up">
                  <div className="flex gap-5 bg-secondary p-7">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <point.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-secondary-foreground">{point.title}</h3>
                      <p className="mt-2 text-pretty leading-relaxed text-secondary-foreground/70">
                        {point.text}
                      </p>
                    </div>
                  </div>
                </CinematicRevealItem>
              ))}
            </CinematicReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
