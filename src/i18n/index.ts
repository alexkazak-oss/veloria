import {de} from './locales/de'
import {en} from './locales/en'

// Recursively replace all leaf values with `string` so translated locales
// don't need to match the exact English string literals.
type DeepString<T> = T extends string
	? string
	: {[K in keyof T]: DeepString<T[K]>}

export type Translations = DeepString<typeof en>

export type Locale = 'en' | 'de'

export const LOCALES: Locale[] = ['en', 'de']
export const DEFAULT_LOCALE: Locale = 'en'

const translations: Record<Locale, Translations> = {en, de}

export function useTranslations(locale: Locale): Translations {
	return translations[locale] ?? translations[DEFAULT_LOCALE]
}

export function getLocalePath(locale: Locale, path = '/'): string {
	const cleanPath = path.startsWith('/') ? path : `/${path}`
	return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

export function isValidLocale(value: string): value is Locale {
	return LOCALES.includes(value as Locale)
}
