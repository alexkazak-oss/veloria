import type {FAQItem} from '../types/common'

export const faqItems: FAQItem[] = [
	/* ── Account ────────────────────────────────────────────────────── */
	{
		id: 'acc-1',
		category: 'account',
		question: 'How do I create a Veloria account?',
		answer:
			'Click "Register" in the top right corner. Fill in your details — email, password, date of birth and country — and click Submit. You\'ll receive a confirmation email within minutes. This is a demo prototype; no real account data is stored.',
	},
	{
		id: 'acc-2',
		category: 'account',
		question: 'Can I have multiple accounts?',
		answer:
			'One account per player, household, and IP address is allowed. Multiple accounts may result in bonus forfeiture and account suspension. On this demo site, all data is mock.',
	},
	{
		id: 'acc-3',
		category: 'account',
		question: 'How do I change my password?',
		answer:
			'Navigate to Account Settings → Security → Change Password. Enter your current password, then your new password twice. Changes take effect immediately.',
	},
	{
		id: 'acc-4',
		category: 'account',
		question: 'What do I do if I forgot my password?',
		answer:
			'Click "Log In" then "Forgot Password?" and enter your registered email address. You\'ll receive a reset link valid for 30 minutes.',
	},
	{
		id: 'acc-5',
		category: 'account',
		question: 'How do I close or self-exclude my account?',
		answer:
			'Go to Account Settings → Responsible Gaming → Self-Exclusion. You can choose cooling-off periods (24h, 7d, 30d) or permanent closure. Permanent exclusions cannot be reversed for 6 months.',
	},

	/* ── Payments ───────────────────────────────────────────────────── */
	{
		id: 'pay-1',
		category: 'payments',
		question: 'What payment methods are accepted?',
		answer:
			'We accept Visa, Mastercard, Bank Transfer, Skrill, Neteller, PaySafe, Bitcoin, Ethereum, Litecoin, USDT, and USDC. Processing times and limits vary by method.',
	},
	{
		id: 'pay-2',
		category: 'payments',
		question: 'How long do withdrawals take?',
		answer:
			'E-wallets (Skrill, Neteller): up to 12 hours. Crypto: up to 4 hours after blockchain confirmation. Bank Transfer: 1–3 business days. Cards: 2–5 business days.',
	},
	{
		id: 'pay-3',
		category: 'payments',
		question: 'Is there a minimum withdrawal amount?',
		answer:
			'The minimum withdrawal is €20 for most methods. Crypto minimum is equivalent to €20. There is no maximum for verified VIP accounts.',
	},
	{
		id: 'pay-4',
		category: 'payments',
		question: 'Are there any deposit or withdrawal fees?',
		answer:
			'Veloria charges no fees on deposits or withdrawals. Your bank or payment provider may charge their own fees — check with them directly.',
	},
	{
		id: 'pay-5',
		category: 'payments',
		question: 'How do I add a payment method?',
		answer:
			'Go to Cashier → Add Payment Method. Follow the instructions for your chosen method. Cards may require a micro-verification transaction.',
	},

	/* ── Verification ───────────────────────────────────────────────── */
	{
		id: 'ver-1',
		category: 'verification',
		question: 'Why do I need to verify my identity?',
		answer:
			'Identity verification (KYC) is required by regulations to prevent money laundering, protect minors, and ensure account security. All documents are handled in accordance with our Privacy Policy.',
	},
	{
		id: 'ver-2',
		category: 'verification',
		question: 'What documents are needed for verification?',
		answer:
			"You'll need: (1) Government-issued photo ID (passport, national ID, or driving licence), (2) Proof of address dated within 3 months (utility bill or bank statement), and optionally (3) Payment method verification.",
	},
	{
		id: 'ver-3',
		category: 'verification',
		question: 'How long does verification take?',
		answer:
			"Standard verification is completed within 24 hours. Express verification for VIP players takes up to 4 hours. You'll receive email confirmation once approved.",
	},
	{
		id: 'ver-4',
		category: 'verification',
		question: 'Can I withdraw before verifying?',
		answer:
			'A first withdrawal triggers mandatory KYC. Temporary limits of €500 per transaction may apply until verification is complete.',
	},

	/* ── Responsible Gaming ─────────────────────────────────────────── */
	{
		id: 'rg-1',
		category: 'responsible',
		question: 'What responsible gaming tools are available?',
		answer:
			'We offer deposit limits (daily/weekly/monthly), session time limits, reality checks, loss limits, cool-off periods, and self-exclusion. All tools are in Account Settings → Responsible Gaming.',
	},
	{
		id: 'rg-2',
		category: 'responsible',
		question: 'How do I set a deposit limit?',
		answer:
			'Account Settings → Responsible Gaming → Deposit Limits. Decreases take effect immediately. Increases require a 24-hour waiting period by regulation.',
	},
	{
		id: 'rg-3',
		category: 'responsible',
		question: 'What is a reality check?',
		answer:
			"A pop-up reminder that shows how long you've been playing, how much you've wagered, and your net balance. Set intervals from 15 minutes to 4 hours.",
	},
	{
		id: 'rg-4',
		category: 'responsible',
		question: 'Where can I get help for gambling problems?',
		answer:
			'If gambling is affecting your life, contact: BeGambleAware (begambleaware.org), GamCare (gamcare.org.uk), Gambling Therapy (gamblingtherapy.org). All services are free and confidential.',
	},

	/* ── Bonuses ────────────────────────────────────────────────────── */
	{
		id: 'bon-1',
		category: 'bonuses',
		question: 'How do I claim my welcome bonus?',
		answer:
			'After registering, make your first deposit. Navigate to Promotions → Welcome Pack and click "Claim Now". The bonus is credited within minutes and is valid for 14 days.',
	},
	{
		id: 'bon-2',
		category: 'bonuses',
		question: 'What does wagering requirement mean?',
		answer:
			'Wagering (rollover) is the number of times you must bet the bonus amount before it converts to withdrawable cash. A €100 bonus with 35x wagering requires €3,500 in total bets.',
	},
	{
		id: 'bon-3',
		category: 'bonuses',
		question: 'Do all games count equally towards wagering?',
		answer:
			"No. Slots typically count 100%, live casino games 10–20%, and table games 5–15%. Check each promotion's terms for the exact game contributions.",
	},
	{
		id: 'bon-4',
		category: 'bonuses',
		question: 'Can I withdraw while a bonus is active?',
		answer:
			"You may withdraw your real-money balance at any time. However, this will forfeit any active bonus and associated winnings. It's recommended to complete wagering first.",
	},
	{
		id: 'bon-5',
		category: 'bonuses',
		question: 'Why was my bonus not credited?',
		answer:
			'Common reasons: deposit was below the minimum, you didn\'t click "Claim Now" in time, a previous active bonus was still running, or your account is not yet eligible. Contact support with your transaction ID for a fast resolution.',
	},
]

export function getFAQByCategory(category: FAQItem['category']): FAQItem[] {
	return faqItems.filter((f) => f.category === category)
}

export function getFAQPreview(limit = 6): FAQItem[] {
	return faqItems.slice(0, limit)
}
