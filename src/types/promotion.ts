export type PromoType =
	| 'welcome'
	| 'reload'
	| 'cashback'
	| 'vip'
	| 'referral'
	| 'weekend'
	| 'free'

export interface Promotion {
	id: string
	type: PromoType
	title: string
	subtitle: string
	description: string
	terms: string[]
	amount: string // e.g. "€5,000" or "200 Free Spins"
	badge?: string
	minDeposit: number
	wagering: string // e.g. "35x"
	expires?: string // ISO date string
	gradient: string // Tailwind/CSS gradient classes or inline
	isPopular: boolean
	isNew: boolean
}
