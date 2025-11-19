import { cn } from '@/lib/utils'

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps my-8 ml-4 border-l border-border pl-8 [counter-reset:step]">
      {children}
    </div>
  )
}

interface StepProps {
  children: React.ReactNode
  title?: string
}

export function Step({ children, title }: StepProps) {
  return (
    <div className="step relative pb-8 [counter-increment:step] last:pb-0">
      <div
        className={cn(
          'absolute left-[-2.125rem] top-0 flex h-9 w-9 items-center justify-center',
          'rounded-full border-4 border-background bg-primary text-primary-foreground',
          'font-mono text-base font-semibold'
        )}
      >
        <span className="before:content-[counter(step)]" />
      </div>
      {title && <h3 className="mb-3 font-semibold">{title}</h3>}
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
