export function initNavBar() {
  const navbar = document.querySelector<HTMLElement>('.navbar')
  if (!navbar) return

  // Add scrolled class after 60px scroll
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
