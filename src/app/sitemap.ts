import { MetadataRoute } from 'next'
import { getAllDocs } from '@/lib/docs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocs()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Documentation pages
  const docRoutes = docs.map((doc) => ({
    url: `${baseUrl}/${doc.slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...docRoutes]
}
