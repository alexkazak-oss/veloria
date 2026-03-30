'use client'

import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Locale } from '../../i18n/index'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	SidebarSeparator,
} from '../ui/Sidebar'
import type {
	ExpandableMenuItem,
	LinkMenuItem,
	PromoCardData,
	PromoGroupMenuItem,
	SectionHeaderMenuItem
} from './sidebarConfig'
import { getSidebarMenuItems, languages } from './sidebarConfig'

// ── ExpandableMenuGroup ───────────────────────────────────────────────────────

interface ExpandableMenuGroupProps {
	item: ExpandableMenuItem
	currentPath: string
	onChildClick?: () => void
}

function ExpandableMenuGroup({ item, currentPath, onChildClick }: ExpandableMenuGroupProps) {
	const hasActiveChild = item.children.some(
		(c) => currentPath === c.href || currentPath.startsWith(c.href),
	)
	const [expanded, setExpanded] = useState(hasActiveChild)
	const Icon = item.icon

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				onClick={() => setExpanded((p) => !p)}
				isActive={hasActiveChild}
				aria-expanded={expanded}
			>
				<Icon />
				<span className="flex-1 truncate">{item.label}</span>
				<ChevronDown
					className={cn(
						'ml-auto size-4 shrink-0 transition-transform duration-200',
						expanded && 'rotate-180',
					)}
				/>
			</SidebarMenuButton>

			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="sub"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
						className="overflow-hidden"
					>
						<SidebarMenuSub>
							{item.children.map((child) => {
								const isActive = currentPath === child.href
								const ChildIcon = child.icon
								return (
									<SidebarMenuSubItem key={child.id}>
										<SidebarMenuSubButton
											href={child.href}
											isActive={isActive}
											onClick={onChildClick}
										>
											{ChildIcon && <ChildIcon />}
											<span>{child.label}</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								)
							})}
						</SidebarMenuSub>
					</motion.div>
				)}
			</AnimatePresence>
		</SidebarMenuItem>
	)
}

// ── PromoCard ─────────────────────────────────────────────────────────────────

function PromoCard({ item }: { item: PromoCardData }) {
	return (
		<a
			href={item.href}
			className="flex items-center gap-3 px-2 py-2.5 rounded-md transition-all duration-150 hover:brightness-110 active:scale-[0.98] cursor-pointer select-none"
			style={{ background: item.gradient }}
		>
			<span className="text-xl leading-none shrink-0">{item.emoji}</span>
			<div className="min-w-0">
				<p className="text-sm font-semibold text-white leading-tight truncate">{item.label}</p>
				<p className="text-xs text-white/65 truncate">{item.sublabel}</p>
			</div>
		</a>
	)
}

// ── LanguageSelector ──────────────────────────────────────────────────────────

