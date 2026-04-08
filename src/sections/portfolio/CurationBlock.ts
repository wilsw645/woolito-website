import Swiper from 'swiper'
import { FreeMode, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import type { CurationTheme } from '@/types'
import { createWorkCard } from './WorkCard'
import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function createCurationBlock(theme: CurationTheme): HTMLElement {
  const section = document.createElement('section')
  section.className = 'curation'
  section.id = theme.id

  section.innerHTML = `
    <div class="curation__head">
      <div class="curation__title-wrap">
        <div class="curation__accent" style="background:${theme.accentColor}"></div>
        <div>
          <h2 class="curation__title">${theme.title}</h2>
          ${theme.subtitle ? `<p class="curation__subtitle">${theme.subtitle}</p>` : ''}
        </div>
      </div>
      <a href="${theme.seeMoreUrl}" class="curation__see-more">看更多 →</a>
    </div>
    <div class="swiper curation-swiper-${theme.id}">
      <div class="swiper-wrapper"></div>
    </div>
  `

  const wrapper = section.querySelector('.swiper-wrapper')!
  theme.cards.forEach((card) => {
    const cardEl = createWorkCard(card)
    wrapper.appendChild(cardEl)
  })

  // Init Swiper after DOM insertion (deferred via requestAnimationFrame)
  requestAnimationFrame(() => {
    new Swiper(`.curation-swiper-${theme.id}`, {
      modules: [FreeMode, A11y, Keyboard],
      slidesPerView: 1.4,
      spaceBetween: 16,
      freeMode: { enabled: true, momentum: true, momentumRatio: 0.5 },
      grabCursor: true,
      keyboard: { enabled: true },
      a11y: { prevSlideMessage: '上一個', nextSlideMessage: '下一個' },
      breakpoints: {
        768:  { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3,   spaceBetween: 24 },
        1280: { slidesPerView: 3.5, spaceBetween: 28 },
      },
    })
  })

  // Scroll entrance animations
  const titleEl = section.querySelector<HTMLElement>('.curation__title')!
  const cards = section.querySelectorAll<HTMLElement>('.work-card')

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(titleEl, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        delay: 0.2,
        duration: 0.5,
        ease: 'power2.out',
      })
    },
  })

  return section
}
