'use client'

import { LogIn, UserPlus, UserRound, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Locale } from '../../i18n/index'
import { useTranslations } from '../../i18n/index'
import { cn } from '../../lib/utils'

interface MobileAuthMenuProps {
	locale: Locale
}

export default function MobileAuthMenu({ locale }: MobileAuthMenuProps) {
	const t = useTranslations(locale)
	const [open, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Lock body scroll while sheet is open
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [open])

	// Close on Escape
	useEffect(() => {
		const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [])

	const sheet = (
		<AnimatePresence>
			{open && (
				<>
					{/* Backdrop */}
					<motion.div
						key="mob-auth-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setOpen(false)}
						aria-hidden="true"
						style={{
							position: 'fixed',
							inset: 0,
							zIndex: 210,
							background: 'rgba(0,0,0,0.6)',
							backdropFilter: 'blur(4px)',
							WebkitBackdropFilter: 'blur(4px)',
						}}
					/>

					{/* Bottom sheet */}
					<motion.div
						key="mob-auth-sheet"
						role="dialog"
						aria-modal="true"
						aria-label="Sign in or register"
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
						style={{
							position: 'fixed',
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: 211,
							background: 'var(--color-bg-surface)',
							borderTop: '1px solid var(--color-border-strong)',
							borderRadius: '1.25rem 1.25rem 0 0',
							padding: '1.5rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom))',
						}}
					>
						{/* Drag handle */}
						<div className="flex justify-center mb-4">
							<div
								className="w-10 h-1 rounded-full"
								style={{ background: 'var(--color-border-strong)' }}
								aria-hidden="true"
							/>
						</div>

						{/* Close button */}
						<button
							type="button"
							onClick={() => setOpen(false)}
							aria-label="Close"
							className={cn(
								'absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center',
								'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
								'hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer',
							)}
						>
							<X className="size-4" />
						</button>

					

						<div className="flex flex-col gap-3">
							{/* Register — primary CTA */}
							<a
								href={`/${locale}/register/`}
								onClick={() => setOpen(false)}
								className={cn(
									'flex items-center justify-center gap-2.5',
									'w-full py-3.5 rounded-xl',
									'text-sm font-bold text-white',
									'transition-all duration-150 active:scale-[0.98]',
								)}
								style={{
									background: 'var(--color-primary-600)',
									boxShadow: 'var(--shadow-glow-primary)',
								}}
							>
								<UserPlus className="size-4.5" />
								{t.auth.register}
							</a>

							{/* Login — secondary */}
							<a
								href={`/${locale}/login/`}
								onClick={() => setOpen(false)}
								className={cn(
									'flex items-center justify-center gap-2.5',
									'w-full py-3.5 rounded-xl',
									'text-sm font-semibold',
									'border transition-colors duration-150 active:scale-[0.98]',
								)}
								style={{
									color: 'var(--color-text-primary)',
									background: 'var(--color-bg-elevated)',
									borderColor: 'var(--color-border-strong)',
								}}
							>
								<LogIn className="size-4.5" />
								{t.auth.login}
							</a>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)

	return (
		<>
			{/* Trigger — visible on mobile (< sm) only */}
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				aria-label="Account"
				aria-expanded={open}
				className={cn(
					'sm:hidden p-2 rounded-lg cursor-pointer transition-colors',
					'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
					'hover:bg-[var(--color-bg-elevated)]',
					open && 'text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)]',
				)}
			>
				<UserRound className="size-5" />
			</button>

			{mounted && createPortal(sheet, document.body)}
		</>
	)
}
