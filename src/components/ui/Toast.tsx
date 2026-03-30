'use client'

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import {
	createContext,
	useCallback,
	useContext,
	useReducer,
	type ReactNode
} from 'react'
import { cn } from '../../lib/utils'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
	id: string
	type: ToastType
	title: string
	message?: string
	duration: number
}

type ToastAction =
	| { type: 'ADD'; toast: ToastItem }
	| { type: 'REMOVE'; id: string }

function toastReducer(state: ToastItem[], action: ToastAction): ToastItem[] {
	switch (action.type) {
		case 'ADD': return [...state, action.toast]
		case 'REMOVE': return state.filter((t) => t.id !== action.id)
		default: return state
	}
}

interface ToastContextValue {
	toast: (options: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
	return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, dispatch] = useReducer(toastReducer, [])

	const toast = useCallback((options: Omit<ToastItem, 'id'>) => {
		const id = crypto.randomUUID()
		dispatch({ type: 'ADD', toast: { ...options, id } })
		setTimeout(() => dispatch({ type: 'REMOVE', id }), options.duration)
	}, [])

	const remove = useCallback((id: string) => dispatch({ type: 'REMOVE', id }), [])

	return (
		<ToastContext.Provider value={{ toast }}>
			{children}
			<div
				aria-live="polite"
				aria-label="Notifications"
				className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-3 pointer-events-none"
			>
				<AnimatePresence initial={false}>
					{toasts.map((t) => (
						<ToastItem key={t.id} item={t} onRemove={() => remove(t.id)} />
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	)
}

const typeStyles: Record<ToastType, { bg: string; icon: ReactNode; border: string }> = {
	success: {
		bg: 'bg-[var(--color-bg-elevated)]',
		border: 'border-[var(--color-success)]',
		icon: <CheckCircle size={18} className="text-[var(--color-success)]" />,
	},
	error: {
		bg: 'bg-[var(--color-bg-elevated)]',
		border: 'border-[var(--color-danger)]',
		icon: <AlertCircle size={18} className="text-[var(--color-danger)]" />,
	},
	info: {
		bg: 'bg-[var(--color-bg-elevated)]',
		border: 'border-[var(--color-primary-500)]',
		icon: <Info size={18} className="text-[var(--color-primary-400)]" />,
	},
	warning: {
		bg: 'bg-[var(--color-bg-elevated)]',
		border: 'border-[var(--color-warning)]',
		icon: <AlertCircle size={18} className="text-[var(--color-warning)]" />,
	},
}

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: () => void }) {
	const styles = typeStyles[item.type]

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 10, scale: 0.95 }}
			transition={{ duration: 0.22, ease: 'easeOut' }}
			role="alert"
			className={cn(
				'pointer-events-auto flex items-start gap-3',
				'w-80 p-4 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)]',
				'border-l-4',
				styles.bg,
				styles.border,
				'border border-[var(--color-border)]',
			)}
		>
			<span className="mt-0.5 shrink-0">{styles.icon}</span>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</p>
				{item.message && (
					<p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{item.message}</p>
				)}
			</div>
			<button
				onClick={onRemove}
				aria-label="Dismiss notification"
				className="shrink-0 p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
			>
				<X size={14} />
			</button>
		</motion.div>
	)
}

/** Demo trigger button — shows all toast types in sequence */
export function ToastDemo() {
	const { toast } = useToast()

	function fireDemo() {
		toast({ type: 'success', title: 'Bonus Activated!', message: 'Your welcome pack is ready to use.', duration: 4000 })
		setTimeout(() => toast({ type: 'info', title: 'New Tournament', message: 'Veloria Grand Prix just started.', duration: 4500 }), 600)
		setTimeout(() => toast({ type: 'warning', title: 'Wagering Reminder', message: '35× wagering applies to bonus funds.', duration: 5000 }), 1200)
	}

	return (
		<button
			onClick={fireDemo}
			className="px-4 py-2 text-sm font-medium bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-xl)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
		>
			Demo Notifications
		</button>
	)
}
