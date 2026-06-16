const STEPS = [
  { name: 'frames', run: () => import('./extract-frames').then((m) => m.run()) },
  { name: 'images', run: () => import('./resize-images').then((m) => m.run()) },
  { name: 'videos', run: () => import('./transcode-videos').then((m) => m.run()) },
  { name: 'remotion', run: () => import('./render-remotion').then((m) => m.run()) },
] as const

async function main() {
  const args = process.argv.slice(2)
  const only = args.find((a) => a.startsWith('--only='))?.split('=')[1]?.split(',')
  const skip = args.find((a) => a.startsWith('--skip='))?.split('=')[1]?.split(',')

  for (const step of STEPS) {
    if (only && !only.includes(step.name)) continue
    if (skip && skip.includes(step.name)) continue

    const start = Date.now()
    console.log(`\n=== ${step.name} ===`)
    await step.run()
    console.log(`=== ${step.name} done in ${((Date.now() - start) / 1000).toFixed(1)}s ===`)
  }
}

main()
