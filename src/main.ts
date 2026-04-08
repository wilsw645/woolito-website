import '@/styles/main.scss'

import { initLenis } from '@/animation/lenis-config'
import { initNavBar } from '@/components/NavBar'
import { initHeroSection } from '@/sections/hero/HeroSection'
import { initContactSection } from '@/sections/contact/ContactSection'

// Initialize smooth scroll first
initLenis()

// Mount sections (portfolio is on /portfolio.html)
initNavBar()
initHeroSection()
initContactSection()
