import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function initContactSection() {
  const section = document.querySelector<HTMLElement>('#contact')
  if (!section) return

  const textEl = section.querySelector<HTMLElement>('.contact__text')
  const linksEl = section.querySelector<HTMLElement>('.contact__links')

  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      if (textEl) {
        gsap.to(textEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      }
      if (linksEl) {
        gsap.to(linksEl, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' })
      }
    },
  })
}
