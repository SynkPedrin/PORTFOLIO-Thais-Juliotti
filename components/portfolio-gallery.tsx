import Image from "next/image"

const PROJECTS = [
  {
    src: "/portfolio/branding.png",
    title: "Identidade de Marca",
    category: "Branding · Still",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/portfolio/retrato.png",
    title: "Ensaio Editorial",
    category: "Retrato",
    span: "",
  },
  {
    src: "/portfolio/produto.png",
    title: "Linha de Skincare",
    category: "Produto",
    span: "",
  },
  {
    src: "/portfolio/filmagem.png",
    title: "Bastidores de Vídeo",
    category: "Filmagem",
    span: "md:col-span-2",
  },
  {
    src: "/portfolio/gastronomia.png",
    title: "Conteúdo Gastronômico",
    category: "Food · Editorial",
    span: "",
  },
  {
    src: "/portfolio/lifestyle.png",
    title: "Lifestyle de Marca",
    category: "Conteúdo Social",
    span: "md:col-span-3",
  },
]

export function PortfolioGallery() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10 lg:py-36">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Portfólio selecionado
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-balance text-foreground">
            Trabalhos que contam histórias
          </h2>
        </div>
        <a
          href="https://www.instagram.com/thaisjuliotifoto/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
        >
          Ver mais no Instagram
        </a>
      </div>

      <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <figure
            key={project.title}
            className={`group relative overflow-hidden rounded-2xl bg-muted ${project.span}`}
          >
            <Image
              src={project.src || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
                {project.category}
              </p>
              <p className="mt-1 font-serif text-xl text-primary-foreground">{project.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
