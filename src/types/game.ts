export type GameCategory =
	| 'slots'
	| 'live-casino'
	| 'table-games'
	| 'jackpots'
	| 'crash'

export type GameTag = 'hot' | 'new' | 'featured'

export interface Game {
	id: string
	title: string
	provider: string
	providerSlug: string
	category: GameCategory
	tags: GameTag[]
	rtp: number
	isLive: boolean
	thumbnail: string // CSS gradient string or placeholder path
	players?: number // for live games: current players
	minBet?: number
	maxBet?: number
	description?: string
}
