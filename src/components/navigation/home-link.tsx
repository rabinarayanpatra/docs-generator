'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function HomeLink() {
  const pathname = usePathname()
  const isActive = pathname === '/'

  return (
    <Link
      href="/"
      className={cn(
        'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-accent text-accent-foreground'
      )}
    >
      Home
    </Link>
  )
}
