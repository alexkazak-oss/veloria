export type TournamentStatus = 'active' | 'upcoming' | 'finished'

export interface LeaderboardEntry {
	rank: number
	playerName: string
	score: number
	prize: string
	avatar: string // initials or CSS gradient
}

export interface Tournament {
	id: string
	title: string
	description: string
	status: TournamentStatus
	prizePool: string           
	playerCount: number
	maxPlayers: number
	startDate: string // ISO date
	endDate: string // ISO date
	games: string[] // game IDs
	gradient: string
	rules: string[]
	leaderboard: LeaderboardEntry[]
	minBet?: number
}
