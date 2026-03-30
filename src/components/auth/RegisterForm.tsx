'use client'

import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import type { Locale } from '../../i18n/index'
import { useTranslations } from '../../i18n/index'
import { register, type RegisterPayload } from '../../lib/auth'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RegisterFormProps {
	locale: Locale
	/** Where to navigate after successful registration. Falls back to the
	 *  `redirectTo` field in the backend response, then to `/{locale}/`. */
	redirectTo?: string
}

/** Internal form state — extends RegisterPayload with confirmation + terms. */
interface FormValues extends RegisterPayload {
	passwordConfirm: string
	acceptTerms: boolean
}

interface FormErrors {
	name?: string
	email?: string
	password?: string
	passwordConfirm?: string
	acceptTerms?: string
	general?: string
}

// ---------------------------------------------------------------------------
// Password strength
// ---------------------------------------------------------------------------

interface StrengthInfo {
	score: number   // 1–4
	label: string
	color: string   // Tailwind bg-* class
}

const PASSWORD_MIN_LENGTH = 8

function getPasswordStrength(password: string): StrengthInfo {
	let score = 0
	if (password.length >= PASSWORD_MIN_LENGTH) score++
	if (/[A-Z]/.test(password)) score++
	if (/[0-9]/.test(password)) score++
	if (/[^A-Za-z0-9]/.test(password)) score++

	if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' }
	if (score === 2) return { score, label: 'Fair', color: 'bg-yellow-500' }
	if (score === 3) return { score, label: 'Good', color: 'bg-emerald-400' }
	return { score, label: 'Strong', color: 'bg-green-500' }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
	values: FormValues,
	t: ReturnType<typeof useTranslations>,
): FormErrors {
	const errors: FormErrors = {}

	if (!values.name.trim())
		errors.name = t.auth.nameRequired

	if (!values.email.trim())
		errors.email = t.auth.emailRequired
	else if (!EMAIL_RE.test(values.email))
		errors.email = t.auth.emailInvalid

	if (!values.password)
		errors.password = t.auth.passwordRequired
	else if (values.password.length < PASSWORD_MIN_LENGTH)
		errors.password = t.auth.passwordTooShort

	if (!values.passwordConfirm)
		errors.passwordConfirm = t.auth.passwordConfirmRequired
	else if (values.password !== values.passwordConfirm)
		errors.passwordConfirm = t.auth.passwordMismatch

	if (!values.acceptTerms)
		errors.acceptTerms = t.auth.acceptTermsRequired

	return errors
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const INITIAL_VALUES: FormValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTerms: false,
}

