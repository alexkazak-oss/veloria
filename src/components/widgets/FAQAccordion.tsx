'use client'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import type { FAQItem } from '../../types/common'

interface Props {
	items: FAQItem[]
	className?: string
}

export default function FAQAccordion({ items, className }: Props) {
	const [openId, setOpenId] = useState<string | null>(null)

	const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

	return (
		<ul className={cn('space-y-2', className)} role="list">
			{items.map((item) => {
				const isOpen = openId === item.id
				return (
					<li key={item.id} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] overflow-hidden">
						<button
							onClick={() => toggle(item.id)}
							className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
							aria-expanded={isOpen}
							aria-controls={`faq-panel-${item.id}`}
							id={`faq-btn-${item.id}`}
						>
							<span className="text-sm font-medium text-[var(--color-text-primary)]">
								{item.question}
							</span>
							<ChevronDown
								size={16}
								className={cn(
									'flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200',
									isOpen && 'rotate-180',
								)}
								aria-hidden="true"
							/>
						</button>

						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									id={`faq-panel-${item.id}`}
									role="region"
									aria-labelledby={`faq-btn-${item.id}`}
									key="panel"
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.22, ease: 'easeInOut' }}
									style={{ overflow: 'hidden' }}
								>
									<div className="px-5 pb-5">
										<p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
											{item.answer}
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				)
			})}
		</ul>
	)
}
