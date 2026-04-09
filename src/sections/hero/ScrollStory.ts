import { gsap, ScrollTrigger } from '@/animation/gsap-config'
import { ELEMENTS, MKT_SHAPES } from './SceneElements'

export function initScrollStory(container: HTMLElement) {
  const canvas = container.querySelector<HTMLElement>('.hero-canvas')!
  const scene = container.querySelector<HTMLElement>('.hero-scene')!
  const text1 = container.querySelector<HTMLElement>('.hero-text--1')!
  const text2 = container.querySelector<HTMLElement>('.hero-text--2')!
  const scrollHint = container.querySelector<HTMLElement>('.scroll-hint')!

  const sceneEls = ELEMENTS.map(def => scene.querySelector<HTMLElement>(`#${def.id}`)!).filter(Boolean)
  const mktShapes = MKT_SHAPES.map(def => canvas.querySelector<HTMLElement>(`#${def.id}`)!).filter(Boolean)

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set([sceneEls, text1, text2], { opacity: 1 })
    return
  }

  // Initial state
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

  gsap.set(mktShapes, { scale: 0, opacity: 0 })
  gsap.set(text1, { opacity: 1, y: 0 })  // 進入頁面就可見
  gsap.set(text2, { opacity: 0, y: 40 })

  const tl = gsap.timeline({ paused: true })

  // ─────────────────────────────────────────────────────────────
  // ACT 1 (0–20%): Elements fly in from offscreen
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

  // Text 1 fades out as elements fly in
  tl.to(text1, { opacity: 0, y: -40, ease: 'power2.in', duration: 0.12 }, 0.15)

  // ─────────────────────────────────────────────────────────────
  // ACT 3 (50–65%): Elements cluster and disappear
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

  // ─────────────────────────────────────────────────────────────
  // ACT 4 (65–78%): Text 2 fades in
  // ─────────────────────────────────────────────────────────────
  tl.fromTo(text2,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.10 },
    0.65,
  )

  // ─────────────────────────────────────────────────────────────
  // ACT 5 (78–100%): Marketing shapes explode outward
  // ─────────────────────────────────────────────────────────────
  tl.to(text2, { opacity: 0, duration: 0.05 }, 0.76)

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
