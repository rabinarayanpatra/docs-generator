'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types/navigation'

interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="w-64 py-6 pr-6">
      <div className="space-y-1">
        {items.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>
    </nav>
  )
}

function NavItem({ item }: { item: SidebarNavItem }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.items && item.items.length > 0
  const isActive = item.href === pathname

  return (
    <div>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-1 rounded p-1 hover:bg-accent"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-90'
              )}
            />
          </button>
        )}

        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground',
              !hasChildren && 'ml-5'
            )}
          >
            {item.title}
          </Link>
        ) : (
          <div className="flex-1 px-3 py-2 text-sm font-semibold">
            {item.title}
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {item.items.map((child, index) => (
            <NavItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}
