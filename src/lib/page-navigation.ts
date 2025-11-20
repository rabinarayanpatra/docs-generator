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

  // Filter out drafts and exclude index
  const publishedDocs = docs
    .filter((doc) => doc.frontmatter.published !== false)
    .filter((doc) => doc.slug.length > 0) // Exclude index

  // Group by section (first part of slug)
  const sections = new Map<string, typeof publishedDocs>()
  publishedDocs.forEach((doc) => {
    const section = doc.slug[0] || 'root'
    if (!sections.has(section)) {
      sections.set(section, [])
    }
    sections.get(section)!.push(doc)
  })

  // Sort within each section by order
  sections.forEach((sectionDocs) => {
    sectionDocs.sort((a, b) => {
      const aOrder = a.frontmatter.order ?? 999
      const bOrder = b.frontmatter.order ?? 999
      return aOrder - bOrder
    })
  })

  // Define section order
  const sectionOrder = [
    'getting-started',
    'guides',
    'api',
    'reference',
    'examples',
  ]

  // Create flat ordered list
  const orderedDocs: typeof publishedDocs = []
  sectionOrder.forEach((sectionName) => {
    if (sections.has(sectionName)) {
      orderedDocs.push(...sections.get(sectionName)!)
    }
  })

  // Add any remaining sections not in the predefined order
  sections.forEach((sectionDocs, sectionName) => {
    if (!sectionOrder.includes(sectionName)) {
      orderedDocs.push(...sectionDocs)
    }
  })

  const currentSlugStr = currentSlug.join('/')
  const currentIndex = orderedDocs.findIndex(
    (doc) => doc.slug.join('/') === currentSlugStr
  )

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  const prev =
    currentIndex > 0
      ? {
          title: orderedDocs[currentIndex - 1].frontmatter.title,
          slug: orderedDocs[currentIndex - 1].slug.join('/'),
        }
      : null

  const next =
    currentIndex < orderedDocs.length - 1
      ? {
          title: orderedDocs[currentIndex + 1].frontmatter.title,
          slug: orderedDocs[currentIndex + 1].slug.join('/'),
        }
      : null

  return { prev, next }
}
