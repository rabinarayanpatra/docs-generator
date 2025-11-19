import { File, Folder, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileTreeProps {
  children: React.ReactNode
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="my-6 rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
      <div className="space-y-1">{children}</div>
    </div>
  )
}

interface FileTreeItemProps {
  name: string
  type?: 'file' | 'folder'
  children?: React.ReactNode
  defaultOpen?: boolean
}

export function FileTreeItem({
  name,
  type = 'file',
  children,
  defaultOpen = true,
}: FileTreeItemProps) {
  const isFolder = type === 'folder'

  return (
    <div>
      <div className="flex items-center gap-2 py-1">
        {isFolder ? (
          defaultOpen ? (
            <FolderOpen className="h-4 w-4 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 text-blue-500" />
          )
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        )}
        <span className={cn(isFolder && 'font-semibold')}>{name}</span>
      </div>
      {children && defaultOpen && <div className="ml-6">{children}</div>}
    </div>
  )
}
