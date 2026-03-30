import { Users } from 'lucide-react'
import { cn, formatNumber } from '../../lib/utils'
import type { Game } from '../../types/game'
import { Badge } from '../ui/Badge'

interface Props {
	game: Game
	locale: string
	className?: string
}

export function GameCard({ game, locale, className }: Props) {
	return (
		<article
			className={cn(
				'card group relative flex flex-col cursor-pointer',
				'focus-within:ring-2 focus-within:ring-[var(--color-primary-500)]',
				className,
			)}
		>
			{/* Thumbnail */}
			<div
				className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[var(--radius-xl)]"
				style={{ background: game.thumbnail }}
				aria-hidden="true"
			>
				{/* Overlay on hover */}
				<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-base)] flex items-center justify-center">
					<a
						href={`/${locale}/games`}
						className="px-5 py-2.5 rounded-[var(--radius-xl)] text-sm font-semibold text-white"
						style={{
							background: 'var(--color-primary-600)',
							boxShadow: 'var(--shadow-glow-primary)',
						}}
						aria-label={`Play ${game.title}`}
					>
						Play Now
					</a>
				</div>

				{/* Badges */}
				<div className="absolute top-2 left-2 flex gap-1.5">
					{game.isLive && <Badge variant="live" dot>LIVE</Badge>}
					{game.tags.includes('hot') && <Badge variant="hot">HOT</Badge>}
					{game.tags.includes('new') && <Badge variant="new">NEW</Badge>}
					{game.tags.includes('featured') && <Badge variant="featured">★</Badge>}
				</div>

				{/* Live players count */}
				{game.isLive && game.players && (
					<div
						className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-xs text-white"
						style={{ background: 'rgba(0,0,0,0.65)' }}
					>
						<Users size={10} aria-hidden="true" />
						<span>{formatNumber(game.players)}</span>
					</div>
				)}
			</div>

			{/* Info */}
			<div className="p-3 flex flex-col gap-1">
				<h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-1">
					{game.title}
				</h3>
				<div className="flex items-center justify-between">
					<span className="text-xs text-[var(--color-text-muted)]">{game.provider}</span>
					<span className="text-xs text-[var(--color-primary-400)] font-medium">
						{game.rtp}% RTP
					</span>
				</div>
			</div>
		</article>
	)
}
