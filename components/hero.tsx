import Image from "next/image"
import { ArrowDownRight } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          {/* Text */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              Fotógrafa · Videomaker · Produtora de Conteúdo
            </p>

            <h1 className="mt-6 font-serif text-[clamp(2.75rem,8vw,6rem)] font-light leading-[0.95] tracking-tight text-balance text-foreground">
              Histórias que
              <br />
              <span className="italic text-accent-foreground/90">conectam</span> e posicionam
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
              Mais de uma década transformando marcas e pessoas em imagem. Não entrego apenas
              fotos e vídeos — entrego comunicação visual completa, com olhar editorial e
              estratégia em cada frame.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Vamos criar juntos
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Ver portfólio
              </a>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="font-serif text-3xl text-foreground">2016</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  onde tudo começou
                </dd>
              </div>
              <div>
                <dt className="font-serif text-3xl text-foreground">+10</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  anos de trajetória
                </dd>
              </div>
              <div>
                <dt className="font-serif text-3xl text-foreground">3</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  frentes criativas
                </dd>
              </div>
            </dl>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-x-4 bottom-0 top-16 rounded-t-[3rem] bg-secondary" aria-hidden="true" />
              <div className="absolute -inset-x-4 bottom-0 top-16 rounded-t-[3rem] ring-1 ring-inset ring-accent/40" aria-hidden="true" />
              <Image
                src="/thais-julioti.png"
                alt="Thaís Julioti, produtora de conteúdo visual"
                width={780}
                height={1040}
                priority
                className="relative z-10 mx-auto w-full max-w-md object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
