'use client'

import {
	createContext,
	useContext,
	useId,
	useState,
	type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

interface TabsContextValue {
	active: string
	setActive: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
	const ctx = useContext(TabsContext)
	if (!ctx) throw new Error('Tab components must be used inside <Tabs>')
	return ctx
}

interface TabsProps {
	defaultValue: string
	value?: string
	onChange?: (value: string) => void
	children: ReactNode
	className?: string
}

export function Tabs({ defaultValue, value, onChange, children, className }: TabsProps) {
	const [internal, setInternal] = useState(defaultValue)
	const active = value ?? internal
	const setActive = (v: string) => {
		setInternal(v)
		onChange?.(v)
	}

	return (
		<TabsContext.Provider value={{ active, setActive }}>
			<div className={cn('flex flex-col', className)}>{children}</div>
		</TabsContext.Provider>
	)
}

interface TabListProps {
	children: ReactNode
	className?: string
	variant?: 'underline' | 'chips'
}

export function TabList({ children, className, variant = 'underline' }: TabListProps) {
	return (
		<div
			role="tablist"
			className={cn(
				variant === 'underline'
					? 'flex gap-0 border-b border-[var(--color-border)] overflow-x-auto scrollbar-none'
					: 'flex gap-2 flex-wrap',
				className,
			)}
		>
			{children}
		</div>
	)
}

interface TabProps {
	value: string
	children: ReactNode
	className?: string
	variant?: 'underline' | 'chips'
	count?: number
}

export function Tab({ value, children, className, variant = 'underline', count }: TabProps) {
	const { active, setActive } = useTabs()
	const uid = useId()
	const isActive = active === value

	if (variant === 'chips') {
		return (
			<button
				id={`tab-${uid}`}
				role="tab"
				aria-selected={isActive}
				onClick={() => setActive(value)}
				className={cn(
					'px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium',
					'transition-all duration-[var(--transition-fast)] whitespace-nowrap cursor-pointer',
					isActive
						? 'bg-[var(--color-primary-600)] text-white shadow-[var(--shadow-glow-primary)]'
						: 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] border border-[var(--color-border)]',
					className,
				)}
			>
				{children}
				{count !== undefined && (
					<span className={cn('ml-1.5 text-xs', isActive ? 'opacity-80' : 'opacity-50')}>
						{count}
					</span>
				)}
			</button>
		)
	}

	return (
		<button
			id={`tab-${uid}`}
			role="tab"
			aria-selected={isActive}
			onClick={() => setActive(value)}
			className={cn(
				'relative px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer',
				'transition-colors duration-[var(--transition-fast)]',
				'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
				'after:transition-all after:duration-[var(--transition-base)]',
				isActive
					? 'text-[var(--color-text-primary)] after:bg-[var(--color-primary-500)]'
					: 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] after:bg-transparent',
				className,
			)}
		>
			{children}
			{count !== undefined && (
				<span className={cn('ml-1.5 text-xs', isActive ? 'text-[var(--color-primary-400)]' : 'opacity-50')}>
					{count}
				</span>
			)}
		</button>
	)
}

interface TabPanelProps {
	value: string
	children: ReactNode
	className?: string
}

export function TabPanel({ value, children, className }: TabPanelProps) {
	const { active } = useTabs()
	if (active !== value) return null
	return (
		<div role="tabpanel" className={cn('mt-6', className)}>
			{children}
		</div>
	)
}
