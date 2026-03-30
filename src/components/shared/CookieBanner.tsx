'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'veloria_cookie_consent'

interface Props {
	learnMoreHref: string
	message: string
	acceptLabel: string
	declineLabel: string
	learnMoreLabel: string
}

export default function CookieBanner({
	learnMoreHref,
	message,
	acceptLabel,
	declineLabel,
	learnMoreLabel,
}: Props) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (!stored) setVisible(true)
		} catch {
			// localStorage not available (SSR / private mode)
		}
	}, [])

	function dismiss(accepted: boolean) {
		try {
			localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'declined')
		} catch {
			// ignore
		}
		setVisible(false)
	}

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					role="dialog"
					aria-label="Cookie consent"
					aria-live="polite"
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					className="fixed bottom-0 left-0 right-0 z-[var(--z-toast)] p-4 sm:p-6"
				>
					<div
						className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-[var(--radius-2xl)] border"
						style={{
							background: 'var(--color-bg-elevated)',
							borderColor: 'var(--color-border-strong)',
							boxShadow: 'var(--shadow-card)',
						}}
					>
						<p className="flex-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
							{message}{' '}
							<a
								href={learnMoreHref}
								className="underline"
								style={{ color: 'var(--color-primary-400)' }}
							>
								{learnMoreLabel}
							</a>
						</p>
						<div className="flex items-center gap-2 shrink-0">
							<button
								onClick={() => dismiss(false)}
								className="px-4 py-2 text-sm font-medium rounded-[var(--radius-xl)] border transition-colors cursor-pointer"
								style={{
									borderColor: 'var(--color-border)',
									color: 'var(--color-text-muted)',
								}}
							>
								{declineLabel}
							</button>
							<button
								onClick={() => dismiss(true)}
								className="px-4 py-2 text-sm font-semibold rounded-[var(--radius-xl)] text-white transition-all cursor-pointer"
								style={{
									background: 'var(--color-primary-600)',
									boxShadow: 'var(--shadow-glow-primary)',
								}}
							>
								{acceptLabel}
							</button>
							<button
								onClick={() => dismiss(false)}
								aria-label="Close cookie banner"
								className="p-1.5 rounded-[var(--radius-md)] transition-colors cursor-pointer"
								style={{ color: 'var(--color-text-muted)' }}
							>
								<X size={16} />
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
