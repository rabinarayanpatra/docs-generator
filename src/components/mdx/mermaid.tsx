'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const isDark = resolvedTheme === 'dark'

    mermaid.initialize({
      startOnLoad: true,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      themeVariables: isDark
        ? {
            primaryColor: '#3b82f6',
            primaryTextColor: '#e2e8f0',
            primaryBorderColor: '#60a5fa',
            lineColor: '#94a3b8',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            background: '#0f172a',
            mainBkg: '#1e293b',
            secondBkg: '#334155',
            border1: '#475569',
            border2: '#64748b',
          }
        : {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#2563eb',
            lineColor: '#64748b',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#f8fafc',
            background: '#ffffff',
            mainBkg: '#f8fafc',
            secondBkg: '#f1f5f9',
            border1: '#e2e8f0',
            border2: '#cbd5e1',
          },
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    })

    if (ref.current) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      })
    }
  }, [chart, resolvedTheme, mounted])

  if (!mounted) {
    return (
      <div className="my-8 flex justify-center overflow-x-auto rounded-lg border border-border bg-muted/30 p-4">
        <div className="h-32 w-full animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="my-8 flex justify-center overflow-x-auto rounded-lg border border-border bg-muted/30 p-4">
      <div ref={ref} className="mermaid-diagram" />
    </div>
  )
}
