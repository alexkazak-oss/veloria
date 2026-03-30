import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant
	size?: Size
	loading?: boolean
	fullWidth?: boolean
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	children: ReactNode
}

const variantStyles: Record<Variant, string> = {
	primary: 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)] text-white shadow-[var(--shadow-glow-primary)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)]',
	secondary: 'bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)]',
	outline: 'bg-transparent border border-[var(--color-primary-600)] text-[var(--color-primary-400)] hover:bg-[var(--color-primary-600)] hover:text-white',
	ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
	gold: 'bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-600)] hover:from-[var(--color-gold-400)] hover:to-[var(--color-gold-500)] text-[var(--color-text-inverse)] font-bold shadow-[var(--shadow-glow-gold)]',
	danger: 'bg-[var(--color-danger)] hover:bg-red-600 text-white',
}

const sizeStyles: Record<Size, string> = {
	xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-[var(--radius-md)]',
	sm: 'px-4 py-2 text-sm gap-2 rounded-[var(--radius-lg)]',
	md: 'px-5 py-2.5 text-sm gap-2 rounded-[var(--radius-xl)]',
	lg: 'px-7 py-3.5 text-base gap-2.5 rounded-[var(--radius-xl)]',
	xl: 'px-9 py-4 text-lg gap-3 rounded-[var(--radius-2xl)]',
}

export function Button({
	variant = 'primary',
	size = 'md',
	loading = false,
	fullWidth = false,
	leftIcon,
	rightIcon,
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	const isDisabled = disabled || loading

	return (
		<button
			disabled={isDisabled}
			className={cn(
				'inline-flex items-center justify-center font-semibold',
				'transition-all duration-[var(--transition-base)]',
				'focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2',
				'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
				'cursor-pointer select-none whitespace-nowrap',
				variantStyles[variant],
				sizeStyles[size],
				fullWidth && 'w-full',
				className,
			)}
			{...props}
		>
			{loading ? (
				<>
					<Spinner size={size} />
					<span>Loading…</span>
				</>
			) : (
				<>
					{leftIcon}
					{children}
					{rightIcon}
				</>
			)}
		</button>
	)
}

function Spinner({ size }: { size: Size }) {
	const dim = size === 'xs' || size === 'sm' ? 14 : 16
	return (
		<svg
			width={dim}
			height={dim}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			className="animate-spin"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				d="M12 2a10 10 0 1 0 10 10"
				opacity={0.3}
			/>
			<path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
		</svg>
	)
}
