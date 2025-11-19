import Link from 'next/link'
import { getCachedSidebarNavigation } from '@/lib/navigation'
import { MobileSidebar } from '@/components/navigation/mobile-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { docsConfig } from '@/config/docs.config'

export async function Header() {
  const navigation = await getCachedSidebarNavigation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MobileSidebar items={navigation} />

        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{docsConfig.name}</span>
          </Link>

          <nav className="flex items-center space-x-6">
            {docsConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
