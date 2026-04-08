import { ELEMENTS, MKT_SHAPES } from './SceneElements'
import { initScrollStory } from './ScrollStory'

function buildScene(sceneEl: HTMLElement) {
  ELEMENTS.forEach((def) => {
    const el = document.createElement('div')
    el.id = def.id
    el.className = `scene-el ${def.cls}`
    if (def.w) el.style.width = `${def.w}px`
    if (def.h && def.cls !== 'scene-el--triangle' && def.cls !== 'scene-el--play') {
      el.style.height = `${def.h}px`
    }
    el.style.zIndex = String(def.z)
    el.style.position = 'absolute'
    el.style.top = '50%'
    el.style.left = '50%'
    el.style.transform = 'translate(-50%, -50%)'

    // Letter content
    if (def.cls === 'scene-el--letter') {
      const letters = ['W', 'O', 'L', 'I', 'T', 'O']
      const idx = ELEMENTS.filter(e => e.cls === 'scene-el--letter').indexOf(def)
      el.textContent = letters[idx % letters.length] ?? 'W'
    }

    sceneEl.appendChild(el)
  })
}

function buildMktShapes(canvasEl: HTMLElement) {
  MKT_SHAPES.forEach((def) => {
    const el = document.createElement('div')
    el.id = def.id
    el.className = `mkt-shape ${def.cls}`
    el.style.position = 'absolute'
    el.style.left = '50%'
    el.style.top = '50%'
    canvasEl.appendChild(el)
  })
}

export function initHeroSection() {
  const container = document.querySelector<HTMLElement>('#hero')!
  if (!container) return

  const scene = container.querySelector<HTMLElement>('.hero-scene')!
  const canvas = container.querySelector<HTMLElement>('.hero-canvas')!

  buildScene(scene)
  buildMktShapes(canvas)
  initScrollStory(container)
}
