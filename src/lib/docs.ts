import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { DocsFrontmatter, DocsPage } from '@/types/docs'
import { validateContentStructure } from './validate'

const contentDirectory = path.join(process.cwd(), 'content')

// Validate content structure on module load
validateContentStructure()

export function getDocsPath(): string {
  return contentDirectory
}

export function getAllDocsPaths(): string[] {
  const files: string[] = []

  function readDir(dir: string) {
    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return
    }

    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // Skip directories starting with underscore
        if (!item.startsWith('_')) {
          readDir(fullPath)
        }
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  readDir(contentDirectory)
  return files
}

export function pathToSlug(filePath: string): string[] {
  const relativePath = path.relative(contentDirectory, filePath)
  const withoutExt = relativePath.replace(/\.(md|mdx)$/, '')

  // Convert index files to parent directory
  const slug = withoutExt.split(path.sep).filter((part) => part !== 'index')

  return slug.length === 0 ? [''] : slug
}

export function slugToPath(slug: string[]): string {
  const slugPath = slug.join('/')

  // Try exact match first
  const mdPath = path.join(contentDirectory, `${slugPath}.md`)
  const mdxPath = path.join(contentDirectory, `${slugPath}.mdx`)

  if (fs.existsSync(mdPath)) return mdPath
  if (fs.existsSync(mdxPath)) return mdxPath

  // Try index file in directory
  const indexMdPath = path.join(contentDirectory, slugPath, 'index.md')
  const indexMdxPath = path.join(contentDirectory, slugPath, 'index.mdx')

  if (fs.existsSync(indexMdPath)) return indexMdPath
  if (fs.existsSync(indexMdxPath)) return indexMdxPath

  throw new Error(`Doc not found for slug: ${slug.join('/')}`)
}

export function calculateReadingTime(content: string): string {
  const stats = readingTime(content)
  return stats.text
}

export async function getDocBySlug(slug: string[]): Promise<DocsPage> {
  const filePath = slugToPath(slug)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as DocsFrontmatter,
    content,
    path: filePath,
    readingTime: calculateReadingTime(content),
  }
}

export async function getAllDocs(): Promise<DocsPage[]> {
  const paths = getAllDocsPaths()

  if (paths.length === 0) {
    return []
  }

  const docs = await Promise.all(
    paths.map(async (filePath) => {
      const slug = pathToSlug(filePath)
      return getDocBySlug(slug)
    })
  )

  // Filter out drafts in production
  return docs.filter((doc) => {
    if (process.env.NODE_ENV === 'production') {
      return !doc.frontmatter.draft
    }
    return true
  })
}
