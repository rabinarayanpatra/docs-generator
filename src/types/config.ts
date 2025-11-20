export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url?: string

  github?: {
    repo: string
    url: string
  }

  nav: {
    mainNav: NavItem[]
    socialLinks?: NavItem[]
  }

  theme: {
    enabled: boolean
    defaultTheme: 'light' | 'dark' | 'system'
  }

  features: {
    search: boolean
    toc: boolean
    breadcrumbs: boolean
  }
}
