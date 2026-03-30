
const API_BASE = (import.meta.env.PUBLIC_API_BASE as string | undefined) ?? ''

export interface AuthUser {
	id: string
	name: string
	email: string
}


export interface AuthSuccessResponse {
	user: AuthUser

	redirectTo: string
}

export interface AuthErrorResponse {
	/** Machine-readable code for programmatic handling. */
	code: string
	/** Human-readable message — safe to display to the user. */
	message: string
	/** Set when the error is tied to a specific form field. */
	field?: keyof LoginPayload | keyof RegisterPayload
}

export type AuthResult<T> =
	| {ok: true; data: T}
	| {ok: false; error: AuthErrorResponse}

export interface LoginPayload {
	email: string
	password: string
}

export interface RegisterPayload {
	name: string
	email: string
	password: string
}

// Core fetch utility

async function authFetch<T>(
	path: string,
	body: LoginPayload | RegisterPayload,
): Promise<AuthResult<T>> {
	let response: Response

	try {
		response = await fetch(`${API_BASE}${path}`, {
			method: 'POST',
			
			credentials: 'include',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		})
	} catch {
		return {
			ok: false,
			error: {
				code: 'NETWORK_ERROR',
				message: 'Network error. Please check your connection and try again.',
			},
		}
	}

	if (response.ok) {
		const data = (await response.json()) as T
		return {ok: true, data}
	}

	
	try {
		const error = (await response.json()) as AuthErrorResponse
		return {ok: false, error}
	} catch {
		return {
			ok: false,
			error: {
				code: `HTTP_${response.status}`,
				message: `Error ${response.status}: ${response.statusText || 'Something went wrong.'}`,
			},
		}
	}
}


// Public API


/** POST /api/auth/login */
export function login(
	payload: LoginPayload,
): Promise<AuthResult<AuthSuccessResponse>> {
	return authFetch<AuthSuccessResponse>('/api/auth/login', payload)
}

/** POST /api/auth/register */
export function register(
	payload: RegisterPayload,
): Promise<AuthResult<AuthSuccessResponse>> {
	return authFetch<AuthSuccessResponse>('/api/auth/register', payload)
}
