import type {GameCategory} from '../types/game'
import type {Provider} from '../types/provider'

export const providers: Provider[] = [
	{
		id: 'novaspin',
		slug: 'novaspin',
		name: 'NovaSpin',
		logo: 'NS',
		gameCount: 87,
		categories: ['slots', 'crash'],
		founded: '2014',
		headquarters: 'Malta',
		isPopular: true,
		description:
			'NovaSpin is a premium slot developer renowned for cinematic visuals and innovative bonus mechanics.',
		longDescription:
			"Founded in Malta in 2014, NovaSpin quickly established itself as one of the industry's most innovative studios. Their portfolio spans high-volatility jackpot slots to low-variance casual titles, all sharing the studio's signature cinematic quality and responsive HTML5 architecture. NovaSpin holds RNG certification from two independent testing labs and is licensed across major jurisdictions.",
		features: [
			'RNG Certified',
			'Mobile-First',
			'Buy Bonus Feature',
			'Free Spins',
		],
	},
	{
		id: 'aurumplay',
		slug: 'aurumplay',
		name: 'AurumPlay',
		logo: 'AP',
		gameCount: 64,
		categories: ['slots', 'jackpots'],
		founded: '2011',
		headquarters: 'Gibraltar',
		isPopular: true,
		description:
			'AurumPlay specializes in high-end jackpot and progressive slot experiences for premium operators.',
		longDescription:
			'AurumPlay operates from Gibraltar and powers some of the largest progressive jackpot networks in regulated markets. Their flagship games average RTPs of 96–97% and all titles undergo monthly third-party audits. Their proprietary Link-and-Win jackpot engine connects multiple titles into a shared prize pool, regularly creating multi-million payouts on the demo scale.',
		features: [
			'Progressive Jackpots',
			'Link-and-Win',
			'3rd Party Audited',
			'Multi-language',
		],
	},
	{
		id: 'livearena',
		slug: 'livearena',
		name: 'LiveArena',
		logo: 'LA',
		gameCount: 42,
		categories: ['live-casino'],
		founded: '2016',
		headquarters: 'Latvia',
		isPopular: true,
		description:
			'LiveArena delivers broadcast-quality live dealer games from studios in Riga and Tbilisi.',
		longDescription:
			'LiveArena operates two state-of-the-art studios and provides live dealer games to over 200 operators worldwide. Their game portfolio includes all classic table games plus exclusive game-show formats. Every stream runs in true 4K with sub-500ms latency, ensuring a seamless experience for players across devices.',
		features: [
			'4K Streaming',
			'Multi-Camera',
			'VIP Tables',
			'Game Show Titles',
		],
	},
	{
		id: 'redmatrix',
		slug: 'redmatrix',
		name: 'RedMatrix',
		logo: 'RM',
		gameCount: 55,
		categories: ['slots', 'crash'],
		founded: '2017',
		headquarters: 'Isle of Man',
		isPopular: false,
		description:
			'RedMatrix creates high-energy slot and crash titles with bold visual identities and deep bonus mechanics.',
		longDescription:
			'Based on the Isle of Man, RedMatrix has earned a dedicated following for their unconventional game designs. Every title ships with multiple modifiers, non-standard reel setups, and adaptive volatility options. Their Crash division produces provably-fair multiplier games reviewed by independent auditors.',
		features: [
			'Bold Design',
			'Adaptive Volatility',
			'Provably Fair Crash',
			'Modifier System',
		],
	},
	{
		id: 'spinforge',
		slug: 'spinforge',
		name: 'SpinForge',
		logo: 'SF',
		gameCount: 73,
		categories: ['slots', 'jackpots'],
		founded: '2013',
		headquarters: 'Sweden',
		isPopular: true,
		description:
			'SpinForge from Sweden blends Norse mythology aesthetics with industry-leading math models.',
		longDescription:
			'SpinForge is a Stockholm-based developer with over a decade of experience crafting slots beloved by casual and hardcore players alike. Their signature Tumble mechanic and expanding multiplier wilds appear across dozens of titles. They hold the Nordic iGaming Design Award for three consecutive years and publish full math sheets for every game.',
		features: [
			'Tumble Mechanic',
			'Expanding Wilds',
			'Full Math Sheets',
			'Multi-Jackpot',
		],
	},
	{
		id: 'wildaxis',
		slug: 'wildaxis',
		name: 'WildAxis',
		logo: 'WA',
		gameCount: 49,
		categories: ['slots', 'table-games'],
		founded: '2018',
		headquarters: 'Cyprus',
		isPopular: false,
		description:
			'WildAxis delivers polished HTML5 slots and table games with a focus on mobile-first performance.',
		longDescription:
			'WildAxis was founded by a team of former AAA game developers who brought console-quality animations and sound design to the iGaming space. Their engine is optimized for sub-2-second load times on 3G connections. All games support instant-play and are compatible with the latest iOS and Android frameworks.',
		features: [
			'Console-Quality Graphics',
			'Instant Play',
			'Offline Mode',
			'Low Latency',
		],
	},
	{
		id: 'polydeal',
		slug: 'polydeal',
		name: 'PolyDeal',
		logo: 'PD',
		gameCount: 31,
		categories: ['live-casino', 'crash'],
		founded: '2020',
		headquarters: 'Estonia',
		isPopular: true,
		description:
			'PolyDeal is a next-gen studio pioneering game-show live formats and provably-fair crash games.',
		longDescription:
			'Founded in Tallinn in 2020, PolyDeal is the youngest studio in our portfolio — and perhaps the most disruptive. Their game-show live studio format attracts record player counts, and their crash/multiplier titles are the most played titles in their category on this platform. Provably-fair cryptographic verification is standard across all PolyDeal crash products.',
		features: [
			'Game-Show Format',
			'Provably Fair',
			'Crypto Verified',
			'Record Peak Players',
		],
	},
	{
		id: 'tablecraft',
		slug: 'tablecraft',
		name: 'TableCraft',
		logo: 'TC',
		gameCount: 28,
		categories: ['table-games', 'jackpots'],
		founded: '2009',
		headquarters: 'UK',
		isPopular: false,
		description:
			'TableCraft is the definitive supplier of RNG-based table games, with authentic Vegas-rule simulation.',
		longDescription:
			"TableCraft has spent 15+ years perfecting electronic versions of casino classics. Their RNG engine is certified by eCOGRA and TST, and their games implement correct Vegas and European rule sets that appeal to both casual players and serious strategists. The studio's blackjack suite covers over 20 variants including Pontoon, Perfect Pairs, and Switch.",
		features: [
			'Vegas Rule Accuracy',
			'eCOGRA Certified',
			'20+ Blackjack Variants',
			'Strategy Helpers',
		],
	},
]

export function getProviderBySlug(slug: string): Provider | undefined {
	return providers.find((p) => p.slug === slug)
}

export function getPopularProviders(limit = 8): Provider[] {
	return providers.filter((p) => p.isPopular).slice(0, limit)
}

export function getProvidersByCategory(category: GameCategory): Provider[] {
	return providers.filter((p) => p.categories.includes(category))
}
