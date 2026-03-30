'use client'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { cn } from '../../lib/utils'

interface AccordionItem {
	id?: string
	question: string
	answer: string
}

interface AccordionProps {
	items: AccordionItem[]
	className?: string
	allowMultiple?: boolean
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
	const [openIds, setOpenIds] = useState<Set<string>>(new Set())
	const baseId = useId()

	function toggle(id: string) {
		setOpenIds((prev) => {
			const next = allowMultiple ? new Set(prev) : new Set<string>()
			if (prev.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	return (
		<dl className={cn('flex flex-col divide-y divide-[var(--color-border)]', className)}>
			{items.map((item, idx) => {
				const id = item.id ?? `${baseId}-${idx}`
				const isOpen = openIds.has(id)
				const headerId = `${id}-header`
				const panelId = `${id}-panel`

				return (
					<div key={id} className="py-1">
						<dt>
							<button
								id={headerId}
								aria-expanded={isOpen}
								aria-controls={panelId}
								onClick={() => toggle(id)}
								className={cn(
									'flex w-full items-center justify-between gap-4',
									'py-4 px-1 text-left cursor-pointer',
									'text-[var(--color-text-primary)] font-medium text-sm md:text-base',
									'transition-colors duration-[var(--transition-fast)]',
									'hover:text-[var(--color-primary-400)]',
									isOpen && 'text-[var(--color-primary-400)]',
								)}
							>
								<span>{item.question}</span>
								<motion.span
									animate={{ rotate: isOpen ? 180 : 0 }}
									transition={{ duration: 0.2 }}
									className="shrink-0 text-[var(--color-text-muted)]"
									aria-hidden="true"
								>
									<ChevronDown size={18} />
								</motion.span>
							</button>
						</dt>

						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.dd
									id={panelId}
									role="region"
									aria-labelledby={headerId}
									key={`${id}-panel`}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: 'easeInOut' }}
									className="overflow-hidden"
								>
									<p className="pb-4 px-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">
										{item.answer}
									</p>
								</motion.dd>
							)}
						</AnimatePresence>
					</div>
				)
			})}
		</dl>
	)
}
