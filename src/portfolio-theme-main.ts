import '@/styles/main.scss'

import { initLenis } from '@/animation/lenis-config'
import { initNavBar } from '@/components/NavBar'
import { initThemePage } from '@/sections/portfolio/ThemePage'
import { initVideoModal } from '@/sections/portfolio/VideoModal'
import { initContactSection } from '@/sections/contact/ContactSection'

initLenis()
initNavBar()
initThemePage()
initVideoModal()
initContactSection()
