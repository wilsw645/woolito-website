import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Scroll normalization for consistent mobile behavior
ScrollTrigger.normalizeScroll(true)

// Custom easings
CustomEase.create('converge', 'M0,0 C0.14,0 0.09,1 1,1')   // fast approach, sharp stop
CustomEase.create('explode', 'M0,0 C0.2,0 0,1 1,1')          // slow start, fast exit
CustomEase.create('cinematic', 'M0,0 C0.37,0 0.63,1 1,1')    // smooth s-curve

export { gsap, ScrollTrigger, CustomEase }
