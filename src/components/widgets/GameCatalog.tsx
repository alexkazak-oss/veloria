'use client'
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { gameCategories, games } from '../../data/games'
import { providers } from '../../data/providers'
import type { Locale } from '../../i18n/index'
import { useTranslations } from '../../i18n/index'
import { cn } from '../../lib/utils'
import type { GameCategory } from '../../types/game'
import {GameCard} from './GameCard'

const PAGE_SIZE = 12

interface Props {
	locale: Locale
	initialCategory?: GameCategory | 'all'
}

type SortKey = 'popular' | 'new' | 'rtp' | 'az'

export default function GameCatalog({ locale, initialCategory = 'all' }: Props) {
	const t = useTranslations(locale)
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState<GameCategory | 'all'>(initialCategory)
	const [provider, setProvider] = useState('all')
	const [sort, setSort] = useState<SortKey>('popular')
	const [page, setPage] = useState(1)
	const [providerOpen, setProviderOpen] = useState(false)
	const [sortOpen, setSortOpen] = useState(false)

	const filtered = useMemo(() => {
		let result = [...games]
		if (category !== 'all') result = result.filter((g) => g.category === category)
		if (provider !== 'all') result = result.filter((g) => g.providerSlug === provider)
		if (search.trim()) {
			const q = search.toLowerCase()
			result = result.filter(
				(g) => g.title.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q),
			)
		}
		switch (sort) {
			case 'new': result = [...result].filter((g) => g.tags?.includes('new')).concat(result.filter((g) => !g.tags?.includes('new'))); break
			case 'rtp': result = [...result].sort((a, b) => b.rtp - a.rtp); break
			case 'az': result = [...result].sort((a, b) => a.title.localeCompare(b.title)); break
			case 'popular':
			default: result = [...result].sort((a, b) => ((b.tags?.includes('hot') ? 1 : 0) - (a.tags?.includes('hot') ? 1 : 0)))
		}
		return result
	}, [search, category, provider, sort])

	const visible = filtered.slice(0, page * PAGE_SIZE)
	const hasMore = visible.length < filtered.length

	const handleCategory = useCallback((cat: GameCategory | 'all') => {
		setCategory(cat)
		setPage(1)
	}, [])

	const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setPage(1)
	}, [])

	const sortLabels: Record<SortKey, string> = {
		popular: t.games.sortPopular,
		new: t.games.sortNew,
		rtp: t.games.sortRTP,
		az: t.games.sortAZ,
	}

	const providerLabel = provider === 'all'
		? t.games.allProviders
		: (providers.find((p) => p.slug === provider)?.name ?? t.games.allProviders)

	return (
		<div>
			{/* ── Filter bar ── */}
			<div className="flex flex-col sm:flex-row gap-3 mb-6">
				{/* Search */}
				<div className="relative flex-1">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
						aria-hidden="true"
					/>
					<input
						type="search"
						value={search}
						onChange={handleSearch}
						placeholder={t.games.search}
						aria-label={t.games.search}
						className={cn(
							'w-full pl-9 pr-4 py-2.5 text-sm rounded-[var(--radius-xl)]',
							'bg-[var(--color-bg-surface)] border border-[var(--color-border)]',
							'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
							'focus:outline-none focus:border-[var(--color-primary-500)] transition-colors',
						)}
					/>
				</div>

				{/* Provider dropdown */}
				<div className="relative">
					<button
						onClick={() => { setProviderOpen((o) => !o); setSortOpen(false) }}
						className={cn(
							'flex items-center gap-2 px-4 py-2.5 text-sm rounded-[var(--radius-xl)]',
							'bg-[var(--color-bg-surface)] border border-[var(--color-border)]',
							'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors',
							'min-w-[150px] justify-between',
						)}
						aria-expanded={providerOpen}
						aria-haspopup="listbox"
					>
						<span className="truncate">{providerLabel}</span>
						<ChevronDown size={14} className={cn('flex-shrink-0 transition-transform', providerOpen && 'rotate-180')} />
					</button>
					{providerOpen && (
						<div
							className="absolute top-full mt-1 right-0 z-20 min-w-[180px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xl py-1"
							role="listbox"
							aria-label={t.games.allProviders}
						>
							{[{ slug: 'all', name: t.games.allProviders }, ...providers].map((p) => (
								<button
									key={p.slug}
									role="option"
									aria-selected={provider === p.slug}
									onClick={() => { setProvider(p.slug); setProviderOpen(false); setPage(1) }}
									className={cn(
										'w-full text-left px-4 py-2 text-sm transition-colors',
										provider === p.slug
											? 'text-[var(--color-primary-400)] bg-[var(--color-primary-600)]22'
											: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]',
									)}
								>
									{p.name}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Sort dropdown */}
				<div className="relative">
					<button
						onClick={() => { setSortOpen((o) => !o); setProviderOpen(false) }}
						className={cn(
							'flex items-center gap-2 px-4 py-2.5 text-sm rounded-[var(--radius-xl)]',
							'bg-[var(--color-bg-surface)] border border-[var(--color-border)]',
							'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors',
							'min-w-[160px] justify-between',
						)}
						aria-expanded={sortOpen}
						aria-haspopup="listbox"
					>
						<span className="flex items-center gap-1.5">
							<SlidersHorizontal size={14} />
							{sortLabels[sort]}
						</span>
						<ChevronDown size={14} className={cn('flex-shrink-0 transition-transform', sortOpen && 'rotate-180')} />
					</button>
					{sortOpen && (
						<div
							className="absolute top-full mt-1 right-0 z-20 min-w-[160px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xl py-1"
							role="listbox"
							aria-label={t.games.sortBy}
						>
							{(Object.keys(sortLabels) as SortKey[]).map((key) => (
								<button
									key={key}
									role="option"
									aria-selected={sort === key}
									onClick={() => { setSort(key); setSortOpen(false) }}
									className={cn(
										'w-full text-left px-4 py-2 text-sm transition-colors',
										sort === key
											? 'text-[var(--color-primary-400)] bg-[var(--color-primary-600)]22'
											: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]',
									)}
								>
									{sortLabels[key]}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* ── Category pills ── */}
			<div className="flex gap-2 overflow-x-auto pb-2 mb-6 scroll-row" role="tablist" aria-label={t.games.allCategories}>
				<button
					role="tab"
					aria-selected={category === 'all'}
					onClick={() => handleCategory('all')}
					className={cn(
						'flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors',
						category === 'all'
							? 'border-[var(--color-primary-500)] bg-[var(--color-primary-600)] text-[var(--color-text-primary)]'
							: 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
					)}
				>
					{t.games.allCategories}
				</button>
				{gameCategories.map((cat) => (
					<button
						key={cat.id}
						role="tab"
						aria-selected={category === cat.id}
						onClick={() => handleCategory(cat.id)}
						className={cn(
							'flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors',
							category === cat.id
								? 'border-[var(--color-primary-500)] bg-[var(--color-primary-600)] text-[var(--color-text-primary)]'
								: 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
						)}
					>
						<span aria-hidden="true">{cat.icon}</span>
						{cat.label}
					</button>
				))}
			</div>

			{/* ── Results count ── */}
			<p className="text-xs text-[var(--color-text-muted)] mb-4" aria-live="polite">
				{filtered.length} {filtered.length === 1 ? 'game' : 'games'}
			</p>

			{/* ── Grid ── */}
			{filtered.length === 0 ? (
				<div className="text-center py-20">
					<p className="text-4xl mb-4" aria-hidden="true">🎲</p>
					<p className="text-[var(--color-text-secondary)]">{t.games.noResults}</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
						{visible.map((game) => (
							<GameCard key={game.id} game={game} locale={locale} />
						))}
					</div>

					{hasMore && (
						<div className="mt-8 text-center">
							<button
								onClick={() => setPage((p) => p + 1)}
								className={cn(
									'inline-flex items-center gap-2 px-8 py-3 rounded-[var(--radius-xl)] text-sm font-medium border border-[var(--color-border)]',
									'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary-500)] transition-colors',
								)}
							>
								{t.games.loadMore}
							</button>
						</div>
					)}
				</>
			)}
		</div>
	)
}
