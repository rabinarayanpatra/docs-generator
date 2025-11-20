'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Search, Star } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { siteConfig } from '@/config/site'
import type { SearchResultWithSnippet } from '@/lib/search'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResultWithSnippet[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const debouncedQuery = useDebounce(query, 300)

  // Keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Search on query change
  React.useEffect(() => {
    async function performSearch() {
      if (debouncedQuery.trim() === '') {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        )
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [debouncedQuery])

  const onSelect = (slug: string[]) => {
    setOpen(false)
    setQuery('')
    router.push(`/${slug.join('/')}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search documentation...</span>
        <kbd className="hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-xs font-medium text-muted-foreground sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search documentation..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {/* Quick Links - Show when no query */}
          {!query &&
            siteConfig.quickLinks &&
            siteConfig.quickLinks.length > 0 && (
              <>
                <CommandGroup heading="Quick Links">
                  {siteConfig.quickLinks.map((link) => (
                    <CommandItem
                      key={link.href}
                      value={link.href}
                      onSelect={() => {
                        setOpen(false)
                        router.push(link.href)
                      }}
                    >
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <div className="flex flex-1 flex-col">
                        <span className="font-medium">{link.title}</span>
                        {link.description && (
                          <span className="text-xs text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {!isLoading && results.length > 0 && (
            <CommandGroup heading="Search Results">
              {results.map((result) => (
                <CommandItem
                  key={result.slug.join('/')}
                  value={result.slug.join('/')}
                  onSelect={() => onSelect(result.slug)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium">{result.title}</span>
                    {result.matchedHeading && (
                      <span className="text-xs text-primary">
                        In: {result.matchedHeading}
                      </span>
                    )}
                    {result.snippet && (
                      <span className="line-clamp-2 text-xs text-muted-foreground">
                        {result.snippet}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
