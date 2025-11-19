import Link from 'next/link'
import { CodeBlock } from './code-block'
import { Callout } from './callout'
import { TabsComponent, TabList, Tab, TabPanel } from './tabs'
import { Steps, Step } from './steps'
import { FileTree, FileTreeItem } from './file-tree'
import { Image } from './image'
import { Mermaid } from './mermaid'
import { Card, CardGrid } from './card'
import { cn } from '@/lib/utils'

const components = {
  // Headings
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-8 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-6 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),

  // Paragraphs and text
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),

  // Links
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')

    if (isExternal) {
      return (
        <a
          className={cn(
            'font-medium text-primary underline underline-offset-4',
            className
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }

    return (
      <Link
        className={cn(
          'font-medium text-primary underline underline-offset-4',
          className
        )}
        href={href || ''}
        {...props}
      />
    )
  },

  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    />
  ),

  // Code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    />
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return <CodeBlock {...props}>{children}</CodeBlock>
  },

  // Blockquote
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-primary pl-6 italic [&>*]:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),

  // Table
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="my-4 border-border md:my-8" {...props} />
  ),

  // Image - Override with Next.js Image for optimization
  img: Image,

  // Custom components
  Image, // Also available as <Image> component
  Callout,
  Tabs: TabsComponent,
  TabList,
  Tab,
  TabPanel,
  Steps,
  Step,
  FileTree,
  FileTreeItem,
  Mermaid,
  Card,
  CardGrid,
}

export default components
