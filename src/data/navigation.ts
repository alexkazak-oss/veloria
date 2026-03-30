import type {NavItem} from '../types/common'

export function getNavItems(locale: string): NavItem[] {
	return [
		{
			label: 'Games',
			href: `/${locale}/games`,
			children: [
				{label: 'All Games', href: `/${locale}/games`},
				{label: 'Slots', href: `/${locale}/games/slots`},
				{label: 'Live Casino', href: `/${locale}/games/live-casino`},
				{label: 'Table Games', href: `/${locale}/games/table-games`},
				{label: 'Jackpots', href: `/${locale}/games/jackpots`},
				{label: 'Crash Games', href: `/${locale}/games/crash`, isNew: true},
			],
		},
		{
			label: 'Promotions',
			href: `/${locale}/promotions`,
		},
		{
			label: 'VIP',
			href: `/${locale}/vip`,
		},
		{
			label: 'Tournaments',
			href: `/${locale}/tournaments`,
		},
		{
			label: 'Providers',
			href: `/${locale}/providers`,
		},
		{
			label: 'Help',
			href: `/${locale}/help`,
		},
	]
}

export function getFooterLinks(locale: string) {
	return {
		casino: [
			{label: 'All Games', href: `/${locale}/games`},
			{label: 'Live Casino', href: `/${locale}/games/live-casino`},
			{label: 'Jackpots', href: `/${locale}/games/jackpots`},
			{label: 'Providers', href: `/${locale}/providers`},
			{label: 'VIP Club', href: `/${locale}/vip`},
			{label: 'Tournaments', href: `/${locale}/tournaments`},
		],
		promotions: [
			{label: 'Welcome Bonus', href: `/${locale}/promotions`},
			{label: 'Reload Bonus', href: `/${locale}/promotions`},
			{label: 'Cashback', href: `/${locale}/promotions`},
			{label: 'Free Spins', href: `/${locale}/promotions`},
			{label: 'Refer a Friend', href: `/${locale}/promotions`},
		],
		support: [
			{label: 'Help Center', href: `/${locale}/help`},
			{label: 'Contact Us', href: `/${locale}/contacts`},
			{label: 'Responsible Gaming', href: `/${locale}/responsible-gaming`},
		],
		legal: [
			{label: 'About Us', href: `/${locale}/about`},
			{label: 'Terms & Conditions', href: `/${locale}/terms`},
			{label: 'Privacy Policy', href: `/${locale}/privacy`},
			{label: 'Cookie Policy', href: `/${locale}/cookie-policy`},
			{label: 'AML & KYC', href: `/${locale}/aml-kyc`},
		],
	}
}
