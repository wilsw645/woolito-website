import '@/styles/main.scss'

import { initLenis } from '@/animation/lenis-config'
import { initNavBar } from '@/components/NavBar'
import { initHeroSection } from '@/sections/hero/HeroSection'
import { initPortfolioSection } from '@/sections/portfolio/PortfolioSection'
import { initVideoModal } from '@/sections/portfolio/VideoModal'
import { initContactSection } from '@/sections/contact/ContactSection'

// Initialize smooth scroll first
initLenis()

// Then mount all sections
initNavBar()
initHeroSection()
initPortfolioSection()
initVideoModal()
initContactSection()
