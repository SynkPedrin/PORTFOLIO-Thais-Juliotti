import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { SegmentMarquee } from "@/components/segment-marquee"
import { Story } from "@/components/story"
import { Services } from "@/components/services"
import { Showreel } from "@/components/showreel/showreel"
import { MasonryGallery } from "@/components/gallery/masonry-gallery"
import { Differentiators } from "@/components/differentiators"
import { ContactFooter } from "@/components/contact-footer"
import { IntroOverlay } from "@/components/motion/intro-overlay"

export default function Page() {
  return (
    <>
      <IntroOverlay />
      <SiteHeader />
      <main>
        <Hero />
        <SegmentMarquee />
        <Story />
        <Services />
        <Showreel />
        <MasonryGallery />
        <Differentiators />
        <ContactFooter />
      </main>
    </>
  )
}
