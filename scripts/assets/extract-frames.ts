import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import { GALLERY_CATEGORIES } from '../../lib/media-manifest'
import { FRAMES_DIR, ROOT, isUpToDate } from './paths'

export function framePathFor(slug: string) {
  return path.join(FRAMES_DIR, `${slug}.jpg`)
}

export function run() {
  fs.mkdirSync(FRAMES_DIR, { recursive: true })

  for (const category of GALLERY_CATEGORIES) {
    for (const item of category.items) {
      if (item.extractFrameAt === undefined) continue

      const source = path.join(ROOT, item.source)
      const output = framePathFor(item.slug)

      if (isUpToDate(source, output)) {
        console.log(`[extract-frames] skip (up to date): ${item.slug}`)
        continue
      }

      console.log(`[extract-frames] ${item.slug} <- ${item.source} @ ${item.extractFrameAt}s`)
      execFileSync(ffmpegPath as string, [
        '-y',
        '-ss', String(item.extractFrameAt),
        '-i', source,
        '-vframes', '1',
        '-q:v', '2',
        '-update', '1',
        output,
      ])
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run()
}
