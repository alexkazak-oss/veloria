'use client'

import { ChevronRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { getNavItems } from '../../data/navigation'
import type { Locale } from '../../i18n/index'
import { useTranslations } from '../../i18n/index'

interface Props {
	locale: Locale
}

export default function MobileMenu({ locale }: Props) {
	const [open, setOpen] = useState(false)
	const t = useTranslations(locale)
	const nav = getNavItems(locale)

	const close = useCallback(() => setOpen(false), [])

	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = ''
		return () => { document.body.style.overflow = '' }
	}, [open])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [close])

	return (
		<>
			{/* Hamburger button */}
			<button
				onClick={() => setOpen((p) => !p)}
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="mobile-nav"
				className="lg:hidden p-2 rounded-[var(--radius-lg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
			>
				{open ? <X size={20} /> : <Menu size={20} />}
			</button>

			{/* Backdrop + Drawer */}
			<AnimatePresence>
				{open && (
					<>
						<motion.div
							key="backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-[calc(var(--z-sticky)+1)] bg-[var(--color-bg-overlay)] backdrop-blur-sm lg:hidden"
							onClick={close}
							aria-hidden="true"
						/>

						<motion.nav
							id="mobile-nav"
							key="drawer"
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							className="fixed top-0 right-0 bottom-0 z-[calc(var(--z-sticky)+2)] w-[min(320px,90vw)] bg-[var(--color-bg-surface)] border-l border-[var(--color-border)] flex flex-col lg:hidden"
							aria-label="Mobile navigation"
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
								<span className="font-bold text-lg">
									Ve<span style={{ color: 'var(--color-primary-400)' }}>loria</span>
								</span>
								<button
									onClick={close}
									aria-label="Close menu"
									className="p-2 rounded-[var(--radius-lg)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
								>
									<X size={18} />
								</button>
							</div>

							{/* Links */}
							<ul className="flex-1 overflow-y-auto py-3 px-2" role="list">
								{nav.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											onClick={close}
											className="flex items-center justify-between px-4 py-3 rounded-[var(--radius-xl)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors"
										>
											<span className="flex items-center gap-2">
												{item.label}
												{item.isNew && (
													<span
														style={{
															fontSize: '0.55rem',
															background: 'var(--color-primary-600)',
															color: 'white',
															padding: '1px 6px',
															borderRadius: '999px',
															textTransform: 'uppercase',
															fontWeight: 700,
														}}
													>
														New
													</span>
												)}
											</span>
											<ChevronRight size={14} style={{ opacity: 0.4 }} />
										</a>
									</li>
								))}
							</ul>

							{/* Auth CTA */}
							<div className="p-4 border-t border-[var(--color-border)] flex flex-col gap-2">
								<a
									href="#demo"
									onClick={close}
									className="flex items-center justify-center px-4 py-2.5 rounded-[var(--radius-xl)] text-sm font-medium border"
									style={{
										borderColor: 'var(--color-border-strong)',
										color: 'var(--color-text-secondary)',
									}}
								>
									{t.auth.login}
								</a>
								<a
									href="#demo"
									onClick={close}
									className="flex items-center justify-center px-4 py-2.5 rounded-[var(--radius-xl)] text-sm font-semibold text-white"
									style={{
										background: 'var(--color-primary-600)',
										boxShadow: 'var(--shadow-glow-primary)',
									}}
								>
									{t.auth.register}
								</a>

								{/* Language switcher */}
								<div className="flex gap-2 mt-1">
									{(['en', 'de'] as const).map((loc) => (
										<a
											key={loc}
											href={`/${loc}/`}
											onClick={close}
											className="flex-1 text-center py-2 text-xs font-semibold rounded-[var(--radius-lg)] transition-colors"
											style={{
												background: locale === loc ? 'var(--color-primary-700)' : 'var(--color-bg-elevated)',
												color: locale === loc ? 'white' : 'var(--color-text-muted)',
												border: '1px solid var(--color-border)',
											}}
										>
											{loc.toUpperCase()}
										</a>
									))}
								</div>
							</div>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</>
	)
}
