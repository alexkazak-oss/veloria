/**
 * Lightweight class-name merger.
 * Filters falsy values and joins with a space.
 * No external deps — avoids requiring clsx/tailwind-merge.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ')
}

/**
 * Format a number with locale-aware separators.
 */
export function formatNumber(value: number, locale = 'en-US'): string {
	return new Intl.NumberFormat(locale).format(value)
}

/**
 * Format currency.
 */
export function formatCurrency(
	value: number,
	currency = 'EUR',
	locale = 'en-US',
): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		maximumFractionDigits: 0,
	}).format(value)
}

/**
 * Convert a string to URL-friendly slug.
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max)
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text
	return `${text.slice(0, maxLength - 1)}…`
}

/**
 * Get initials from a name (up to 2 chars).
 */
export function getInitials(name: string): string {
	return name
		.split(' ')
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? '')
		.join('')
}

/**
 * Pluralize a word: pluralize('game', 5) → 'games'
 */
export function pluralize(word: string, count: number): string {
	return count === 1 ? word : `${word}s`
}

/**
 * Format a relative countdown string from an ISO date.
 * Returns a human-readable string like "2d 4h" or "Ended".
 */
export function formatCountdown(isoDate: string): string {
	const diff = new Date(isoDate).getTime() - Date.now()
	if (diff <= 0) return 'Ended'

	const totalSec = Math.floor(diff / 1000)
	const days = Math.floor(totalSec / 86400)
	const hours = Math.floor((totalSec % 86400) / 3600)
	const minutes = Math.floor((totalSec % 3600) / 60)

	if (days > 0) return `${days}d ${hours}h`
	if (hours > 0) return `${hours}h ${minutes}m`
	return `${minutes}m`
}


export function formatDate(isoDate: string, locale = 'en-US'): string {
	return new Intl.DateTimeFormat(locale, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(isoDate))
}
