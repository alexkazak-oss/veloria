import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Provider } from '../../types/provider'

interface Props {
	provider: Provider
	locale: string
	className?: string
}

export function ProviderCard({ provider, locale, className }: Props) {
	return (
		<a
			href={`/${locale}/providers/${provider.slug}`}
			className={cn(
				'card group flex items-center gap-4 p-4 neon-border',
				'hover:border-[var(--color-primary-600)]',
				className,
			)}
			aria-label={`View ${provider.name} games`}
		>
			{/* Logo placeholder */}
			<div
				className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-xl)] shrink-0 text-sm font-bold"
				style={{
					background: 'var(--color-bg-elevated)',
					border: '1px solid var(--color-border)',
					color: 'var(--color-primary-400)',
					letterSpacing: '-0.02em',
				}}
				aria-hidden="true"
			>
				{provider.logo}
			</div>

			<div className="flex-1 min-w-0">
				<p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{provider.name}</p>
				<p className="text-xs text-[var(--color-text-muted)] mt-0.5">
					{provider.gameCount} games
				</p>
			</div>

			<ArrowRight
				size={16}
				className="shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-400)] group-hover:translate-x-0.5 transition-all duration-[var(--transition-fast)]"
				aria-hidden="true"
			/>
		</a>
	)
}
