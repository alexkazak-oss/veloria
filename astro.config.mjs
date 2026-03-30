// @ts-check
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'

export default defineConfig({
	site: 'https://veloria.casino',
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					de: 'de-DE',
				},
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
})
