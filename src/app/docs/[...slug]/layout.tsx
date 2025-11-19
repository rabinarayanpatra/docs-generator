import { ReactNode } from 'react'
import { DocsSidebar } from '@/components/navigation/docs-sidebar'

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
