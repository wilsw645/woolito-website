export function initNavBar() {
  const navbar = document.querySelector<HTMLElement>('.navbar')
  if (!navbar) return

  // ── Scroll: add background when scrolled ─────────────────────
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // ── Hamburger button (injected into navbar) ───────────────────
  const hamburger = document.createElement('button')
  hamburger.className = 'navbar__hamburger'
  hamburger.setAttribute('aria-label', '開啟選單')
  hamburger.setAttribute('aria-expanded', 'false')
  hamburger.innerHTML = `
    <span class="navbar__ham-line"></span>
    <span class="navbar__ham-line"></span>
    <span class="navbar__ham-line"></span>
  `
  navbar.appendChild(hamburger)

  // ── Mobile nav panel (injected at body level, NOT inside navbar)
  // This avoids being trapped by navbar's backdrop-filter containing block
  const panel = document.createElement('div')
  panel.className = 'mobile-nav-panel'
  panel.setAttribute('aria-hidden', 'true')

  // Clone nav links from the desktop nav into the mobile panel
  const desktopNav = navbar.querySelector('.navbar__nav')
  if (desktopNav) {
    const cloned = desktopNav.cloneNode(true) as HTMLElement
    panel.appendChild(cloned)
  }

  document.body.appendChild(panel)

  // ── Toggle ────────────────────────────────────────────────────
  const setOpen = (open: boolean) => {
    hamburger.classList.toggle('is-open', open)
    panel.classList.toggle('is-open', open)
    hamburger.setAttribute('aria-expanded', String(open))
    panel.setAttribute('aria-hidden', String(!open))
    document.body.style.overflow = open ? 'hidden' : ''
  }

  hamburger.addEventListener('click', () => {
    setOpen(!panel.classList.contains('is-open'))
  })

  // Close on any link click inside the panel
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false))
  })

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}
