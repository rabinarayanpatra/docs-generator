export const docsConfig = {
  name: 'Docs Generator',
  description: 'Modern documentation generator built with Next.js 16',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: 'https://docs-generator.dev/og.jpg',
  links: {
    github: 'https://github.com/yourusername/docs-generator',
    twitter: 'https://twitter.com/yourusername',
  },
  nav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Guides',
      href: '/docs/guides',
    },
    {
      title: 'API',
      href: '/docs/api',
    },
  ],
}

export type DocsConfig = typeof docsConfig
