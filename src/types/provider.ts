import type {GameCategory} from './game'

export interface Provider {
	id: string
	slug: string
	name: string
	logo: string 
	gameCount: number
	categories: GameCategory[]
	founded?: string
	headquarters?: string
	description: string
	longDescription?: string
	features: string[]
	isPopular: boolean
}
