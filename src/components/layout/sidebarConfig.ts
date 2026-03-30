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
import type {Locale} from '../../i18n/index'
import {useTranslations} from '../../i18n/index'

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
	{code: 'en', label: 'English', flag: '🇬🇧'},
	{code: 'de', label: 'Deutsch', flag: '🇩🇪'},
]

// ── Menu items ────────────────────────────────────────────────────────────────

export function getSidebarMenuItems(locale: Locale): MenuItem[] {
	const t = useTranslations(locale)
	return [
		{
			id: 'promotions',
			type: 'link',
			label: t.sidebar.promotions,
			icon: Star,
			href: `/${locale}/promotions/`,
		},
		{
			id: 'vip',
			type: 'link',
			label: t.sidebar.vipClub,
			icon: Crown,
			href: `/${locale}/vip/`,
			badge: t.sidebar.vipBadge,
			badgeVariant: 'new',
		},
		{id: 'sec-games', type: 'section-header', label: t.sidebar.sectionGames},
		{
			id: 'casino',
			type: 'expandable',
			label: t.sidebar.casino,
			icon: Gamepad2,
			children: [
				{
					id: 'popular',
					label: t.sidebar.popular,
					href: `/${locale}/games/`,
					icon: Flame,
				},
				{
					id: 'blackjack',
					label: t.sidebar.blackjack,
					href: `/${locale}/games/table-games/`,
				},
				{
					id: 'roulette',
					label: t.sidebar.roulette,
					href: `/${locale}/games/table-games/`,
				},
				{
					id: 'baccarat',
					label: t.sidebar.baccarat,
					href: `/${locale}/games/table-games/`,
				},
				{
					id: 'poker',
					label: t.sidebar.poker,
					href: `/${locale}/games/table-games/`,
				},
				{
					id: 'gameshows',
					label: t.sidebar.gameShows,
					href: `/${locale}/games/live-casino/`,
				},
				{
					id: 'others',
					label: t.sidebar.otherGames,
					href: `/${locale}/games/slots/`,
				},
			],
		},
		{
			id: 'live-casino',
			type: 'link',
			label: t.sidebar.liveCasino,
			icon: Zap,
			href: `/${locale}/games/live-casino/`,
		},
		{
			id: 'sec-promo',
			type: 'section-header',
			label: t.sidebar.sectionPromotions,
		},
		{
			id: 'promo-group',
			type: 'promo-group',
			items: [
				{
					id: 'fortune-spins',
					label: t.sidebar.fortuneSpinsLabel,
					sublabel: t.sidebar.fortuneSpinsSub,
					gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
					emoji: '🎰',
					href: `/${locale}/promotions/`,
				},
				{
					id: 'lucky-box',
					label: t.sidebar.luckyBoxLabel,
					sublabel: t.sidebar.luckyBoxSub,
					gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
					emoji: '🎁',
					href: `/${locale}/promotions/`,
				},
			],
		},
		{
			id: 'cashback',
			type: 'link',
			label: t.sidebar.cashback,
			icon: TrendingUp,
			href: `/${locale}/promotions/`,
		},
		{
			id: 'referral',
			type: 'link',
			label: t.sidebar.referral,
			icon: Users,
			href: `/${locale}/promotions/`,
		},
		{
			id: 'tournaments',
			type: 'link',
			label: t.sidebar.tournaments,
			icon: Trophy,
			href: `/${locale}/tournaments/`,
		},
		{
			id: 'shop',
			type: 'link',
			label: t.sidebar.shop,
			icon: ShoppingBag,
			href: `/${locale}/promotions/`,
		},
		{
			id: 'sec-support',
			type: 'section-header',
			label: t.sidebar.sectionSupport,
		},
		{
			id: 'help',
			type: 'expandable',
			label: t.sidebar.help,
			icon: HelpCircle,
			children: [
				{
					id: 'faq',
					label: t.sidebar.faq,
					href: `/${locale}/help/`,
					icon: LifeBuoy,
				},
				{
					id: 'contacts',
					label: t.sidebar.contacts,
					href: `/${locale}/contacts/`,
					icon: Phone,
				},
				{
					id: 'responsible',
					label: t.sidebar.responsibleGaming,
					href: `/${locale}/responsible-gaming/`,
				},
			],
		},
	]
}
