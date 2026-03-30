'use client'

import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import type { Locale } from '../../i18n/index'
import { useTranslations } from '../../i18n/index'
import { login, type LoginPayload } from '../../lib/auth'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface LoginFormProps {
	locale: Locale
	/** Where to navigate after a successful login. Falls back to `redirectTo`
	 *  from the backend response, then to the locale root. */
	redirectTo?: string
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

interface FormErrors {
	email?: string
	password?: string
	general?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: LoginPayload, t: ReturnType<typeof useTranslations>): FormErrors {
	const errors: FormErrors = {}
	if (!values.email.trim()) {
		errors.email = t.auth.emailRequired
	} else if (!EMAIL_RE.test(values.email)) {
		errors.email = t.auth.emailInvalid
	}
	if (!values.password) {
		errors.password = t.auth.passwordRequired
	}
	return errors
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LoginForm({ locale, redirectTo }: LoginFormProps) {
	const t = useTranslations(locale)

	const [values, setValues] = useState<LoginPayload>({ email: '', password: '' })
	const [errors, setErrors] = useState<FormErrors>({})
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	function handleChange(field: keyof LoginPayload) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setValues((prev) => ({ ...prev, [field]: e.target.value }))
			// Clear the field error as the user types
			if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
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

		const result = await login(values)
		setLoading(false)

		if (!result.ok) {
			const { field, message } = result.error
			if (field === 'email' || field === 'password') {
				setErrors({ [field]: message })
			} else {
				setErrors({ general: message })
			}
			return
		}

		// Auth cookie is now set by the browser (HttpOnly via Set-Cookie).
		// Navigate to the intended destination.
		const target = redirectTo ?? result.data.redirectTo ?? `/${locale}/`
		window.location.href = target
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

			<Input
				label={t.auth.email}
				type="email"
				name="email"
				autoComplete="email"
				placeholder={t.auth.emailPlaceholder}
				value={values.email}
				onChange={handleChange('email')}
				error={errors.email}
				leftIcon={<Mail className="size-4" />}
				disabled={loading}
				required
			/>

			<Input
				label={t.auth.password}
				type={showPassword ? 'text' : 'password'}
				name="password"
				autoComplete="current-password"
				placeholder={t.auth.passwordPlaceholder}
				value={values.password}
				onChange={handleChange('password')}
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

			{/* Forgot password link */}
			<div className="flex justify-end -mt-2">
				<a
					href={`/${locale}/forgot-password/`}
					className={cn(
						'text-xs text-[var(--color-text-muted)] transition-colors',
						'hover:text-[var(--color-primary-400)]',
					)}
				>
					{t.auth.forgotPassword}
				</a>
			</div>

			<Button type="submit" fullWidth loading={loading} size="lg">
				{loading ? t.auth.loggingIn : t.auth.login}
			</Button>

			<p className="text-center text-sm text-[var(--color-text-muted)]">
				{t.auth.noAccount}{' '}
				<a
					href={`/${locale}/register/`}
					className="font-semibold text-[var(--color-primary-400)] transition-colors hover:text-[var(--color-primary-300)]"
				>
					{t.auth.signUp}
				</a>
			</p>
		</form>
	)
}
