import { gsap, ScrollTrigger } from '@/animation/gsap-config'
import { ELEMENTS, MKT_SHAPES } from './SceneElements'

export function initScrollStory(container: HTMLElement) {
  const canvas = container.querySelector<HTMLElement>('.hero-canvas')!
  const scene = container.querySelector<HTMLElement>('.hero-scene')!
  const videoScreen = container.querySelector<HTMLElement>('.video-screen')!
  const video = videoScreen.querySelector('video')
  const text1 = container.querySelector<HTMLElement>('.hero-text--1')!
  const text2 = container.querySelector<HTMLElement>('.hero-text--2')!
  const scrollHint = container.querySelector<HTMLElement>('.scroll-hint')!

  // Gather elements
  const sceneEls = ELEMENTS.map(def => scene.querySelector<HTMLElement>(`#${def.id}`)!).filter(Boolean)
  const mktShapes = MKT_SHAPES.map(def => canvas.querySelector<HTMLElement>(`#${def.id}`)!).filter(Boolean)

  // Skip heavy animations on reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set([sceneEls, text1, text2, videoScreen], { opacity: 1 })
    return
  }

  // Initial state: all elements invisible at their offscreen positions
  ELEMENTS.forEach((def, i) => {
    const el = sceneEls[i]
    if (!el) return
    gsap.set(el, {
      xPercent: def.ix,
      yPercent: def.iy,
      rotation: def.ir,
      scale: def.is,
      opacity: 0,
    })
  })

  gsap.set(videoScreen, { scale: 0, opacity: 0 })
  gsap.set(mktShapes, { scale: 0, opacity: 0 })
  gsap.set(text1, { opacity: 0, y: -20 })  // 從上方滑入
  gsap.set(text2, { opacity: 0, y: 40 })

  // Master timeline (progress 0→1 driven by scroll)
  const tl = gsap.timeline({ paused: true })

  // ─────────────────────────────────────────────────────────────
  // ACT 1 (0–20%): Elements scatter in from offscreen
  // ─────────────────────────────────────────────────────────────
  tl.to(sceneEls, {
    xPercent: (i) => ELEMENTS[i]?.cx ?? 0,
    yPercent: (i) => ELEMENTS[i]?.cy ?? 0,
    rotation: (i) => ELEMENTS[i]?.cr ?? 0,
    scale: 1,
    opacity: 1,
    stagger: { each: 0.02, from: 'random' },
    ease: 'power2.out',
    duration: 0.20,
  }, 0)

  // Fade out scroll hint
  tl.to(scrollHint, { opacity: 0, duration: 0.05 }, 0.02)

  // ─────────────────────────────────────────────────────────────
  // ACT 2 (20–50%): Elements converge to center
  // ─────────────────────────────────────────────────────────────
  tl.to(sceneEls, {
    xPercent: (i) => (ELEMENTS[i]?.cx ?? 0) * 0.3,
    yPercent: (i) => (ELEMENTS[i]?.cy ?? 0) * 0.3,
    rotation: 0,
    stagger: { each: 0.015, from: 'edges' },
    ease: 'converge',
    duration: 0.28,
  }, 0.20)

  // Text overlay 1 — 從一開始就出現（0%），在元素開始飛入時同步淡入
  tl.fromTo(text1,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.12 },
    0.02,
  )

  // ─────────────────────────────────────────────────────────────
  // ACT 3 (50–65%): Elements cluster + video screen reveals
  // ─────────────────────────────────────────────────────────────
  tl.to(sceneEls, {
    xPercent: 0,
    yPercent: 0,
    scale: 0,
    opacity: 0,
    stagger: { each: 0.01, from: 'center' },
    ease: 'power3.in',
    duration: 0.14,
  }, 0.50)

  // Text 1 fades out — 往上飄走，配合元素聚攏動作
  tl.to(text1, { opacity: 0, y: -30, ease: 'power2.in', duration: 0.08 }, 0.46)

  // Video screen bursts out
  tl.fromTo(videoScreen,
    { scale: 0.05, opacity: 0 },
    { scale: 1, opacity: 1, ease: 'expo.out', duration: 0.14 },
    0.54,
  )

  // ─────────────────────────────────────────────────────────────
  // ACT 4 (65–75%): Video holds, text 2 fades in
  // ─────────────────────────────────────────────────────────────
  // Autoplay video when it's visible (muted, required by browsers)
  if (video) {
    tl.add(() => { video.play().catch(() => {}) }, 0.65)
  }

  tl.fromTo(text2,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.08 },
    0.78,
  )

  // ─────────────────────────────────────────────────────────────
  // ACT 5 (75–100%): Video retracts, marketing shapes fly out
  // ─────────────────────────────────────────────────────────────
  tl.to(videoScreen, {
    scale: 0.2,
    opacity: 0,
    ease: 'power3.in',
    duration: 0.08,
  }, 0.76)

  tl.to(text2, { opacity: 0, duration: 0.05 }, 0.76)

  // Marketing shapes explode outward
  MKT_SHAPES.forEach((def, i) => {
    const el = mktShapes[i]
    if (!el) return
    tl.fromTo(el,
      { scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 },
      {
        scale: 1,
        opacity: 1,
        x: def.tx,
        y: def.ty,
        rotation: def.r,
        ease: 'expo.out',
        duration: 0.22,
      },
      0.78 + i * 0.015,
    )
  })

  // Final text 2 back in with new message context
  tl.to(text2, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.08 }, 0.82)

  // ─────────────────────────────────────────────────────────────
  // ScrollTrigger: pin canvas, drive timeline with scroll
  // ─────────────────────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    pin: canvas,
    scrub: 1.5,
    onUpdate: (self) => {
      tl.progress(self.progress)
    },
  })
}
