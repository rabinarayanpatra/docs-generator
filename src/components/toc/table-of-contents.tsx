'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TocItem {
  title: string
  slug: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0% -80% 0%' }
    )

    const headings = items.map((item) => document.getElementById(item.slug))
    headings.forEach((heading) => {
      if (heading) {
        observer.observe(heading)
      }
    })

    return () => {
      headings.forEach((heading) => {
        if (heading) {
          observer.unobserve(heading)
        }
      })
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">On this page</p>
      <nav>
        <ul className="space-y-2.5 text-sm">
          {items.map((item) => (
            <li
              key={item.slug}
              className={cn(
                'border-l-2 transition-colors',
                item.level === 3 && 'pl-4',
                activeId === item.slug
                  ? 'border-primary text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <a
                href={`#${item.slug}`}
                className={cn(
                  'block py-1 leading-tight transition-colors',
                  item.level === 2 && 'pl-4',
                  item.level === 3 && 'pl-0'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.slug)
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                    // Update URL without scrolling
                    window.history.pushState(null, '', `#${item.slug}`)
                  }
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
