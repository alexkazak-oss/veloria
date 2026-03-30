import { cn } from '../../lib/utils'

interface SkeletonProps {
	className?: string
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const roundedMap: Record<string, string> = {
	sm: 'rounded-[var(--radius-sm)]',
	md: 'rounded-[var(--radius-md)]',
	lg: 'rounded-[var(--radius-lg)]',
	xl: 'rounded-[var(--radius-xl)]',
	'2xl': 'rounded-[var(--radius-2xl)]',
	full: 'rounded-[var(--radius-full)]',
}

export function Skeleton({ className, rounded = 'md' }: SkeletonProps) {
	return (
		<div
			role="status"
			aria-label="Loading"
			className={cn('skeleton-shimmer', roundedMap[rounded], className)}
		/>
	)
}

/** Pre-composed skeleton for a GameCard */
export function GameCardSkeleton() {
	return (
		<div className="card flex flex-col overflow-hidden" aria-busy="true">
			<Skeleton className="w-full aspect-[4/3]" rounded="lg" />
			<div className="p-3 flex flex-col gap-2">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</div>
		</div>
	)
}

/** Pre-composed skeleton row for a table row */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
	return (
		<tr aria-busy="true">
			{Array.from({ length: cols }).map((_, i) => (
				<td key={i} className="px-4 py-3">
					<Skeleton className="h-4" />
				</td>
			))}
		</tr>
	)
}
