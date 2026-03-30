import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, leftIcon, rightIcon, hint, className, id, ...props }, ref) => {
		const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

		return (
			<div className="flex flex-col gap-1.5 w-full">
				{label && (
					<label
						htmlFor={inputId}
						className="text-sm font-medium text-[var(--color-text-secondary)]"
					>
						{label}
					</label>
				)}

				<div className="relative flex items-center">
					{leftIcon && (
						<span
							className="absolute left-3 text-[var(--color-text-muted)] pointer-events-none"
							aria-hidden="true"
						>
							{leftIcon}
						</span>
					)}

					<input
						ref={ref}
						id={inputId}
						className={cn(
							'w-full bg-[var(--color-bg-elevated)] border rounded-[var(--radius-xl)]',
							'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
							'px-4 py-2.5 text-sm',
							'transition-all duration-[var(--transition-fast)]',
							'focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]',
							error
								? 'border-[var(--color-danger)]'
								: 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]',
							leftIcon ? 'pl-10' : undefined,
							rightIcon ? 'pr-10' : undefined,
							className,
						)}
						aria-invalid={error ? 'true' : undefined}
						aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
						{...props}
					/>

					{rightIcon && (
						<span
							className="absolute right-3 text-[var(--color-text-muted)]"
							aria-hidden="true"
						>
							{rightIcon}
						</span>
					)}
				</div>

				{error && (
					<p id={`${inputId}-error`} role="alert" className="text-xs text-[var(--color-danger)]">
						{error}
					</p>
				)}
				{hint && !error && (
					<p id={`${inputId}-hint`} className="text-xs text-[var(--color-text-muted)]">
						{hint}
					</p>
				)}
			</div>
		)
	},
)

Input.displayName = 'Input'
