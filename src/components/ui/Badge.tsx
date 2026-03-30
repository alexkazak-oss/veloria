import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'hot' | 'new' | 'live' | 'featured' | 'vip' | 'exclusive' | 'promo' | 'default'

interface BadgeProps {
	variant?: BadgeVariant
	children: ReactNode
	className?: string
	dot?: boolean
}

const variants: Record<BadgeVariant, string> = {
	hot: 'bg-[var(--color-danger)] text-white',
	new: 'bg-[var(--color-primary-600)] text-white',
	live: 'bg-[var(--color-live)] text-white',
	featured: 'bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-600)] text-[var(--color-text-inverse)]',
	vip: 'bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-cyan-500)] text-white',
	exclusive: 'bg-[var(--color-bg-elevated)] border border-[var(--color-gold-500)] text-[var(--color-gold-400)]',
	promo: 'bg-[var(--color-success)] text-white',
	default: 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
}

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)]',
				'text-[0.625rem] font-bold tracking-wide uppercase leading-none',
				variants[variant],
				className,
			)}
		>
			{dot && variant === 'live' && (
				<span className="live-dot w-1.5 h-1.5" aria-hidden="true" />
			)}
			{children}
		</span>
	)
}
