import { portfolioThemes } from '@/data/portfolio'
import { gsap, ScrollTrigger } from '@/animation/gsap-config'

export function initThemePage() {
  const main = document.querySelector<HTMLElement>('main[data-theme]')
  if (!main) return

  const themeId = main.dataset.theme!
  const theme = portfolioThemes.find(t => t.id === themeId)
  if (!theme) return

  // Fill title area
  const titleEl = main.querySelector<HTMLElement>('.theme-hero__title')
  const subtitleEl = main.querySelector<HTMLElement>('.theme-hero__subtitle')
  const accentEl = main.querySelector<HTMLElement>('.theme-hero__accent')
  if (titleEl) titleEl.textContent = theme.title
  if (subtitleEl) subtitleEl.textContent = theme.subtitle ?? ''
  if (accentEl) accentEl.style.background = theme.accentColor

  // Fill works grid
  const grid = main.querySelector<HTMLElement>('.theme-works__grid')
  if (!grid) return

  theme.cards.forEach((card) => {
    const btn = document.createElement('button')
    btn.className = 'work-card'
    btn.style.opacity = '0'
    btn.style.transform = 'translateY(40px)'
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
      </div>
    `
    btn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('woolito:openModal', {
        detail: { videoUrl: card.videoUrl, videoType: card.videoType },
      }))
    })
    grid.appendChild(btn)
  })

  // Entrance animation
  const cards = grid.querySelectorAll<HTMLElement>('.work-card')
  ScrollTrigger.create({
    trigger: grid,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1, y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      })
    },
  })
}
