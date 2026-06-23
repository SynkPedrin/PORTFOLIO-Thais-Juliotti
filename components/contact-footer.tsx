import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from '@/components/instagram-icon'
import { WhatsappIcon } from '@/components/whatsapp-icon'
import { CinematicReveal, CinematicRevealItem } from '@/components/motion/cinematic-reveal'
import { MagneticButton } from '@/components/motion/magnetic-button'
import { TextLineReveal } from '@/components/motion/text-line-reveal'

export function ContactFooter() {
  return (
    <footer id="contato" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CinematicReveal stagger={0.12}>
              <CinematicRevealItem variant="fade-up">
                <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-primary-foreground/60">
                  <span className="h-px w-10 bg-accent" aria-hidden="true" />
                  Vamos conversar
                </p>
              </CinematicRevealItem>
              <CinematicRevealItem>
                <h2 className="mt-6 font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.98]">
                  <TextLineReveal>
                    <span>Sua marca tem uma história.</span>
                    <span className="italic text-accent">Vamos transformá-la em imagem.</span>
                  </TextLineReveal>
                </h2>
              </CinematicRevealItem>
              <CinematicRevealItem variant="fade-up">
                <p className="mt-8 max-w-xl text-pretty leading-relaxed text-primary-foreground/70">
                  Conte sobre o seu projeto e descubra como a fotografia, o audiovisual e a produção
                  de conteúdo podem posicionar a sua marca com propósito.
                </p>
              </CinematicRevealItem>
              <CinematicRevealItem variant="fade-up">
                <div className="mt-10 flex flex-wrap gap-4">
                  <MagneticButton
                    href="https://wa.me/18996513244"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <WhatsappIcon className="size-4" />
                    Chamar no WhatsApp
                  </MagneticButton>
                  <MagneticButton
                    href="https://www.instagram.com/thaisjuliotifoto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    <InstagramIcon className="size-4" />
                    @thaisjuliotifoto
                  </MagneticButton>
                  <MagneticButton
                    href="mailto:contato@thaisjulioti.com"
                    className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    Enviar e-mail
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </CinematicRevealItem>
            </CinematicReveal>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:items-end">
            <CinematicReveal variant="fade-up" delay={0.3} className="lg:text-right">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/50">
                Serviços
              </p>
              <ul className="mt-3 space-y-1 text-primary-foreground/80">
                <li>Fotografia</li>
                <li>Filmagem</li>
                <li>Criação de Conteúdo</li>
              </ul>
            </CinematicReveal>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-serif text-base text-primary-foreground">Thaís Julioti</span> ·
            Comunicação Visual desde 2016
          </p>
          <p>© {new Date().getFullYear()} — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
