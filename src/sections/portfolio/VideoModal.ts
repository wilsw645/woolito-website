import { gsap } from '@/animation/gsap-config'

let modalEl: HTMLElement | null = null
let contentEl: HTMLElement | null = null
let videoWrapEl: HTMLElement | null = null
let isOpen = false

export function initVideoModal() {
  modalEl = document.getElementById('video-modal')
  if (!modalEl) return

  contentEl = modalEl.querySelector('.video-modal__content')
  videoWrapEl = modalEl.querySelector('.video-modal__video-wrap')

  // Close on backdrop click
  modalEl.querySelector('.video-modal__backdrop')?.addEventListener('click', closeModal)

  // Close button
  modalEl.querySelector('.video-modal__close')?.addEventListener('click', closeModal)

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeModal()
  })

  // Listen for open events
  document.addEventListener('woolito:openModal', (e) => {
    const { videoUrl, videoType } = (e as CustomEvent).detail
    openModal(videoUrl, videoType)
  })
}

function openModal(videoUrl: string, videoType: 'youtube' | 'local') {
  if (!modalEl || !videoWrapEl || !contentEl) return

  // Clear previous content
  videoWrapEl.innerHTML = ''

  if (videoType === 'youtube') {
    const iframe = document.createElement('iframe')
    iframe.src = `${videoUrl}?autoplay=1&rel=0`
    iframe.allow = 'autoplay; fullscreen'
    iframe.allowFullscreen = true
    videoWrapEl.appendChild(iframe)
  } else {
    const video = document.createElement('video')
    video.src = videoUrl
    video.controls = true
    video.autoplay = true
    video.playsInline = true
    videoWrapEl.appendChild(video)
  }

  modalEl.classList.add('is-open')
  isOpen = true
  document.body.style.overflow = 'hidden'

  gsap.fromTo(modalEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' },
  )
  gsap.fromTo(contentEl,
    { scale: 0.92, y: 20 },
    { scale: 1, y: 0, duration: 0.4, ease: 'expo.out' },
  )
}

function closeModal() {
  if (!modalEl || !contentEl || !videoWrapEl) return

  gsap.to(contentEl, { scale: 0.95, y: 10, duration: 0.25, ease: 'power2.in' })
  gsap.to(modalEl, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      modalEl!.classList.remove('is-open')
      videoWrapEl!.innerHTML = ''
      document.body.style.overflow = ''
      isOpen = false
    },
  })
}
