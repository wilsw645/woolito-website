import '@/styles/main.scss'

import { initLenis } from '@/animation/lenis-config'
import { initNavBar } from '@/components/NavBar'
import { initFeaturedSection } from '@/sections/portfolio/FeaturedSection'
import { initPortfolioSection } from '@/sections/portfolio/PortfolioSection'
import { initAllWorks } from '@/sections/portfolio/AllWorks'
import { initVideoModal } from '@/sections/portfolio/VideoModal'
import { initContactSection } from '@/sections/contact/ContactSection'

initLenis()
initNavBar()
initFeaturedSection()    // 精選作品（頁首）
initPortfolioSection()   // 4 大主題策展
initAllWorks()           // 所有作品網格
initVideoModal()
initContactSection()
