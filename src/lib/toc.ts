import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import type { Root, Heading } from 'mdast'

export interface TocItem {
  title: string
  slug: string
  level: number
}

export async function extractTableOfContents(
  markdown: string
): Promise<TocItem[]> {
  const toc: TocItem[] = []

  const tree = remark().parse(markdown) as Root

  visit(tree, 'heading', (node: Heading) => {
    // Only include h2 and h3
    if (node.depth === 2 || node.depth === 3) {
      const title = toString(node)
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')

      toc.push({
        title,
        slug,
        level: node.depth,
      })
    }
  })

  return toc
}
