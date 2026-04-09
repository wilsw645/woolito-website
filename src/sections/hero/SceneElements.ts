export interface ElementDef {
  id: string
  cls: string
  w: number
  h: number
  ix: string   // initial x — CSS viewport-unit value (well outside screen)
  iy: string   // initial y
  ir: number   // initial rotation
  is: number   // initial scale (start big, shrinks to 0 at center)
  z: number
}

export const ELEMENTS: ElementDef[] = [
  // Corners
  { id: 'e1',  cls: 'scene-el--circle',  w: 80,  h: 80,  ix: '-115vw', iy: '-70vh', ir: 0,   is: 2.2, z: 3 },
  { id: 'e2',  cls: 'scene-el--square',  w: 60,  h: 60,  ix:  '115vw', iy: '-70vh', ir: 45,  is: 2.0, z: 2 },
  { id: 'e3',  cls: 'scene-el--ring',    w: 100, h: 100, ix: '-115vw', iy:  '70vh', ir: 0,   is: 2.4, z: 1 },
  { id: 'e4',  cls: 'scene-el--square',  w: 50,  h: 50,  ix:  '115vw', iy:  '70vh', ir: -20, is: 1.8, z: 2 },
  // Sides
  { id: 'e5',  cls: 'scene-el--dot',     w: 40,  h: 40,  ix: '-125vw', iy: '-22vh', ir: 0,   is: 1.6, z: 4 },
  { id: 'e6',  cls: 'scene-el--dot',     w: 30,  h: 30,  ix:  '125vw', iy:  '18vh', ir: 0,   is: 1.5, z: 4 },
  { id: 'e7',  cls: 'scene-el--ring',    w: 60,  h: 60,  ix:   '15vw', iy: '-95vh', ir: 0,   is: 1.8, z: 2 },
  { id: 'e8',  cls: 'scene-el--circle',  w: 24,  h: 24,  ix:  '-12vw', iy:  '95vh', ir: 0,   is: 1.4, z: 4 },
  // Lines
  { id: 'e9',  cls: 'scene-el--line',    w: 80,  h: 4,   ix: '-95vw',  iy: '-55vh', ir: -30, is: 1.8, z: 3 },
  { id: 'e10', cls: 'scene-el--line',    w: 60,  h: 3,   ix:  '95vw',  iy:  '58vh', ir:  20, is: 1.6, z: 3 },
  { id: 'e11', cls: 'scene-el--line',    w: 100, h: 3,   ix:  '55vw',  iy: '-95vh', ir:  60, is: 1.7, z: 1 },
  // Letters
  { id: 'e12', cls: 'scene-el--letter',  w: 60,  h: 60,  ix: '-105vw', iy:  '62vh', ir: -15, is: 2.0, z: 1 },
  { id: 'e13', cls: 'scene-el--letter',  w: 60,  h: 60,  ix:  '105vw', iy: '-62vh', ir:  10, is: 2.0, z: 1 },
  // Play icon
  { id: 'e14', cls: 'scene-el--play',    w: 0,   h: 0,   ix:  '85vw',  iy:  '78vh', ir:   0, is: 1.4, z: 5 },
  // Small accent dots
  { id: 'e15', cls: 'scene-el--dot',     w: 16,  h: 16,  ix: '-120vw', iy: '-18vh', ir: 0,   is: 1.2, z: 5 },
  { id: 'e16', cls: 'scene-el--dot',     w: 12,  h: 12,  ix:  '120vw', iy: '-38vh', ir: 0,   is: 1.4, z: 5 },
]

export interface MktShapeDef {
  id: string
  cls: string
  tx: string
  ty: string
  r: number
}

export const MKT_SHAPES: MktShapeDef[] = [
  { id: 'm1', cls: 'mkt-shape--social',   tx: '-45vw', ty: '-25vh', r: -8 },
  { id: 'm2', cls: 'mkt-shape--banner',   tx:  '10vw', ty: '-32vh', r:  4 },
  { id: 'm3', cls: 'mkt-shape--brochure', tx:  '38vw', ty: '-18vh', r:  6 },
  { id: 'm4', cls: 'mkt-shape--reel',     tx: '-38vw', ty:  '20vh', r: -5 },
  { id: 'm5', cls: 'mkt-shape--email',    tx:  '28vw', ty:  '22vh', r:  3 },
]
