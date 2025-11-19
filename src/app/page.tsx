import { notFound } from 'next/navigation'
import { getDocBySlug } from '@/lib/docs'
import { compileMDXContent } from '@/lib/mdx'
import { extractTableOfContents } from '@/lib/toc'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { DocsSidebar } from '@/components/navigation/docs-sidebar'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await getDocBySlug(['index'])

    return {
      title: doc.frontmatter.title || siteConfig.name,
      description: doc.frontmatter.description || siteConfig.description,
      openGraph: {
        title: doc.frontmatter.title || siteConfig.name,
        description: doc.frontmatter.description || siteConfig.description,
        type: 'website',
        images: doc.frontmatter.image ? [doc.frontmatter.image] : [],
      },
    }
  } catch {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
    }
  }
}

export default async function HomePage() {
  let doc

  try {
    doc = await getDocBySlug(['index'])
  } catch {
    notFound()
  }

  const { content } = await compileMDXContent(doc.content)
  const toc = await extractTableOfContents(doc.content)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <div className="flex min-w-0 gap-8">
            <article className="min-w-0 flex-1">
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold">
                  {doc.frontmatter.title}
                </h1>
                {doc.frontmatter.description && (
                  <p className="mb-4 text-xl text-muted-foreground">
                    {doc.frontmatter.description}
                  </p>
                )}
                {doc.readingTime && (
                  <p className="text-sm text-muted-foreground">
                    {doc.readingTime}
                  </p>
                )}
              </div>

              <div className="prose prose-slate max-w-none dark:prose-invert">
                {content}
              </div>
            </article>

            {siteConfig.features.toc && toc.length > 0 && (
              <aside className="hidden w-64 shrink-0 xl:block">
                <div className="sticky top-20">
                  <h3 className="mb-4 text-sm font-semibold">On This Page</h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.slug}
                        href={`#${item.slug}`}
                        className={`block text-sm text-muted-foreground transition-colors hover:text-primary ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
