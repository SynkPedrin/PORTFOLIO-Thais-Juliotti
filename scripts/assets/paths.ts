import fs from 'node:fs'
import path from 'node:path'

export const ROOT = path.resolve(import.meta.dirname, '../..')
export const FRAMES_DIR = path.join(ROOT, 'MIDIAS', '_frames')
export const OPTIMIZED_DIR = path.join(ROOT, 'public', 'optimized')
export const SHOWREEL_DIR = path.join(ROOT, 'public', 'showreel')
export const MOTION_DIR = path.join(ROOT, 'public', 'motion')

export function isUpToDate(source: string, output: string): boolean {
  if (!fs.existsSync(output)) return false
  if (!fs.existsSync(source)) return false
  return fs.statSync(output).mtimeMs >= fs.statSync(source).mtimeMs
}