export default function RegisterForm({ locale, redirectTo }: RegisterFormProps) {
	const t = useTranslations(locale)

	const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
	const [errors, setErrors] = useState<FormErrors>({})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [loading, setLoading] = useState(false)

	const strength = values.password ? getPasswordStrength(values.password) : null

	/** Generic field-change handler — clears the field error on first keystroke. */
	function set<K extends keyof FormValues>(field: K) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value =
				field === 'acceptTerms'
					? (e.target.checked as FormValues[K])
					: (e.target.value as FormValues[K])
			setValues((prev) => ({ ...prev, [field]: value }))
			if (errors[field as keyof FormErrors])
				setErrors((prev) => ({ ...prev, [field]: undefined }))
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const fieldErrors = validate(values, t)
		if (Object.keys(fieldErrors).length > 0) {
			setErrors(fieldErrors)
			return
		}

		setLoading(true)
		setErrors({})

		// Strip confirm + terms before sending to the backend
		const payload: RegisterPayload = {
			name: values.name.trim(),
			email: values.email.trim().toLowerCase(),
			password: values.password,
		}

		const result = await register(payload)
		setLoading(false)

		if (!result.ok) {
			const { field, message } = result.error
			// Map backend field errors to local form fields where possible
			if (field && field in INITIAL_VALUES) {
				setErrors({ [field]: message })
			} else {
				setErrors({ general: message })
			}
			return
		}

		// Auth cookie is stored by the browser (HttpOnly via Set-Cookie).
		// The backend also issues a 303 See Other for non-JS clients.
		const target = redirectTo ?? result.data.redirectTo ?? `/${locale}/`
		window.location.href = target
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			{/* General error banner */}
			{errors.general && (
				<div
					role="alert"
					aria-live="assertive"
					className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
				>
					<span className="mt-0.5 shrink-0" aria-hidden="true">⚠</span>
					<span>{errors.general}</span>
				</div>
			)}

			{/* Name */}
			<Input
				label={t.auth.name}
				type="text"
				name="name"
				autoComplete="name"
				placeholder={t.auth.namePlaceholder}
				value={values.name}
				onChange={set('name')}
				error={errors.name}
				leftIcon={<User className="size-4" />}
				disabled={loading}
				required
			/>

			{/* Email */}
			<Input
				label={t.auth.email}
				type="email"
				name="email"
				autoComplete="email"
				placeholder={t.auth.emailPlaceholder}
				value={values.email}
				onChange={set('email')}
				error={errors.email}
				leftIcon={<Mail className="size-4" />}
				disabled={loading}
				required
			/>

			{/* Password + strength meter */}
			<div className="flex flex-col gap-1.5">
				<Input
					label={t.auth.password}
					type={showPassword ? 'text' : 'password'}
					name="password"
					autoComplete="new-password"
					placeholder={t.auth.passwordPlaceholder}
					value={values.password}
					onChange={set('password')}
					error={errors.password}
					leftIcon={<Lock className="size-4" />}
					rightIcon={
						<button
							type="button"
							onClick={() => setShowPassword((p) => !p)}
							aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
							className="cursor-pointer text-inherit transition-colors hover:text-[var(--color-text-primary)]"
						>
							{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
						</button>
					}
					disabled={loading}
					required
				/>

				{/* Strength bar — shown only when a value is typed and there's no error */}
				{strength && !errors.password && (
					<div className="flex items-center gap-2 px-1" aria-hidden="true">
						<div className="flex flex-1 gap-1">
							{([1, 2, 3, 4] as const).map((i) => (
								<div
									key={i}
									className={cn(
										'h-1 flex-1 rounded-full transition-all duration-300',
										i <= strength.score
											? strength.color
											: 'bg-[var(--color-border)]',
									)}
								/>
							))}
						</div>
						<span className="text-xs text-[var(--color-text-muted)]">{strength.label}</span>
					</div>
				)}
			</div>

			{/* Confirm password */}
			<Input
				label={t.auth.passwordConfirm}
				type={showConfirm ? 'text' : 'password'}
				name="password_confirm"
				autoComplete="new-password"
				placeholder={t.auth.passwordPlaceholder}
				value={values.passwordConfirm}
				onChange={set('passwordConfirm')}
				error={errors.passwordConfirm}
				leftIcon={<Lock className="size-4" />}
				rightIcon={
					<button
						type="button"
						onClick={() => setShowConfirm((p) => !p)}
						aria-label={showConfirm ? t.auth.hidePassword : t.auth.showPassword}
						className="cursor-pointer text-inherit transition-colors hover:text-[var(--color-text-primary)]"
					>
						{showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
					</button>
				}
				disabled={loading}
				required
			/>

			{/* Accept terms */}
			<div className="flex flex-col gap-1.5">
				<label
					className={cn(
						'flex cursor-pointer select-none items-start gap-3',
						loading && 'cursor-not-allowed opacity-50',
					)}
				>
					<input
						type="checkbox"
						name="acceptTerms"
						checked={values.acceptTerms}
						onChange={set('acceptTerms')}
						disabled={loading}
						aria-describedby={errors.acceptTerms ? 'terms-error' : undefined}
						className="mt-0.5 size-4 cursor-pointer accent-[var(--color-primary-500)]"
					/>
					<span className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
						{t.auth.acceptTerms}{' '}
						<a
							href={`/${locale}/terms/`}
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold text-[var(--color-primary-400)] transition-colors hover:text-[var(--color-primary-300)]"
						>
							{t.auth.termsLink}
						</a>
					</span>
				</label>

				{errors.acceptTerms && (
					<p
						id="terms-error"
						role="alert"
						className="px-1 text-xs text-[var(--color-danger)]"
					>
						{errors.acceptTerms}
					</p>
				)}
			</div>

			<Button type="submit" fullWidth loading={loading} size="lg" className="mt-1">
				{loading ? t.auth.registering : t.auth.register}
			</Button>

			<p className="text-center text-sm text-[var(--color-text-muted)]">
				{t.auth.hasAccount}{' '}
				<a
					href={`/${locale}/login/`}
					className="font-semibold text-[var(--color-primary-400)] transition-colors hover:text-[var(--color-primary-300)]"
				>
					{t.auth.signIn}
				</a>
			</p>
		</form>
	)
}
