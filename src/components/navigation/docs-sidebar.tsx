import { getCachedSidebarNavigation } from '@/lib/navigation'
import { SidebarNav } from './sidebar-nav'

export async function DocsSidebar() {
  const navigation = await getCachedSidebarNavigation()

  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <SidebarNav items={navigation} />
      </div>
    </aside>
  )
}
