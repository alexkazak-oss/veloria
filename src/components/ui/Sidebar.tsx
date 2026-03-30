'use client'

/**
 * Shadcn-compatible sidebar UI primitives.
 * Uses --color-sidebar-* CSS tokens defined in global.css @theme {}.
 */

import * as React from 'react'
import { cn } from '../../lib/utils'

// ── SidebarHeader ─────────────────────────────────────────────────────────────

export const SidebarHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="header"
		className={cn('flex flex-col gap-2 p-2', className)}
		{...props}
	/>
))
SidebarHeader.displayName = 'SidebarHeader'

// ── SidebarContent ────────────────────────────────────────────────────────────

export const SidebarContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="content"
		className={cn('flex flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain', className)}
		{...props}
	/>
))
SidebarContent.displayName = 'SidebarContent'

// ── SidebarFooter ─────────────────────────────────────────────────────────────

export const SidebarFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="footer"
		className={cn('flex flex-col gap-2 p-2', className)}
		{...props}
	/>
))
SidebarFooter.displayName = 'SidebarFooter'

// ── SidebarSeparator ──────────────────────────────────────────────────────────

export const SidebarSeparator = React.forwardRef<
	HTMLHRElement,
	React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
	<hr
		ref={ref}
		data-sidebar="separator"
		className={cn('mx-2 my-0.5 border-sidebar-border', className)}
		{...props}
	/>
))
SidebarSeparator.displayName = 'SidebarSeparator'

// ── SidebarGroup ──────────────────────────────────────────────────────────────

export const SidebarGroup = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="group"
		className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
		{...props}
	/>
))
SidebarGroup.displayName = 'SidebarGroup'

// ── SidebarGroupLabel ─────────────────────────────────────────────────────────

export const SidebarGroupLabel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="group-label"
		className={cn(
			'flex h-8 shrink-0 items-center px-2 text-xs font-medium tracking-wider uppercase',
			'text-sidebar-foreground/50 outline-none',
			className,
		)}
		{...props}
	/>
))
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

// ── SidebarGroupContent ───────────────────────────────────────────────────────

export const SidebarGroupContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="group-content"
		className={cn('w-full text-sm', className)}
		{...props}
	/>
))
SidebarGroupContent.displayName = 'SidebarGroupContent'

// ── SidebarMenu ───────────────────────────────────────────────────────────────

export const SidebarMenu = React.forwardRef<
	HTMLUListElement,
	React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		data-sidebar="menu"
		className={cn('flex w-full min-w-0 flex-col gap-0.5', className)}
		{...props}
	/>
))
SidebarMenu.displayName = 'SidebarMenu'

// ── SidebarMenuItem ───────────────────────────────────────────────────────────

export const SidebarMenuItem = React.forwardRef<
	HTMLLIElement,
	React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		data-sidebar="menu-item"
		className={cn('group/menu-item relative', className)}
		{...props}
	/>
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

// ── SidebarMenuButton ─────────────────────────────────────────────────────────

interface SidebarMenuButtonProps extends React.HTMLAttributes<HTMLElement> {
	isActive?: boolean
	href?: string
}

export const SidebarMenuButton = React.forwardRef<HTMLElement, SidebarMenuButtonProps>(
	({ isActive, href, className, children, ...props }, ref) => {
		const shared = cn(
			'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-2',
			'text-left text-sm outline-none transition-colors duration-150 cursor-pointer select-none',
			'text-sidebar-foreground',
			'[&>svg]:size-4 [&>svg]:shrink-0',
			'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
			'focus-visible:ring-2 focus-visible:ring-sidebar-ring',
			isActive && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
			className,
		)
		if (href) {
			return (
				<a
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					data-sidebar="menu-button"
					data-active={isActive}
					className={shared}
					{...props}
				>
					{children}
				</a>
			)
		}
		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				type="button"
				data-sidebar="menu-button"
				data-active={isActive}
				className={shared}
				{...props}
			>
				{children}
			</button>
		)
	},
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

// ── SidebarMenuSub ────────────────────────────────────────────────────────────

export const SidebarMenuSub = React.forwardRef<
	HTMLUListElement,
	React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		data-sidebar="menu-sub"
		className={cn(
			'mx-3.5 flex min-w-0 flex-col gap-0.5',
			'border-l border-sidebar-border py-0.5 pl-2.5',
			className,
		)}
		{...props}
	/>
))
SidebarMenuSub.displayName = 'SidebarMenuSub'

// ── SidebarMenuSubItem ────────────────────────────────────────────────────────

export const SidebarMenuSubItem = React.forwardRef<
	HTMLLIElement,
	React.HTMLAttributes<HTMLLIElement>
>(({ ...props }, ref) => <li ref={ref} data-sidebar="menu-sub-item" {...props} />)
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

// ── SidebarMenuSubButton ──────────────────────────────────────────────────────

interface SidebarMenuSubButtonProps extends React.HTMLAttributes<HTMLElement> {
	isActive?: boolean
	href?: string
}

export const SidebarMenuSubButton = React.forwardRef<HTMLElement, SidebarMenuSubButtonProps>(
	({ isActive, href, className, children, ...props }, ref) => {
		const shared = cn(
			'flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2',
			'text-xs text-sidebar-foreground/80 outline-none transition-colors duration-150 cursor-pointer select-none',
			'[&>svg]:size-3.5 [&>svg]:shrink-0',
			'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
			'focus-visible:ring-2 focus-visible:ring-sidebar-ring',
			isActive && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
			className,
		)
		if (href) {
			return (
				<a
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					data-sidebar="menu-sub-button"
					data-active={isActive}
					className={shared}
					{...props}
				>
					{children}
				</a>
			)
		}
		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				type="button"
				data-sidebar="menu-sub-button"
				data-active={isActive}
				className={shared}
				{...props}
			>
				{children}
			</button>
		)
	},
)
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

// ── SidebarRail ───────────────────────────────────────────────────────────────

export const SidebarRail = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button
		ref={ref}
		data-sidebar="rail"
		aria-label="Toggle Sidebar"
		tabIndex={-1}
		type="button"
		className={cn(
			'absolute inset-y-0 right-0 z-20 hidden w-4 translate-x-full cursor-col-resize',
			'after:absolute after:inset-y-0 after:left-1/2 after:w-px',
			'hover:after:bg-sidebar-border',
			'sm:flex',
			className,
		)}
		{...props}
	/>
))
SidebarRail.displayName = 'SidebarRail'