function LanguageSelector({ currentPath }: { currentPath: string }) {
	// Detect currently active locale from the URL path
	const activeCode = languages.find((l) => currentPath.startsWith(`/${l.code}/`))?.code ?? 'en'
	const selected = languages.find((l) => l.code === activeCode) ?? languages[0]
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [])

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				className={cn(
					'w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer select-none',
					'text-sidebar-foreground transition-colors duration-150',
					'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
				)}
			>
				<Globe className="size-4 shrink-0 opacity-60" />
				<span className="flex-1 text-left">
					{selected.flag} {selected.label}
				</span>
				<ChevronDown
					className={cn(
						'size-4 shrink-0 opacity-60 transition-transform duration-200',
						open && 'rotate-180',
					)}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.15 }}
						role="listbox"
						className="absolute bottom-full left-0 right-0 mb-1.5 rounded-lg overflow-hidden z-10 shadow-xl shadow-black/40"
						style={{
							background: 'var(--color-bg-card)',
							border: '1px solid var(--color-border-strong)',
						}}
					>
						{languages.map((lang) => (
							<li key={lang.code} role="option" aria-selected={selected.code === lang.code}>
								<a
									href={currentPath.replace(/\/[a-z]{2}\//, `/${lang.code}/`)}
									onClick={() => setOpen(false)}
									className={cn(
										'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors cursor-pointer select-none',
										selected.code === lang.code
											? 'text-primary-400 font-medium bg-[rgba(139,92,246,0.12)]'
											: 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
									)}
								>
									<span className="text-base leading-none">{lang.flag}</span>
									<span>{lang.label}</span>
								</a>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}

// ── SidebarPanel ──────────────────────────────────────────────────────────────

interface SidebarPanelProps {
	currentPath: string
	locale: Locale
	onClose: () => void
}

function SidebarPanel({ currentPath, locale, onClose }: SidebarPanelProps) {

	return (
		<div
			className="flex flex-col h-full bg-sidebar text-sidebar-foreground relative"
			style={{ borderRight: '1px solid var(--color-border-strong)' }}
		>
			{/* Header */}
			<SidebarHeader style={{ borderBottom: '1px solid var(--color-border)' }}>
				<div className="flex items-center justify-between px-2 py-1">
					<div className="flex items-center gap-2.5">
						<div
							className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-black shrink-0"
							style={{ background: 'linear-gradient(135deg, #7c3aed, #f59e0b)' }}
						>
							V
						</div>
						<span className="font-bold text-base tracking-tight">Veloria</span>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close menu"
						className="w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-sidebar-accent transition-all cursor-pointer shrink-0"
					>
						<X className="size-4" />
					</button>
				</div>
			</SidebarHeader>

			{/* Scrollable nav */}
			<SidebarContent>
				{getSidebarMenuItems(locale).map((item) => {
					// ── Separator ──────────────────────────────────────────────
					if (item.type === 'separator') {
						return <SidebarSeparator key={item.id} />
					}

					// ── Section header → SidebarGroup with label ───────────────
					if (item.type === 'section-header') {
						const h = item as SectionHeaderMenuItem
						return (
							<SidebarGroup key={item.id} className="pb-0 pt-2">
								<SidebarGroupLabel>{h.label}</SidebarGroupLabel>
							</SidebarGroup>
						)
					}

					// ── Promo cards ────────────────────────────────────────────
					if (item.type === 'promo-group') {
						const group = item as PromoGroupMenuItem
						return (
							<SidebarGroup key={item.id} className="pt-0">
								<SidebarGroupContent>
									<div className="flex flex-col gap-1">
										{group.items.map((card) => (
											<PromoCard key={card.id} item={card} />
										))}
									</div>
								</SidebarGroupContent>
							</SidebarGroup>
						)
					}

					// ── Expandable ─────────────────────────────────────────────
					if (item.type === 'expandable') {
						return (
							<SidebarGroup key={item.id} className="py-0">
								<SidebarGroupContent>
									<SidebarMenu>
										<ExpandableMenuGroup
											item={item as ExpandableMenuItem}
											currentPath={currentPath}
											onChildClick={onClose}
										/>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						)
					}

					// ── Normal link ────────────────────────────────────────────
					const link = item as LinkMenuItem
					const isActive =
						link.href !== '#' &&
						(currentPath === link.href || currentPath.startsWith(link.href))
					const Icon = link.icon
					return (
						<SidebarGroup key={item.id} className="py-0">
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											href={link.href}
											isActive={isActive}
											onClick={onClose}
										>
											<Icon />
											<span className="flex-1 truncate">{link.label}</span>
											{link.badge && (
												<Badge
													variant={link.badgeVariant ?? 'default'}
													className="shrink-0 text-[0.55rem] py-0 px-1.5 h-4"
												>
													{link.badge}
												</Badge>
											)}
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)
				})}
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter style={{ borderTop: '1px solid var(--color-border)' }}>
				<LanguageSelector currentPath={currentPath} />
			</SidebarFooter>

			{/* Rail */}
			<SidebarRail />
		</div>
	)
}

// ── AppSidebar ────────────────────────────────────────────────────────────────

export interface AppSidebarProps {
	currentPath?: string
	locale?: Locale
	className?: string
}

export default function AppSidebar({ currentPath = '/', locale = 'en', className }: AppSidebarProps) {
	const [open, setOpen] = useState(false)
	// true once the component has mounted in the browser (needed for portal + matchMedia)
	const [mounted, setMounted] = useState(false)
	// whether the viewport is "desktop" (≥ 1024px, Tailwind `lg`)
	const [isDesktop, setIsDesktop] = useState(false)
	// tracks the actual bottom edge of the sticky header in px (changes when promo bar scrolls away)
	const [headerBottom, setHeaderBottom] = useState(64)

	const close = useCallback(() => setOpen(false), [])
	const toggle = useCallback(() => setOpen((p) => !p), [])

	// ── Bootstrap ──────────────────────────────────────────────────────────────
	useEffect(() => {
		setMounted(true)
		const mql = window.matchMedia('(min-width: 1024px)')
		setIsDesktop(mql.matches)
		const onChange = (e: MediaQueryListEvent) => {
			setIsDesktop(e.matches)
			// If resizing from mobile→desktop while sidebar is open, release scroll lock
			if (e.matches) document.body.style.overflow = ''
		}
		mql.addEventListener('change', onChange)
		return () => mql.removeEventListener('change', onChange)
	}, [])

	// ── Track header bottom — for dynamic desktop sidebar positioning ──────────
	// The promo bar above the header is not sticky, so when the page is at the top
	// the header's visual bottom is higher than 4rem. We read the real value on
	// every scroll / resize so the sidebar panel is always flush with the header.
	useEffect(() => {
		if (!mounted) return
		const header = document.getElementById('site-header')
		if (!header) return

		const update = () => {
			const rect = header.getBoundingClientRect()
			setHeaderBottom(Math.max(Math.round(rect.bottom), 0))
		}

		update()
		window.addEventListener('scroll', update, { passive: true })
		const ro = new ResizeObserver(update)
		ro.observe(header)
		return () => {
			window.removeEventListener('scroll', update)
			ro.disconnect()
		}
	}, [mounted])

	// ── Body scroll lock — MOBILE ONLY ─────────────────────────────────────────
	// On desktop the sidebar lives beside the page; no viewport blocking.
	useEffect(() => {
		if (!mounted) return
		document.body.style.overflow = open && !isDesktop ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [open, isDesktop, mounted])

	// ── Escape to close ────────────────────────────────────────────────────────
	useEffect(() => {
		const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [close])

	// ── Portal content ─────────────────────────────────────────────────────────
	// Rendered into document.body so it escapes the sticky header's stacking
	// context and z-index comparisons are made at the root level.
	const portalContent = (
		<AnimatePresence>
			{open && (
				<>
					{/*
					 * Backdrop — MOBILE ONLY.
					 * On desktop there is intentionally no overlay so the page
					 * behind the sidebar remains fully scrollable and interactive.
					 */}
					{!isDesktop && (
						<motion.div
							key="sb-backdrop"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={close}
							aria-hidden="true"
							style={{
								position: 'fixed',
								inset: 0,
								// z-index 200: above sticky header (z-100) on mobile
								zIndex: 200,
								background: 'rgba(0,0,0,0.55)',
								backdropFilter: 'blur(4px)',
								WebkitBackdropFilter: 'blur(4px)',
							}}
						/>
					)}

					{/*
					 * Sidebar panel.
					 *
					 * Desktop  → fixed below the sticky site header (top: 4rem = h-16),
					 *            height fills the rest of the viewport.
					 *            z-index 50: below the site header (z-100) so the header
					 *            is always legible. No overlay; the rest of the page is
					 *            fully interactive.
					 *
					 * Mobile   → full-height drawer from the very top (top: 0), covering
					 *            the site header.
					 *            z-index 201: above the backdrop (200) and header (100).
					 */}
					<motion.aside
						id="app-sidebar"
						key="sb-panel"
						initial={{ x: '-100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
						aria-label="Navigation sidebar"
						style={
							isDesktop
								? {
									position: 'fixed',
									top: headerBottom,    // dynamic: flush with actual header bottom
									left: 0,
									height: `calc(100dvh - ${headerBottom}px)`,
									width: 'var(--sidebar-width, 18rem)',
									zIndex: 50,
									boxShadow: '2px 0 24px rgba(0,0,0,0.45)',
								}
								: {
									position: 'fixed',
									top: 0,
									left: 0,
									bottom: 0,
									width: 'min(var(--sidebar-width, 18rem), 88vw)',
									zIndex: 201,
									boxShadow: '4px 0 32px rgba(0,0,0,0.55)',
								}
						}
					>
						<SidebarPanel currentPath={currentPath} locale={locale} onClose={close} />
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	)

	return (
		<>
			{/* Trigger button — lives inside the site header */}
			<button
				type="button"
				onClick={toggle}
				aria-label={open ? 'Close sidebar' : 'Open sidebar'}
				aria-expanded={open}
				aria-controls="app-sidebar"
				className={cn(
					'p-2 rounded-lg transition-colors cursor-pointer',
					'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
					// Give pressed state on desktop when sidebar is open
					open && isDesktop && 'text-text-primary bg-bg-elevated',
					className,
				)}
			>
				<Menu className="size-5" />
			</button>

			{/*
			 * Portal to document.body.
			 * This ensures the sidebar and backdrop are NOT inside the sticky
			 * header's stacking context (sticky + z-index creates one), so their
			 * own z-index values compare at the root level as intended.
			 */}
			{mounted && createPortal(portalContent, document.body)}
		</>
	)
}
