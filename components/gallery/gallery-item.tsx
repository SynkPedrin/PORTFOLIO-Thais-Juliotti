import Image from 'next/image'
import { galleryImageSrc } from '@/lib/media-manifest'
import type { GalleryItem } from '@/lib/media-manifest'

type GalleryItemCardProps = {
  item: GalleryItem
  categoryId: string
  priority?: boolean
}

export function GalleryItemCard({ item, categoryId, priority = false }: GalleryItemCardProps) {
  return (
    <div className="group relative mb-3 break-inside-avoid overflow-hidden rounded-xl bg-secondary lg:mb-4">
      <Image
        src={galleryImageSrc(categoryId, item.slug, 1200)}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="p-4 text-xs leading-snug text-foreground/90">{item.alt}</p>
      </div>
    </div>
  )
}
