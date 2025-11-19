import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import type { Root, Link } from 'mdast'
import mdxComponents from '@/components/mdx/mdx-components'

// Remark plugin to resolve relative links
function remarkRelativeLinks() {
  return (tree: Root) => {
    visit(tree, 'link', (node: Link) => {
      // Only process relative links (not starting with http, #, or /)
      if (
        node.url &&
        !node.url.startsWith('http') &&
        !node.url.startsWith('#') &&
        !node.url.startsWith('/')
      ) {
        // Remove .md or .mdx extension
        node.url = node.url.replace(/\.mdx?$/, '')

        // Convert to absolute path
        node.url = `/${node.url}`
      }
    })
  }
}

export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkRelativeLinks],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: 'github-dark',
                light: 'github-light',
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  })

  return { content, frontmatter }
}
