import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'warning' | 'error' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950/50',
    iconClassName: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/50',
    iconClassName: 'text-yellow-500',
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-500/50 bg-red-50 dark:bg-red-950/50',
    iconClassName: 'text-red-500',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-500/50 bg-green-50 dark:bg-green-950/50',
    iconClassName: 'text-green-500',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn('my-6 rounded-lg border-l-4 p-4', config.className)}>
      <div className="flex gap-3">
        <Icon className={cn('h-5 w-5 shrink-0', config.iconClassName)} />
        <div className="flex-1 space-y-2">
          {title && (
            <p className="font-semibold leading-none tracking-tight">{title}</p>
          )}
          <div className="text-sm [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
