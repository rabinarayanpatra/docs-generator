import { getAllDocs } from './docs'

interface PageNav {
  title: string
  slug: string
}

export interface PageNavigation {
  prev: PageNav | null
  next: PageNav | null
}

export async function getPageNavigation(
  currentSlug: string[]
): Promise<PageNavigation> {
  const docs = await getAllDocs()

  // Filter out drafts and sort by order if available
  const publishedDocs = docs
    .filter((doc) => doc.frontmatter.published !== false)
    .filter((doc) => doc.slug.length > 0) // Exclude index
    .sort((a, b) => {
      const aOrder = a.frontmatter.order ?? 999
      const bOrder = b.frontmatter.order ?? 999
      return aOrder - bOrder
    })

  const currentSlugStr = currentSlug.join('/')
  const currentIndex = publishedDocs.findIndex(
    (doc) => doc.slug.join('/') === currentSlugStr
  )

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  const prev =
    currentIndex > 0
      ? {
          title: publishedDocs[currentIndex - 1].frontmatter.title,
          slug: publishedDocs[currentIndex - 1].slug.join('/'),
        }
      : null

  const next =
    currentIndex < publishedDocs.length - 1
      ? {
          title: publishedDocs[currentIndex + 1].frontmatter.title,
          slug: publishedDocs[currentIndex + 1].slug.join('/'),
        }
      : null

  return { prev, next }
}
