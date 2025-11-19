import { NextRequest, NextResponse } from 'next/server'
import { getAllDocs } from '@/lib/docs'

interface SearchResult {
  slug: string
  title: string
  description: string
  matches: {
    type: 'title' | 'description' | 'content'
    text: string
  }[]
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/---[\s\S]*?---/g, '') // Remove frontmatter
    .trim()
}

function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()

  // Direct match
  if (textLower.includes(queryLower)) {
    return true
  }

  // Fuzzy match - check if all query chars appear in order
  let queryIndex = 0
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++
    }
  }

  return queryIndex === queryLower.length
}

function getContextSnippet(
  text: string,
  query: string,
  maxLength = 150
): string {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
  }

  const start = Math.max(0, index - 50)
  const end = Math.min(text.length, index + query.length + 100)

  let snippet = text.slice(start, end)
  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'

  return snippet
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json([])
  }

  const docs = await getAllDocs()
  const results: SearchResult[] = []

  for (const doc of docs) {
    const matches: SearchResult['matches'] = []
    const content = stripMarkdown(doc.content)
    const title = doc.frontmatter.title
    const description = doc.frontmatter.description

    // Search in title
    if (fuzzyMatch(title, query)) {
      matches.push({
        type: 'title',
        text: title,
      })
    }

    // Search in description
    if (description && fuzzyMatch(description, query)) {
      matches.push({
        type: 'description',
        text: getContextSnippet(description, query),
      })
    }

    // Search in content
    if (fuzzyMatch(content, query)) {
      matches.push({
        type: 'content',
        text: getContextSnippet(content, query),
      })
    }

    if (matches.length > 0) {
      results.push({
        slug: doc.slug.join('/'),
        title,
        description: description || '',
        matches,
      })
    }
  }

  // Sort by relevance (title matches first, then description, then content)
  results.sort((a, b) => {
    const aHasTitleMatch = a.matches.some((m) => m.type === 'title')
    const bHasTitleMatch = b.matches.some((m) => m.type === 'title')

    if (aHasTitleMatch && !bHasTitleMatch) return -1
    if (!aHasTitleMatch && bHasTitleMatch) return 1

    return 0
  })

  return NextResponse.json(results)
}
