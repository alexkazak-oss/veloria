import type {Promotion} from '../types/promotion'

export const promotions: Promotion[] = [
	{
		id: 'welcome-pack',
		type: 'welcome',
		title: '5,000 Welcome Pack',
		subtitle: '100% up to €5,000 + 200 Free Spins',
		description:
			'Start your journey at Veloria with our most generous welcome offer. Your first three deposits are each matched 100%, up to a combined total of €5,000. Plus, receive 200 free spins across our top slot titles.',
		amount: '€5,000',
		badge: 'Most Popular',
		minDeposit: 20,
		wagering: '35x',
		expires: '2026-12-31',
		gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
		isPopular: true,
		isNew: false,
		terms: [
			'Minimum deposit €20 per bonus',
			'Wagering requirement 35x bonus amount',
			'Free spins valid on selected slots only',
			'Maximum withdrawal from bonus: €10,000',
			'Offer valid for new players only',
			'Expires 14 days after activation',
		],
	},
	{
		id: 'monday-reload',
		type: 'reload',
		title: 'Monday Reload',
		subtitle: '50% up to €500 every Monday',
		description:
			"Kick off your week with a 50% deposit match every Monday. Log in, deposit, and we'll boost your balance to keep the good times rolling.",
		amount: '€500',
		badge: 'Weekly',
		minDeposit: 20,
		wagering: '25x',
		gradient: 'linear-gradient(135deg, #0891b2 0%, #164e63 100%)',
		isPopular: false,
		isNew: false,
		terms: [
			'Available every Monday, 00:00–23:59 UTC',
			'Minimum deposit €20',
			'Wagering 25x the bonus amount',
			'Max bonus per deposit: €500',
		],
	},
	{
		id: 'cashback-weekly',
		type: 'cashback',
		title: 'Weekly Cashback',
		subtitle: '15% cashback on net losses',
		description:
			'Every week, we return 15% of your net losses directly to your account — no wagering required. Settle into real play, knowing you always have a safety net.',
		amount: '15%',
		badge: 'No Wagering',
		minDeposit: 10,
		wagering: '1x',
		gradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
		isPopular: true,
		isNew: false,
		terms: [
			'Calculated on net losses from Mon–Sun',
			'Credit applied every Monday by 12:00 UTC',
			'Wagering 1x (essentially no wagering)',
			'Minimum net loss to qualify: €50',
			'Maximum cashback: €2,000 per week',
		],
	},
	{
		id: 'vip-exclusive',
		type: 'vip',
		title: 'VIP Exclusive Bundle',
		subtitle: 'Personalised offers for Gold+ members',
		description:
			'Gold, Platinum, and Diamond VIP members receive monthly exclusive bundles: tailored reload bonuses, free spins on requested games, and personal manager gifts.',
		amount: 'Custom',
		badge: 'VIP Only',
		minDeposit: 100,
		wagering: '20x',
		gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
		isPopular: false,
		isNew: false,
		terms: [
			'Available to VIP Gold tier and above',
			'Issued by personal account manager',
			'Wagering 20x unless otherwise stated',
			'Cannot be combined with other bonuses',
		],
	},
	{
		id: 'refer-friend',
		type: 'referral',
		title: 'Refer a Friend',
		subtitle: '€50 for you + €50 for your friend',
		description:
			'Share your unique referral link. When a friend registers and makes their first deposit of €20 or more, you both receive €50 in bonus funds instantly.',
		amount: '€50 each',
		badge: 'No Limits',
		minDeposit: 20,
		wagering: '20x',
		gradient: 'linear-gradient(135deg, #c026d3 0%, #701a75 100%)',
		isPopular: false,
		isNew: true,
		terms: [
			'Referee must be a new Veloria player',
			'Referee must deposit minimum €20',
			'Both bonuses issued within 24 hours of qualifying deposit',
			'Wagering 20x for both parties',
			'No maximum number of referrals',
		],
	},
	{
		id: 'weekend-spins',
		type: 'weekend',
		title: 'Weekend Free Spins',
		subtitle: '50 Free Spins every Friday',
		description:
			'Log in any Friday and claim 50 free spins on our featured slot of the week. No deposit required — just loyalty.',
		amount: '50 Spins',
		badge: 'Free',
		minDeposit: 0,
		wagering: '30x',
		gradient: 'linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)',
		isPopular: true,
		isNew: false,
		terms: [
			'Claim window: Friday 00:00–23:59 UTC',
			'Spin value: €0.10 per spin',
			'Winnings subject to 30x wagering',
			'Available to verified players only',
			'Valid 3 days from activation',
		],
	},
	{
		id: 'high-roller',
		type: 'reload',
		title: 'High Roller Bonus',
		subtitle: '75% up to €2,000 for deposits €500+',
		description:
			'For players who play big, we reward big. Deposit €500 or more and receive a 75% match up to €2,000. Reduced wagering for high-value deposits.',
		amount: '€2,000',
		badge: 'High Roller',
		minDeposit: 500,
		wagering: '20x',
		expires: '2026-06-30',
		gradient: 'linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)',
		isPopular: false,
		isNew: true,
		terms: [
			'Minimum deposit €500',
			'Bonus percentage: 75% up to €2,000',
			'Wagering 20x bonus amount',
			'Available once per week',
			'Valid for existing players with 10+ deposits',
		],
	},
]

export function getPromotionById(id: string): Promotion | undefined {
	return promotions.find((p) => p.id === id)
}

export function getFeaturedPromotions(limit = 4): Promotion[] {
	return promotions.filter((p) => p.isPopular).slice(0, limit)
}
