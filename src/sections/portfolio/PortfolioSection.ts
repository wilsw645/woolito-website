import { portfolioThemes } from '@/data/portfolio'
import { createCurationBlock } from './CurationBlock'

export function initPortfolioSection() {
  const container = document.querySelector<HTMLElement>('#portfolio')
  if (!container) return

  portfolioThemes.forEach((theme) => {
    const block = createCurationBlock(theme)
    container.appendChild(block)
  })
}
