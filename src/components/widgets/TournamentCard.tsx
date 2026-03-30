import { Clock, Trophy, Users } from 'lucide-react'
import { cn, formatCountdown } from '../../lib/utils'
import type { Tournament } from '../../types/tournament'
import { Badge } from '../ui/Badge'

interface Props {
	tournament: Tournament
	locale: string
	className?: string
}

export function TournamentCard({ tournament, locale, className }: Props) {
	const countdown =
		tournament.status === 'active' ? formatCountdown(tournament.endDate) :
			tournament.status === 'upcoming' ? formatCountdown(tournament.startDate) :
				null

	return (
		<article
			className={cn(
				'card relative flex flex-col overflow-hidden neon-border group',
				className,
			)}
		>
			{/* Gradient header */}
			<div
				className="h-36 flex flex-col justify-end p-4 relative"
				style={{ background: tournament.gradient }}
			>
				<div className="absolute top-3 left-3">
					<Badge
						variant={
							tournament.status === 'active' ? 'live' :
								tournament.status === 'upcoming' ? 'new' :
									'default'
						}
						dot={tournament.status === 'active'}
					>
						{tournament.status.toUpperCase()}
					</Badge>
				</div>

				<div className="flex items-end justify-between">
					<div>
						<p className="text-white/70 text-xs mb-1 flex items-center gap-1">
							<Trophy size={11} aria-hidden="true" /> Prize Pool
						</p>
						<p className="text-2xl font-extrabold text-white">{tournament.prizePool}</p>
					</div>
					{countdown && (
						<div className="text-right">
							<p className="text-white/70 text-xs mb-1 flex items-center gap-1 justify-end">
								<Clock size={11} aria-hidden="true" />
								{tournament.status === 'active' ? 'Ends in' : 'Starts in'}
							</p>
							<p className="text-lg font-bold text-white">{countdown}</p>
						</div>
					)}
				</div>
			</div>

			{/* Body */}
			<div className="flex flex-col flex-1 p-4 gap-3">
				<div>
					<h3 className="text-base font-bold text-[var(--color-text-primary)]">{tournament.title}</h3>
					<p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
						{tournament.description}
					</p>
				</div>

				<div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
					<span className="flex items-center gap-1">
						<Users size={12} aria-hidden="true" />
						{tournament.playerCount.toLocaleString()} / {tournament.maxPlayers.toLocaleString()}
					</span>
				</div>

				<a
					href={`/${locale}/tournaments`}
					className="mt-auto flex items-center justify-center px-4 py-2.5 rounded-[var(--radius-xl)] text-sm font-semibold text-white transition-all"
					style={{
						background: tournament.status === 'finished'
							? 'var(--color-bg-elevated)'
							: 'var(--color-primary-600)',
						color: tournament.status === 'finished'
							? 'var(--color-text-muted)'
							: 'white',
						border: tournament.status === 'finished' ? '1px solid var(--color-border)' : 'none',
					}}
					aria-label={`View ${tournament.title}`}
				>
					{tournament.status === 'finished' ? 'View Results' : 'Join Now'}
				</a>
			</div>
		</article>
	)
}
