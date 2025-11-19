import { notFound } from 'next/navigation'
import { getDocBySlug, getAllDocs } from '@/lib/docs'
import { compileMDXContent } from '@/lib/mdx'
import { extractTableOfContents } from '@/lib/toc'
import type { Metadata } from 'next'

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const docs = await getAllDocs()

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata(props: DocPageProps): Promise<Metadata> {
  const params = await props.params
  try {
    const doc = await getDocBySlug(params.slug)

    return {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      openGraph: {
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        type: 'article',
        images: doc.frontmatter.image ? [doc.frontmatter.image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        images: doc.frontmatter.image ? [doc.frontmatter.image] : [],
      },
    }
  } catch {
    return {
      title: 'Not Found',
    }
  }
}

export default async function DocPage(props: DocPageProps) {
  const params = await props.params
  let doc

  try {
    doc = await getDocBySlug(params.slug)
  } catch {
    notFound()
  }

  const { content } = await compileMDXContent(doc.content)
  const toc = await extractTableOfContents(doc.content)

  return (
    <div className="flex gap-8">
      <article className="max-w-3xl flex-1">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{doc.frontmatter.title}</h1>
          {doc.frontmatter.description && (
            <p className="mb-4 text-xl text-muted-foreground">
              {doc.frontmatter.description}
            </p>
          )}
          {doc.readingTime && (
            <p className="text-sm text-muted-foreground">{doc.readingTime}</p>
          )}
        </div>

        <div className="prose prose-slate max-w-none dark:prose-invert">
          {content}
        </div>
      </article>

      {toc.length > 0 && (
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
  )
}
