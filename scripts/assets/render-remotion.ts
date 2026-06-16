import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { MOTION_DIR, ROOT } from './paths'

const REMOTION_BIN = path.join(ROOT, 'node_modules', '.bin', 'remotion')

const JOBS: { compositionId: string; output: string }[] = [
  { compositionId: 'Intro', output: path.join(MOTION_DIR, 'intro.mp4') },
  { compositionId: 'BackgroundParticles', output: path.join(MOTION_DIR, 'backgrounds', 'particles.mp4') },
  { compositionId: 'BackgroundLightSweep', output: path.join(MOTION_DIR, 'backgrounds', 'light-sweep.mp4') },
  { compositionId: 'BackgroundFog', output: path.join(MOTION_DIR, 'backgrounds', 'fog.mp4') },
  { compositionId: 'BackgroundWaves', output: path.join(MOTION_DIR, 'backgrounds', 'waves.mp4') },
]

export function run() {
  fs.mkdirSync(path.join(MOTION_DIR, 'backgrounds'), { recursive: true })

  for (const job of JOBS) {
    console.log(`[render-remotion] ${job.compositionId} -> ${path.relative(ROOT, job.output)}`)
    execFileSync(
      REMOTION_BIN,
      ['render', job.compositionId, job.output, '--codec=h264'],
      { stdio: 'inherit', cwd: ROOT },
    )
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run()
}
