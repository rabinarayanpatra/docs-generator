import RSS from 'rss'
import { getAllDocs } from '@/lib/docs'
import { siteConfig } from '@/config/site'

export async function GET() {
  const docs = await getAllDocs()
  const baseUrl = siteConfig.url || 'http://localhost:3000'

  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    feed_url: `${baseUrl}/feed.xml`,
    site_url: baseUrl,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
  })

  // Sort docs by date if available, otherwise by title
  const sortedDocs = [...docs].sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      )
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  })

  // Add items to feed
  sortedDocs.forEach((doc) => {
    feed.item({
      title: doc.frontmatter.title,
      description: doc.frontmatter.description || '',
      url: `${baseUrl}/${doc.slug.join('/')}`,
      date: doc.frontmatter.date ? new Date(doc.frontmatter.date) : new Date(),
      ...(doc.frontmatter.author && { author: doc.frontmatter.author }),
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
