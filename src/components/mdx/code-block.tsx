'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  raw?: string
  filename?: string
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }

  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren(children.props.children)
  }

  return ''
}

export function CodeBlock({
  children,
  className,
  raw,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  // Extract language from className (format: language-xxx)
  const language = className?.replace(/language-/, '') || 'text'

  const copyToClipboard = async () => {
    const code = raw || extractTextFromChildren(children)
    if (!code) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="not-prose group relative my-6 overflow-hidden rounded-lg border border-border">
      {/* Header with filename and language */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">
                {filename}
              </span>
            )}
            {!filename && language && (
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {language}
              </span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="rounded p-1.5 transition-colors hover:bg-muted"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      )}

      {/* Code block */}
      <div className="relative">
        {!filename && !language && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 z-10 rounded-lg bg-zinc-700 p-2 opacity-0 transition-opacity hover:bg-zinc-600 group-hover:opacity-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-zinc-200" />
            )}
          </button>
        )}
        <pre className={className}>{children}</pre>
      </div>
    </div>
  )
}
