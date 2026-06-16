import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { GALLERY_CATEGORIES, RESPONSIVE_WIDTHS } from '../../lib/media-manifest'
import { OPTIMIZED_DIR, ROOT, isUpToDate } from './paths'
import { framePathFor } from './extract-frames'

function resolveSource(item: { source: string; slug: string; extractFrameAt?: number }) {
  if (item.extractFrameAt !== undefined) return framePathFor(item.slug)
  return path.join(ROOT, item.source)
}

export async function run() {
  for (const category of GALLERY_CATEGORIES) {
    const outDir = path.join(OPTIMIZED_DIR, category.id)
    fs.mkdirSync(outDir, { recursive: true })

    for (const item of category.items) {
      const source = resolveSource(item)
      if (!fs.existsSync(source)) {
        console.warn(`[resize-images] MISSING source for ${item.slug}: ${source}`)
        continue
      }

      for (const width of RESPONSIVE_WIDTHS) {
        const output = path.join(outDir, `${item.slug}-${width}.webp`)
        if (isUpToDate(source, output)) continue

        await sharp(source)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(output)
        console.log(`[resize-images] ${category.id}/${item.slug}-${width}.webp`)
      }
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run()
}
