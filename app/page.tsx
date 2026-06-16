import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { SegmentMarquee } from "@/components/segment-marquee"
import { Story } from "@/components/story"
import { Services } from "@/components/services"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { Differentiators } from "@/components/differentiators"
import { ContactFooter } from "@/components/contact-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SegmentMarquee />
        <Story />
        <Services />
        <PortfolioGallery />
        <Differentiators />
        <ContactFooter />
      </main>
    </>
  )
}
