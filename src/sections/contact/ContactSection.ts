import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function initContactSection() {
  const section = document.querySelector<HTMLElement>('#contact')
  if (!section) return

  const textEl = section.querySelector<HTMLElement>('.contact__text')
  const formEl = section.querySelector<HTMLElement>('.contact__form-wrap')
  const linksEl = section.querySelector<HTMLElement>('.contact__links')

  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      if (textEl) {
        gsap.to(textEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      }
      const rightEl = formEl ?? linksEl
      if (rightEl) {
        gsap.to(rightEl, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' })
      }
    },
  })
}
