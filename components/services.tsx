import { Camera, Clapperboard, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { TextLineReveal } from '@/components/motion/text-line-reveal'

type Service = {
  icon: LucideIcon
  number: string
  title: string
  text: string
  tags: string[]
}

const SERVICES: Service[] = [
  {
    icon: Camera,
    number: '01',
    title: 'Fotografia',
    text: 'Imagens com direção, luz e intenção. Retratos, produtos, gastronomia, branding e ensaios que traduzem a identidade de cada marca ou pessoa.',
    tags: ['Branding', 'Produto', 'Retrato', 'Editorial'],
  },
  {
    icon: Clapperboard,
    number: '02',
    title: 'Filmagem',
    text: 'Audiovisual que emociona e comunica. Do roteiro à edição, produzo vídeos institucionais, reels e conteúdos que dão movimento à sua história.',
    tags: ['Reels', 'Institucional', 'Eventos', 'Edição'],
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Criação de Conteúdo',
    text: 'Estratégia e estética caminhando juntas. Planejo e produzo conteúdo visual completo para posicionar marcas com consistência e propósito.',
    tags: ['Planejamento', 'Social', 'Direção', 'Estratégia'],
  },
]

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-primary py-24 text-primary-foreground lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CinematicReveal stagger={0.1} className="max-w-2xl">
          <CinematicRevealItem variant="fade-up">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground/60">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              O que eu faço
            </p>
          </CinematicRevealItem>
          <CinematicRevealItem>
            <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05]">
              <TextLineReveal>
                <span>Três frentes, uma</span>
                <span>visão criativa completa</span>
              </TextLineReveal>
            </h2>
          </CinematicRevealItem>
        </CinematicReveal>

        <CinematicReveal
          stagger={0.12}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/15 md:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <CinematicRevealItem key={service.title} variant="scale">
              <article className="flex h-full flex-col gap-6 bg-primary p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <service.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm text-primary-foreground/40">{service.number}</span>
                </div>
                <h3 className="font-serif text-2xl">{service.title}</h3>
                <p className="text-pretty leading-relaxed text-primary-foreground/70">{service.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </CinematicRevealItem>
          ))}
        </CinematicReveal>
      </div>
    </section>
  )
}
