export function initNavBar() {
  const navbar = document.querySelector<HTMLElement>('.navbar')
  if (!navbar) return

  // ── Scroll: add background when scrolled ─────────────────────
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // ── Hamburger button (inject into DOM) ────────────────────────
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

  // ── Mobile overlay backdrop ───────────────────────────────────
  const backdrop = document.createElement('div')
  backdrop.className = 'mobile-nav-backdrop'
  document.body.appendChild(backdrop)

  // ── Toggle helper ─────────────────────────────────────────────
  const setOpen = (open: boolean) => {
    navbar.classList.toggle('menu-open', open)
    backdrop.classList.toggle('is-visible', open)
    hamburger.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
  }

  hamburger.addEventListener('click', () => {
    setOpen(!navbar.classList.contains('menu-open'))
  })

  backdrop.addEventListener('click', () => setOpen(false))

  // Close on any nav link click
  navbar.querySelectorAll('.navbar__nav a').forEach(a => {
    a.addEventListener('click', () => setOpen(false))
  })

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}
