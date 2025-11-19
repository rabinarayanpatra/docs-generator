'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  slug: string
  title: string
  description: string
  matches: {
    type: 'title' | 'description' | 'content'
    text: string
  }[]
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  // Keyboard shortcut to open search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search functionality with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        )
        const searchResults = await response.json()
        setResults(searchResults)
        setSelectedIndex(0)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const navigateToResult = useCallback(
    (result: SearchResult) => {
      router.push(`/${result.slug}`)
      setIsOpen(false)
      setQuery('')
      setResults([])
    },
    [router]
  )

  // Keyboard navigation in results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        navigateToResult(results[selectedIndex])
      }
    },
    [results, selectedIndex, navigateToResult]
  )

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text

    return (
      <>
        {text.slice(0, index)}
        <mark className="rounded bg-yellow-300 px-0.5 dark:bg-yellow-600">
          {text.slice(index, index + query.length)}
        </mark>
        {text.slice(index + query.length)}
      </>
    )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search documentation...</span>
        <kbd className="hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-xs font-medium text-muted-foreground sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog */}
      <div className="pointer-events-none fixed inset-0 z-[110] flex items-start justify-center pt-[20vh]">
        <div className="pointer-events-auto relative w-full max-w-2xl rounded-lg border border-border bg-background shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isSearching && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            )}

            {!isSearching && query && results.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.slug}
                    onClick={() => navigateToResult(result)}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors',
                      index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">
                          {highlightMatch(result.title, query)}
                        </div>
                        {result.matches.map((match, i) => (
                          <div
                            key={i}
                            className="line-clamp-2 text-sm text-muted-foreground"
                          >
                            {highlightMatch(match.text, query)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!query && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Start typing to search documentation...
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">
                    ↓
                  </kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">
                    ↵
                  </kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
