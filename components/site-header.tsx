"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { InstagramIcon } from "@/components/instagram-icon"

const NAV_LINKS = [
  { label: "História", href: "#historia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Showreel", href: "#showreel" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-foreground">Thaís Julioti</span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Comunicação Visual
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/thaisjuliotifoto/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <InstagramIcon className="size-4" />
            Instagram
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-foreground/80 last:border-none"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/thaisjuliotifoto/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
            >
              <InstagramIcon className="size-4" />
              @thaisjuliotifoto
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
