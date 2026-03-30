/**
 * Sidebar menu configuration.
 * All menu structure is data-driven — add/remove items here only.
 */
import type {LucideProps} from 'lucide-react'
import {
	Crown,
	Flame,
	Gamepad2,
	HelpCircle,
	LifeBuoy,
	Phone,
	ShoppingBag,
	Star,
	TrendingUp,
	Trophy,
	Users,
	Zap,
} from 'lucide-react'
import type {FC} from 'react'

// ── Icon type ────────────────────────────────────────────────────────────────
export type LucideIcon = FC<LucideProps>

// ── Item types ────────────────────────────────────────────────────────────────

export interface ChildMenuItem {
	id: string
	label: string
	href: string
	icon?: LucideIcon
}

export interface LinkMenuItem {
	id: string
	type: 'link'
	label: string
	icon: LucideIcon
	href: string
	badge?: string
	badgeVariant?: 'new' | 'hot' | 'live'
}

export interface ExpandableMenuItem {
	id: string
	type: 'expandable'
	label: string
	icon: LucideIcon
	children: ChildMenuItem[]
}

export interface PromoCardData {
	id: string
	label: string
	sublabel: string
	gradient: string
	emoji: string
	href: string
}

export interface PromoGroupMenuItem {
	id: string
	type: 'promo-group'
	items: PromoCardData[]
}

export interface SeparatorMenuItem {
	id: string
	type: 'separator'
}

export interface SectionHeaderMenuItem {
	id: string
	type: 'section-header'
	label: string
}

export type MenuItem =
	| LinkMenuItem
	| ExpandableMenuItem
	| PromoGroupMenuItem
	| SeparatorMenuItem
	| SectionHeaderMenuItem

// ── Language options ──────────────────────────────────────────────────────────

export interface Language {
	code: string
	label: string
	flag: string
}

export const languages: Language[] = [
	{code: 'it', label: 'Italiano', flag: '🇮🇹'},
	{code: 'en', label: 'English', flag: '🇬🇧'},
	{code: 'de', label: 'Deutsch', flag: '🇩🇪'},
]

// ── Menu items ────────────────────────────────────────────────────────────────

export const sidebarMenuItems: MenuItem[] = [
	{
		id: 'promotions',
		type: 'link',
		label: 'Promozioni',
		icon: Star,
		href: '/en/promotions/',
	},
	{
		id: 'vip',
		type: 'link',
		label: 'VIP Club',
		icon: Crown,
		href: '/en/vip/',
		badge: 'NUOVO',
		badgeVariant: 'new',
	},
	{id: 'sec-giochi', type: 'section-header', label: 'Giochi'},
	{
		id: 'casino',
		type: 'expandable',
		label: 'Casino',
		icon: Gamepad2,
		children: [
			{id: 'popular', label: 'Popolari', href: '/en/games/', icon: Flame},
			{id: 'blackjack', label: 'Blackjack', href: '/en/games/table-games/'},
			{id: 'roulette', label: 'Roulette', href: '/en/games/table-games/'},
			{id: 'baccarat', label: 'Baccarat', href: '/en/games/table-games/'},
			{id: 'poker', label: 'Poker', href: '/en/games/table-games/'},
			{id: 'gameshows', label: 'Game Shows', href: '/en/games/live-casino/'},
			{id: 'others', label: 'Altri giochi', href: '/en/games/slots/'},
		],
	},
	{
		id: 'live-casino',
		type: 'link',
		label: 'Casinò Live',
		icon: Zap,
		href: '/en/games/live-casino/',
	},
	{id: 'sec-promo', type: 'section-header', label: 'Promozioni'},
	{
		id: 'promo-group',
		type: 'promo-group',
		items: [
			{
				id: 'fortune-spins',
				label: 'Fortune Spins',
				sublabel: 'Gira & Vinci',
				gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
				emoji: '🎰',
				href: '/en/promotions/',
			},
			{
				id: 'lucky-box',
				label: 'Lucky Box',
				sublabel: 'Premi nascosti',
				gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
				emoji: '🎁',
				href: '/en/promotions/',
			},
		],
	},
	{
		id: 'cashback',
		type: 'link',
		label: 'Cashback Settimanale',
		icon: TrendingUp,
		href: '/en/promotions/',
	},
	{
		id: 'referral',
		type: 'link',
		label: 'Bonus di Invito',
		icon: Users,
		href: '/en/promotions/',
	},
	{
		id: 'tournaments',
		type: 'link',
		label: 'Tornei',
		icon: Trophy,
		href: '/en/tournaments/',
	},
	{
		id: 'shop',
		type: 'link',
		label: 'Negozio Bonus',
		icon: ShoppingBag,
		href: '/en/promotions/',
	},
	{id: 'sec-supporto', type: 'section-header', label: 'Supporto'},
	{
		id: 'help',
		type: 'expandable',
		label: 'Centro Assistenza',
		icon: HelpCircle,
		children: [
			{id: 'faq', label: 'FAQ', href: '/en/help/', icon: LifeBuoy},
			{id: 'contacts', label: 'Contacts', href: '/en/contacts/', icon: Phone},
			{
				id: 'responsible',
				label: 'Responsible Gaming',
				href: '/en/responsible-gaming/',
			},
		],
	},
]
