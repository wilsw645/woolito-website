export interface WorkCard {
  id: string
  title: string
  client?: string
  thumbnail: string
  videoUrl: string
  videoType: 'youtube' | 'local'
  tags?: string[]
}

export interface CurationTheme {
  id: string
  title: string
  subtitle?: string
  accentColor: string
  cards: WorkCard[]
  seeMoreUrl: string
}
