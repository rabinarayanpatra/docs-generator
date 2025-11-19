import Link from 'next/link'
import { getCachedSidebarNavigation } from '@/lib/navigation'
import { MobileSidebar } from '@/components/navigation/mobile-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { CommandMenu } from '@/components/search/command-menu'
import { siteConfig } from '@/config/site'

export async function Header() {
  const navigation = await getCachedSidebarNavigation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MobileSidebar items={navigation} />

        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <CommandMenu />
            </div>
            <nav className="flex items-center space-x-6">
              {siteConfig.nav.mainNav.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                )
              )}
              {siteConfig.theme.enabled && <ThemeToggle />}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
