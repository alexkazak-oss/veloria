import type {SEOProps} from '../types/common'

interface BuildSEOOptions extends SEOProps {
	locale?: string
	siteName?: string
}

export function buildSEO({
	title,
	description,
	canonical,
	ogImage,
	noIndex = false,
	locale = 'en',
	siteName = 'Veloria',
}: BuildSEOOptions) {
	const fullTitle = title === siteName ? title : `${title} | ${siteName}`
	return {
		title: fullTitle,
		description,
		canonical: canonical ?? '',
		ogImage: ogImage ?? '/og-default.png',
		noIndex,
		locale,
		siteName,
	}
}

export function buildBreadcrumbJsonLd(
	items: Array<{label: string; url: string}>,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, idx) => ({
			'@type': 'ListItem',
			position: idx + 1,
			name: item.label,
			item: item.url,
		})),
	}
}

export function buildFAQJsonLd(
	items: Array<{question: string; answer: string}>,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	}
}
