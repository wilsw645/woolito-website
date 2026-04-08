import type { WorkCard } from '@/types'

export function createWorkCard(card: WorkCard): HTMLElement {
  const btn = document.createElement('button')
  btn.className = 'work-card swiper-slide'

  btn.innerHTML = `
    <figure>
      <img
        class="work-card__thumb"
        src="${card.thumbnail}"
        alt="${card.title}"
        loading="lazy"
      />
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

  return btn
}
