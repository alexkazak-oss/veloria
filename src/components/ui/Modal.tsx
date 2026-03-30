'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import {
	useCallback,
	useEffect,
	useRef,
	type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

interface ModalProps {
	open: boolean
	onClose: () => void
	title?: string
	children: ReactNode
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses: Record<string, string> = {
	sm: 'max-w-md',
	md: 'max-w-lg',
	lg: 'max-w-2xl',
	xl: 'max-w-4xl',
	full: 'max-w-[95vw]',
}

export function Modal({
	open,
	onClose,
	title,
	children,
	className,
	size = 'md',
}: ModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null)

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		},
		[onClose],
	)

	useEffect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeyDown)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [open, handleKeyDown])

	const content = (
		<AnimatePresence>
			{open && (
				<div
					ref={overlayRef}
					className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby={title ? 'modal-title' : undefined}
				>
					{/* Backdrop */}
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-[var(--color-bg-overlay)] backdrop-blur-md"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Panel */}
					<motion.div
						key="panel"
						initial={{ opacity: 0, scale: 0.94, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.94, y: 16 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className={cn(
							'relative w-full bg-[var(--color-bg-surface)] rounded-[var(--radius-2xl)]',
							'border border-[var(--color-border-strong)] shadow-[var(--shadow-card)]',
							'max-h-[90vh] overflow-y-auto',
							sizeClasses[size],
							className,
						)}
					>
						{/* Header */}
						{title && (
							<div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
								<h2
									id="modal-title"
									className="text-lg font-semibold text-[var(--color-text-primary)]"
								>
									{title}
								</h2>
								<button
									onClick={onClose}
									aria-label="Close modal"
									className="p-2 rounded-[var(--radius-lg)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
								>
									<X size={18} />
								</button>
							</div>
						)}

						{/* Close button when no title */}
						{!title && (
							<button
								onClick={onClose}
								aria-label="Close modal"
								className="absolute top-4 right-4 z-10 p-2 rounded-[var(--radius-lg)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
							>
								<X size={18} />
							</button>
						)}

						<div className={cn(!title && 'pt-10')}>{children}</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)

	if (typeof document === 'undefined') return null
	return createPortal(content, document.body)
}
