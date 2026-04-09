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

  // ── Initial state ───────────────────────────────────────────
  // Elements start BIG and far offscreen
  ELEMENTS.forEach((def, i) => {
    const el = sceneEls[i]
    if (!el) return
    gsap.set(el, {
      x: def.ix,
      y: def.iy,
      rotation: def.ir,
      scale: def.is,
      opacity: 0,
    })
  })

  gsap.set(mktShapes, { scale: 0, opacity: 0 })
  // xPercent/yPercent centres each text without GSAP overwriting the CSS transform
  gsap.set(text1, { xPercent: -50, yPercent: -50, opacity: 1 })
  gsap.set(text2, { xPercent: -50, yPercent: -50, opacity: 0, y: 40 })

  const tl = gsap.timeline({ paused: true })

  // ── ACT 1-2 (0–68%): Elements fly in from far, big→small, converge to center ──
  // Stagger so they don't all arrive at the exact same time
  const staggerConfig = { each: 0.015, from: 'random' as const }

  // Quick opacity fade-in as each element enters
  tl.to(sceneEls, {
    opacity: 1,
    duration: 0.08,
    stagger: staggerConfig,
    ease: 'none',
  }, 0)

  // Main convergence: position → center, scale → 0, rotation → 0
  tl.to(sceneEls, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 0,
    stagger: staggerConfig,
    ease: 'power2.in',   // slow start (big & far), accelerates into center
    duration: 0.58,
  }, 0)

  // Scroll hint fades out immediately
  tl.to(scrollHint, { opacity: 0, duration: 0.06 }, 0.02)

  // Text 1 fades while elements are mid-journey
  tl.to(text1, { opacity: 0, y: -40, ease: 'power2.in', duration: 0.10 }, 0.28)

  // ── ACT 3 (68–78%): Text 2 reveals after elements disappear ──
  tl.to(text2,
    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.08 },
    0.68,
  )

  // ── ACT 4 (78–100%): Marketing shapes explode outward ────────
  tl.to(text2, { opacity: 0, duration: 0.04 }, 0.76)

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

  // ── ScrollTrigger: pin canvas, drive timeline ─────────────────
  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    pin: canvas,
    scrub: 1.5,
    onUpdate: (self) => tl.progress(self.progress),
  })
}
