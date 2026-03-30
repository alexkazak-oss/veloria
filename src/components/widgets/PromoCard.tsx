'use client'

import { CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import type { Promotion } from '../../types/promotion'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface Props {
	promo: Promotion
	className?: string
}

export function PromoCard({ promo, className }: Props) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<article
				className={cn('card group relative flex flex-col overflow-hidden cursor-pointer neon-border', className)}
				onClick={() => setOpen(true)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
				aria-label={`View details: ${promo.title}`}
			>
				{/* Gradient header */}
				<div
					className="relative h-40 flex items-center justify-center p-6"
					style={{ background: promo.gradient }}
				>
					{/* Amount bubble */}
					<span className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
						{promo.amount}
					</span>

					{/* Badges */}
					<div className="absolute top-3 left-3 flex gap-1.5">
						{promo.isNew && <Badge variant="new">NEW</Badge>}
						{promo.isPopular && <Badge variant="featured">Popular</Badge>}
					</div>
					{promo.badge && (
						<div className="absolute top-3 right-3">
							<Badge variant="promo">{promo.badge}</Badge>
						</div>
					)}
				</div>

				{/* Body */}
				<div className="flex flex-col flex-1 p-4 gap-3">
					<div>
						<p className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--color-primary-400)] mb-1">
							{promo.type}
						</p>
						<h3 className="text-base font-bold text-[var(--color-text-primary)]">{promo.title}</h3>
						<p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{promo.subtitle}</p>
					</div>

					<dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mt-auto">
						<div>
							<dt className="text-[var(--color-text-muted)]">Min. Deposit</dt>
							<dd className="font-medium text-[var(--color-text-primary)]">
								{promo.minDeposit === 0 ? 'Free' : `€${promo.minDeposit}`}
							</dd>
						</div>
						<div>
							<dt className="text-[var(--color-text-muted)]">Wagering</dt>
							<dd className="font-medium text-[var(--color-text-primary)]">{promo.wagering}</dd>
						</div>
					</dl>

					<Button
						variant="primary"
						size="sm"
						fullWidth
						className="mt-1"
						onClick={(e) => { e.stopPropagation(); setOpen(true) }}
					>
						Claim Now
					</Button>
				</div>
			</article>

			{/* Detail modal */}
			<Modal open={open} onClose={() => setOpen(false)} title={promo.title} size="lg">
				<div className="p-6 flex flex-col gap-6">
					{/* Hero */}
					<div
						className="h-32 rounded-[var(--radius-xl)] flex items-center justify-center"
						style={{ background: promo.gradient }}
					>
						<span className="text-4xl font-extrabold text-white">{promo.amount}</span>
					</div>

					<div>
						<h3 className="text-lg font-bold text-[var(--color-text-primary)]">{promo.subtitle}</h3>
						<p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
							{promo.description}
						</p>
					</div>

					{/* Key stats */}
					<dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						{[
							{ label: 'Bonus Amount', value: promo.amount },
							{ label: 'Min. Deposit', value: promo.minDeposit === 0 ? 'Free' : `€${promo.minDeposit}` },
							{ label: 'Wagering', value: promo.wagering },
						].map((s) => (
							<div
								key={s.label}
								className="p-3 rounded-[var(--radius-xl)] text-center"
								style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
							>
								<dt className="text-xs text-[var(--color-text-muted)] mb-1">{s.label}</dt>
								<dd className="text-lg font-bold text-[var(--color-text-primary)]">{s.value}</dd>
							</div>
						))}
					</dl>

					{/* Terms list */}
					<div>
						<h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">Terms & Conditions</h4>
						<ul className="flex flex-col gap-2">
							{promo.terms.map((term, i) => (
								<li key={i} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
									<CheckCircle size={14} className="mt-0.5 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
									{term}
								</li>
							))}
						</ul>
					</div>

					<div className="flex gap-3 pt-2 border-t border-[var(--color-border)]">
						<Button variant="primary" size="lg" fullWidth onClick={() => setOpen(false)}>
							Claim Now (Demo)
						</Button>
						<Button variant="outline" size="lg" onClick={() => setOpen(false)}>
							Close
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
