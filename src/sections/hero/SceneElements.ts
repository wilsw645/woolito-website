export interface ElementDef {
  id: string
  cls: string       // CSS class (scene-el--circle, etc.)
  w: number         // width in px
  h: number         // height in px
  // Initial position (offscreen, % of viewport)
  ix: number        // xPercent from center
  iy: number        // yPercent from center
  ir: number        // initial rotation
  is: number        // initial scale
  // Converged position (near center)
  cx: number
  cy: number
  cr: number
  z: number         // z-index
}

export const ELEMENTS: ElementDef[] = [
  // Large shapes — fly in from corners
  { id: 'e1',  cls: 'scene-el--circle',  w: 80,  h: 80,  ix: -120, iy: -80,  ir: 0,    is: 0, cx: -18, cy: -14, cr: 0,   z: 3 },
  { id: 'e2',  cls: 'scene-el--square',  w: 60,  h: 60,  ix:  120, iy: -80,  ir: 45,   is: 0, cx:  20, cy: -16, cr: 12,  z: 2 },
  { id: 'e3',  cls: 'scene-el--ring',    w: 100, h: 100, ix: -130, iy:  70,  ir: 0,    is: 0, cx: -24, cy:  18, cr: 0,   z: 1 },
  { id: 'e4',  cls: 'scene-el--square',  w: 50,  h: 50,  ix:  130, iy:  70,  ir: -20,  is: 0, cx:  22, cy:  20, cr: -8,  z: 2 },

  // Medium shapes — fly in from sides
  { id: 'e5',  cls: 'scene-el--dot',     w: 40,  h: 40,  ix: -140, iy: -20,  ir: 0,    is: 0, cx:  -8, cy: -8,  cr: 0,   z: 4 },
  { id: 'e6',  cls: 'scene-el--dot',     w: 30,  h: 30,  ix:  140, iy:  10,  ir: 0,    is: 0, cx:   8, cy:  6,  cr: 0,   z: 4 },
  { id: 'e7',  cls: 'scene-el--ring',    w: 60,  h: 60,  ix:    0, iy: -90,  ir: 0,    is: 0, cx:  -4, cy: -20, cr: 15,  z: 2 },
  { id: 'e8',  cls: 'scene-el--circle',  w: 24,  h: 24,  ix:    0, iy:  90,  ir: 0,    is: 0, cx:   2, cy:  18, cr: 0,   z: 4 },

  // Lines
  { id: 'e9',  cls: 'scene-el--line',    w: 80,  h: 4,   ix: -110, iy: -50,  ir: -30,  is: 0, cx: -16, cy: -10, cr: -5,  z: 3 },
  { id: 'e10', cls: 'scene-el--line',    w: 60,  h: 3,   ix:  110, iy:  50,  ir:  20,  is: 0, cx:  14, cy:  12, cr:  8,  z: 3 },
  { id: 'e11', cls: 'scene-el--line',    w: 100, h: 3,   ix:   60, iy: -95,  ir: 60,   is: 0, cx:   6, cy: -22, cr: 60,  z: 1 },

  // Letter fragments
  { id: 'e12', cls: 'scene-el--letter',  w: 60,  h: 60,  ix: -100, iy:  60,  ir: -15,  is: 0, cx: -20, cy:  16, cr: 0,   z: 1 },
  { id: 'e13', cls: 'scene-el--letter',  w: 60,  h: 60,  ix:  100, iy: -60,  ir:  10,  is: 0, cx:  18, cy: -18, cr: 0,   z: 1 },

  // Play icon
  { id: 'e14', cls: 'scene-el--play',    w: 0,   h: 0,   ix:   50, iy:  80,  ir:   0,  is: 0, cx:  10, cy:  24, cr: 0,   z: 5 },

  // Small dots (particle cluster)
  { id: 'e15', cls: 'scene-el--dot',     w: 16,  h: 16,  ix: -150, iy: -10,  ir: 0,    is: 0, cx:  -6, cy:  -4, cr: 0,   z: 5 },
  { id: 'e16', cls: 'scene-el--dot',     w: 12,  h: 12,  ix:  150, iy: -30,  ir: 0,    is: 0, cx:   6, cy:  -6, cr: 0,   z: 5 },
]

// Final positions for marketing material shapes (after explosion)
export interface MktShapeDef {
  id: string
  cls: string
  // Final position relative to center (vw/vh units)
  tx: string   // translateX (CSS value)
  ty: string   // translateY (CSS value)
  r: number    // rotation
}

export const MKT_SHAPES: MktShapeDef[] = [
  { id: 'm1', cls: 'mkt-shape--social',   tx: '-45vw', ty: '-25vh', r: -8  },
  { id: 'm2', cls: 'mkt-shape--banner',   tx:  '10vw', ty: '-32vh', r:  4  },
  { id: 'm3', cls: 'mkt-shape--brochure', tx:  '38vw', ty: '-18vh', r:  6  },
  { id: 'm4', cls: 'mkt-shape--reel',     tx: '-38vw', ty:  '20vh', r: -5  },
  { id: 'm5', cls: 'mkt-shape--email',    tx:  '28vw', ty:  '22vh', r:  3  },
]
