export interface FAQItem {
	id: string
	question: string
	answer: string
	category: FAQCategory
}

export type FAQCategory =
	| 'account'
	| 'payments'
	| 'verification'
	| 'responsible'
	| 'bonuses'

export interface PaymentMethod {
	id: string
	name: string
	type: 'card' | 'ewallet' | 'crypto' | 'bank' | 'voucher'
	logo: string // gradient or initials for demo
	icon?: string
	minDeposit: number
	maxDeposit: number
	processingTime: string
	fee: string // "Free" or "1%"
	currencies: string[]
}

export interface NavItem {
	label: string
	href: string
	children?: NavItem[]
	isNew?: boolean
}

export interface Testimonial {
	id: string
	name: string
	avatar: string // initials
	country: string
	rating: number
	text: string
	date: string
}

export interface Breadcrumb {
	label: string
	href?: string
}

export interface SEOProps {
	title: string
	description: string
	canonical?: string
	ogImage?: string
	noIndex?: boolean
	jsonLd?: Record<string, unknown>
}
