import { featuredCards } from '@/data/portfolio'
import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function initFeaturedSection() {
  const section = document.querySelector<HTMLElement>('#featured')
  if (!section) return

  const container = section.querySelector('.featured__grid')!
  featuredCards.forEach((card) => {
    const btn = document.createElement('button')
    btn.className = 'work-card featured__card'
    btn.innerHTML = `
      <figure>
        <img class="work-card__thumb" src="${card.thumbnail}" alt="${card.title}" loading="lazy" />
        <div class="work-card__overlay">
          <div class="work-card__play" aria-hidden="true"></div>
        </div>
      </figure>
      <div class="work-card__info">
        <p class="work-card__title">${card.title}</p>
        ${card.client ? `<p class="work-card__client">${card.client}</p>` : ''}
        <p class="work-card__theme-tag">${(card as typeof card & { themeTitle: string }).themeTitle}</p>
      </div>
    `
    btn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('woolito:openModal', {
        detail: { videoUrl: card.videoUrl, videoType: card.videoType },
      }))
    })
    container.appendChild(btn)
  })

  const cards = section.querySelectorAll<HTMLElement>('.featured__card')
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(cards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' })
    },
  })
}
