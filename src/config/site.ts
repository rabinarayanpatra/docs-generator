import { SiteConfig } from '@/types/config'

export const siteConfig: SiteConfig = {
  name: 'Documentation',
  description: 'Beautiful documentation site built with Next.js',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.example.com',

  github: {
    repo: 'rabinarayanpatra/docs-generator',
    url: 'https://github.com/rabinarayanpatra/docs-generator',
  },

  nav: {
    mainNav: [
      {
        title: 'Getting Started',
        href: '/getting-started',
        external: false,
      },
      {
        title: 'Guides',
        href: '/guides/writing-docs',
        external: false,
      },
      {
        title: 'API',
        href: '/api/overview',
        external: false,
      },
    ],
    socialLinks: [
      {
        title: 'GitHub',
        href: 'https://github.com/rabinarayanpatra/docs-generator',
        external: true,
      },
    ],
  },

  quickLinks: [
    {
      title: 'Getting Started',
      href: '/getting-started',
      description: 'Learn how to set up and use the documentation generator',
    },
    {
      title: 'Installation',
      href: '/getting-started/installation',
      description: 'Install and configure your documentation site',
    },
    {
      title: 'Writing Docs',
      href: '/guides/writing-docs',
      description: 'Best practices for writing documentation',
    },
    {
      title: 'MDX Components',
      href: '/guides/components',
      description: 'Explore available MDX components',
    },
    {
      title: 'API Overview',
      href: '/api/overview',
      description: 'API reference and documentation',
    },
  ],

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
