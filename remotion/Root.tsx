import { Composition } from 'remotion'
import { Intro, INTRO_DURATION_IN_FRAMES } from './compositions/Intro'
import { BackgroundParticles, LOOP_DURATION_IN_FRAMES as PARTICLES_DURATION } from './compositions/BackgroundParticles'
import { BackgroundLightSweep, LOOP_DURATION_IN_FRAMES as LIGHT_SWEEP_DURATION } from './compositions/BackgroundLightSweep'
import { BackgroundFog, LOOP_DURATION_IN_FRAMES as FOG_DURATION } from './compositions/BackgroundFog'
import { BackgroundWaves, LOOP_DURATION_IN_FRAMES as WAVES_DURATION } from './compositions/BackgroundWaves'
import { FPS } from './tokens'

const FULL_HD = { width: 1920, height: 1080 }

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={INTRO_DURATION_IN_FRAMES}
        fps={FPS}
        {...FULL_HD}
      />
      <Composition
        id="BackgroundParticles"
        component={BackgroundParticles}
        durationInFrames={PARTICLES_DURATION}
        fps={FPS}
        {...FULL_HD}
      />
      <Composition
        id="BackgroundLightSweep"
        component={BackgroundLightSweep}
        durationInFrames={LIGHT_SWEEP_DURATION}
        fps={FPS}
        {...FULL_HD}
      />
      <Composition
        id="BackgroundFog"
        component={BackgroundFog}
        durationInFrames={FOG_DURATION}
        fps={FPS}
        {...FULL_HD}
      />
      <Composition
        id="BackgroundWaves"
        component={BackgroundWaves}
        durationInFrames={WAVES_DURATION}
        fps={FPS}
        {...FULL_HD}
      />
    </>
  )
}
