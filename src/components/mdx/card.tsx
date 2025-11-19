import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CardProps {
  title?: string
  children: ReactNode
  href?: string
  icon?: ReactNode
  className?: string
}

export function Card({ title, children, href, icon, className }: CardProps) {
  const cardContent = (
    <>
      {icon && <div className="mb-2 text-primary">{icon}</div>}
      {title && (
        <h3 className="mb-2 text-lg font-semibold leading-tight">{title}</h3>
      )}
      <div className="text-sm text-muted-foreground">{children}</div>
      {href && (
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      )}
    </>
  )

  const cardClasses = cn(
    'group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md',
    href && 'cursor-pointer hover:border-primary',
    className
  )

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {cardContent}
      </Link>
    )
  }

  return <div className={cardClasses}>{cardContent}</div>
}

interface CardGridProps {
  children: ReactNode
  cols?: 2 | 3 | 4
}

export function CardGrid({ children, cols = 2 }: CardGridProps) {
  return (
    <div
      className={cn(
        'my-8 grid gap-4',
        cols === 2 && 'md:grid-cols-2',
        cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'md:grid-cols-2 lg:grid-cols-4'
      )}
    >
      {children}
    </div>
  )
}
