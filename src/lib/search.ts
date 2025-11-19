import { Index } from 'flexsearch'
import { getAllDocs } from './docs'

export interface SearchResult {
  slug: string[]
  title: string
  description: string
  content: string
  headings: string[]
}

export interface SearchResultWithSnippet extends SearchResult {
  snippet?: string
  matchedHeading?: string
}

let searchIndex: Index | null = null
let searchData: Map<string, SearchResult> | null = null

function stripMarkdown(markdown: string): string {
  return (
    markdown
      // Remove frontmatter
      .replace(/^---[\s\S]*?---/, '')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // Remove headings markers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function extractHeadings(markdown: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: string[] = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push(match[1])
  }

  return headings
}

export async function buildSearchIndex() {
  if (searchIndex && searchData) {
    return { index: searchIndex, data: searchData }
  }

  const docs = await getAllDocs()

  // Create new FlexSearch index
  searchIndex = new Index({
    preset: 'match',
    tokenize: 'forward',
    cache: true,
  })

  searchData = new Map()

  // Index all documents
  for (const doc of docs) {
    const id = doc.slug.join('/')

    // Extract headings
    const headings = extractHeadings(doc.content)

    // Strip markdown for plain text search
    const plainContent = stripMarkdown(doc.content)

    const searchResult: SearchResult = {
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description || '',
      content: plainContent,
      headings,
    }

    // Index title (highest weight)
    searchIndex.add(id, doc.frontmatter.title)

    // Index description
    if (doc.frontmatter.description) {
      searchIndex.add(id, doc.frontmatter.description)
    }

    // Index headings
    headings.forEach((heading) => {
      searchIndex!.add(id, heading)
    })

    // Index content
    searchIndex.add(id, plainContent)

    searchData.set(id, searchResult)
  }

  return { index: searchIndex, data: searchData }
}

export async function searchDocs(query: string): Promise<SearchResult[]> {
  const { index, data } = await buildSearchIndex()

  const results = await index.search(query, { limit: 10 })

  return results
    .map((id) => data.get(id as string))
    .filter((result): result is SearchResult => result !== undefined)
}

export async function searchDocsWithSnippets(
  query: string
): Promise<SearchResultWithSnippet[]> {
  const results = await searchDocs(query)

  return results.map((result) => {
    // Find snippet with query match
    const lowerQuery = query.toLowerCase()
    const lowerContent = result.content.toLowerCase()
    const matchIndex = lowerContent.indexOf(lowerQuery)

    let snippet = result.description

    if (matchIndex !== -1) {
      const start = Math.max(0, matchIndex - 50)
      const end = Math.min(result.content.length, matchIndex + 100)
      snippet = '...' + result.content.substring(start, end) + '...'
    }

    // Check if query matches a heading
    const matchedHeading = result.headings.find((h) =>
      h.toLowerCase().includes(lowerQuery)
    )

    return {
      ...result,
      snippet,
      matchedHeading,
    }
  })
}
