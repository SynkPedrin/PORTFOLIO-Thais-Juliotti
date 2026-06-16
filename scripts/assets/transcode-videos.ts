import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import { SHOWREEL_CASES, SHOWREEL_FEATURED, type ShowreelVideo } from '../../lib/media-manifest'
import { MOTION_DIR, ROOT, SHOWREEL_DIR, isUpToDate } from './paths'

const FFMPEG = ffmpegPath as string

function transcode(video: ShowreelVideo) {
  const source = path.join(ROOT, video.source)
  const output = path.join(SHOWREEL_DIR, `${video.id}.mp4`)
  const poster = path.join(SHOWREEL_DIR, `${video.id}-poster.jpg`)

  if (!fs.existsSync(source)) {
    console.warn(`[transcode-videos] MISSING source for ${video.id}: ${source}`)
    return
  }

  if (!isUpToDate(source, output)) {
    console.log(`[transcode-videos] ${video.id}.mp4 <- ${video.source}`)
    const audioArgs = video.hasAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an']
    const trimArgs = video.previewDuration !== undefined
      ? ['-ss', String(video.previewStart ?? 0), '-t', String(video.previewDuration)]
      : []
    execFileSync(FFMPEG, [
      '-y',
      ...trimArgs,
      '-i', source,
      '-vf', 'scale=-2:1280',
      '-r', '30',
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-preset', 'fast',
      '-crf', '23',
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
      ...audioArgs,
      output,
    ], { stdio: 'inherit' })
  } else {
    console.log(`[transcode-videos] skip (up to date): ${video.id}.mp4`)
  }

  if (!isUpToDate(source, poster)) {
    const posterTime = String((video.previewStart ?? 0) + 1)
    execFileSync(FFMPEG, ['-y', '-ss', posterTime, '-i', source, '-vframes', '1', '-q:v', '2', poster])
    console.log(`[transcode-videos] ${video.id}-poster.jpg`)
  }
}

function transcodeHeroLoop() {
  const source = path.join(ROOT, SHOWREEL_FEATURED.source)
  const output = path.join(MOTION_DIR, 'hero-loop.mp4')
  if (isUpToDate(source, output)) {
    console.log('[transcode-videos] skip (up to date): hero-loop.mp4')
    return
  }
  console.log('[transcode-videos] hero-loop.mp4 (recorte de 6s, desaturado, mudo)')
  execFileSync(FFMPEG, [
    '-y',
    '-ss', '8',
    '-t', '6',
    '-i', source,
    '-vf', 'scale=-2:960,eq=saturation=0.35:brightness=-0.02',
    '-an',
    '-r', '30',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    output,
  ], { stdio: 'inherit' })
}

export function run() {
  fs.mkdirSync(SHOWREEL_DIR, { recursive: true })
  fs.mkdirSync(MOTION_DIR, { recursive: true })

  transcode(SHOWREEL_FEATURED)
  for (const video of SHOWREEL_CASES) transcode(video)
  transcodeHeroLoop()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run()
}
