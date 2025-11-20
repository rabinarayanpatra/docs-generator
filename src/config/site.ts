import { SiteConfig } from '@/types/config'

export const siteConfig: SiteConfig = {
  name: 'Documentation',
  description: 'Beautiful documentation site built with Next.js',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.example.com',

  nav: {
    mainNav: [
      {
        title: 'Getting Started',
        href: '/getting-started',
        external: false,
      },
      {
        title: 'Guides',
        href: '/guides',
        external: false,
      },
      {
        title: 'API',
        href: '/api',
        external: false,
      },
    ],
    socialLinks: [
      {
        title: 'GitHub',
        href: 'https://github.com',
        external: true,
      },
    ],
  },

  theme: {
    enabled: true,
    defaultTheme: 'system',
  },

  features: {
    search: true,
    toc: true,
    breadcrumbs: true,
  },
}
