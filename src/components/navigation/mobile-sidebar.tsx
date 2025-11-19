'use client'

import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarNav } from './sidebar-nav'
import type { SidebarNavItem } from '@/types/navigation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface MobileSidebarProps {
  items: SidebarNavItem[]
}

export function MobileSidebar({ items }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="rounded-md p-2 hover:bg-accent md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="h-full overflow-y-auto px-4 py-6">
          <SidebarNav items={items} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
