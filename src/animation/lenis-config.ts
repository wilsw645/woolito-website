import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap-config'

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  })

  // Sync Lenis RAF with GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Prevent GSAP lag smoothing from fighting Lenis
  gsap.ticker.lagSmoothing(0)

  // Tell ScrollTrigger about Lenis scroll position
  lenis.on('scroll', ScrollTrigger.update)

  lenisInstance = lenis
  return lenis
}

export function getLenis(): Lenis | null {
  return lenisInstance
}
