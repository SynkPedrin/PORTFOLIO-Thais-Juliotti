const TIMELINE = [
  {
    year: "2016",
    title: "O chamado",
    text: "Tudo começou no campo missionário, com uma câmera nas mãos e um propósito no coração. De forma voluntária, descobri que fotografia, audiovisual e criação não eram apenas habilidades — eram o meu chamado.",
  },
  {
    year: "A descoberta",
    title: "Comunicar pela imagem",
    text: "Aquele ambiente me revelou algo que eu ainda não sabia sobre mim mesma: sou criativa, e é através da imagem que eu me comunico com o mundo.",
  },
  {
    year: "Hoje",
    title: "Vocação que virou profissão",
    text: "Após mais de uma década de trajetória, atuo como Fotógrafa, Videomaker e Produtora de Conteúdo, entregando não apenas imagens, mas histórias que conectam, emocionam e posicionam marcas e pessoas.",
  },
]

export function Story() {
  return (
    <section id="historia" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Minha história
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.05] tracking-tight text-balance text-foreground">
            Uma câmera, um propósito e um chamado
          </h2>
          <p className="mt-6 max-w-sm text-pretty leading-relaxed text-foreground/70">
            Cada projeto carrega a mesma essência que me trouxe até aqui: contar histórias
            verdadeiras através da imagem.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ol className="relative border-l border-border">
            {TIMELINE.map((item) => (
              <li key={item.title} className="relative pb-12 pl-8 last:pb-0">
                <span
                  className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {item.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-foreground/70">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
