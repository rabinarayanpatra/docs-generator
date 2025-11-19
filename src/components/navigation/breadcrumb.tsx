import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { NavItem } from '@/types/navigation'

interface BreadcrumbProps {
  items: NavItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
              {isLast ? (
                <span className="font-medium text-foreground">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
