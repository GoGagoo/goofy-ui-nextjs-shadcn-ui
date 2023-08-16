import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SideBarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		title: string
		href: string,
	}[]
}

function SidebarNav({ className, items }: SideBarNavProps) {
	const pathname = usePathname()

	return (
		<nav className={cn('flex space-x-2 flex-col space-x-0 space-y-1')}>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						pathname === item.href
							? 'bg-muted hover:bg-muted'
							: 'hover:bg-transparent hover:underline',
						'justify-start'
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

export default SidebarNav
