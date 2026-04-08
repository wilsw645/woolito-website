import { portfolioThemes } from '@/data/portfolio'
import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function initAllWorks() {
  const section = document.querySelector<HTMLElement>('#all-works')
  if (!section) return

  const grid = section.querySelector('.all-works__grid')!
  portfolioThemes.forEach((theme) => {
    theme.cards.forEach((card) => {
      const btn = document.createElement('button')
      btn.className = 'work-card'
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
          <p class="work-card__theme-tag">${theme.title}</p>
        </div>
      `
      btn.style.opacity = '0'
      btn.style.transform = 'translateY(30px)'
      btn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('woolito:openModal', {
          detail: { videoUrl: card.videoUrl, videoType: card.videoType },
        }))
      })
      grid.appendChild(btn)
    })
  })

  const cards = section.querySelectorAll<HTMLElement>('.work-card')
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1, y: 0,
        stagger: { each: 0.06, from: 'start' },
        duration: 0.45,
        ease: 'power2.out',
      })
    },
  })
}
