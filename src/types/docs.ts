export interface DocsFrontmatter {
  title: string
  description: string
  order?: number
  author?: string
  date?: string
  tags?: string[]
  draft?: boolean
  image?: string
  icon?: string
  published?: boolean
}

export interface DocsPage {
  slug: string[]
  frontmatter: DocsFrontmatter
  content: string
  path: string
  readingTime?: string
}

export interface DocsDirectory {
  name: string
  path: string
  children: (DocsDirectory | DocsPage)[]
}
