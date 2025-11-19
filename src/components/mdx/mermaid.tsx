'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

let mermaidInitialized = false

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#2563eb',
          lineColor: '#64748b',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#f8fafc',
        },
      })
      mermaidInitialized = true
    }

    if (ref.current) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      })
    }
  }, [chart])

  return (
    <div className="my-8 flex justify-center overflow-x-auto rounded-lg border border-border bg-muted/30 p-4">
      <div ref={ref} className="mermaid-diagram" />
    </div>
  )
}
