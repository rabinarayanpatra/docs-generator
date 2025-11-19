'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageNavProps {
  prev: {
    title: string
    slug: string
  } | null
  next: {
    title: string
    slug: string
  } | null
}

export function PageNav({ prev, next }: PageNavProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Arrow Left/Right for page navigation
      if (e.altKey) {
        if (e.key === 'ArrowLeft' && prev) {
          e.preventDefault()
          router.push(`/${prev.slug}`)
        } else if (e.key === 'ArrowRight' && next) {
          e.preventDefault()
          router.push(`/${next.slug}`)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [prev, next, router])

  if (!prev && !next) {
    return null
  }

  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t pt-8">
      {prev ? (
        <Link
          href={`/${prev.slug}`}
          className={cn(
            'group flex flex-1 items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted',
            !next && 'max-w-md'
          )}
        >
          <ChevronLeft className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          <div className="min-w-0 text-left">
            <div className="text-xs font-medium text-muted-foreground">
              Previous
            </div>
            <div className="mt-1 truncate font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/${next.slug}`}
          className={cn(
            'group flex flex-1 items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted',
            !prev && 'max-w-md'
          )}
        >
          <div className="min-w-0 flex-1 text-right">
            <div className="text-xs font-medium text-muted-foreground">
              Next
            </div>
            <div className="mt-1 truncate font-medium">{next.title}</div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
