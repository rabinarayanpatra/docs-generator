import { getCachedSidebarNavigation } from '@/lib/navigation'
import { SidebarNav } from './sidebar-nav'
import { HomeLink } from './home-link'

export async function DocsSidebar() {
  const navigation = await getCachedSidebarNavigation()

  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <nav className="w-64 py-6 pr-6">
          <div className="space-y-1">
            <HomeLink />
          </div>
        </nav>
        <SidebarNav items={navigation} />
      </div>
    </aside>
  )
}
