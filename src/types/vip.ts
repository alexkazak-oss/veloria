export type VIPTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface VIPLevel {
	tier: VIPTier
	name: string
	minPoints: number
	maxPoints?: number
	color: string // Tailwind/CSS color class
	gradient: string
	icon: string // Unicode or emoji for demo
	cashbackRate: number // percentage
	withdrawLimit: number // per week in EUR
	personalManager: boolean
	birthdayBonus: boolean
	exclusiveGames: boolean
	bonusMultiplier: number // e.g. 1.5
	features: string[]
}
