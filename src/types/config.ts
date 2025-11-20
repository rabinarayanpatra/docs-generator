export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface QuickLink {
  title: string
  href: string
  description?: string
  icon?: string
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

  quickLinks?: QuickLink[]

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
