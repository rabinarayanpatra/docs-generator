import { cache } from 'react'
import { getAllDocs } from './docs'
import type { SidebarNavItem, NavItem } from '@/types/navigation'

export interface NavigationNode {
  title: string
  href?: string
  order: number
  children: NavigationNode[]
}

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function buildNavigationTree(): Promise<NavigationNode[]> {
  const docs = await getAllDocs()
  const tree: Map<string, NavigationNode> = new Map()

  // Build tree structure
  for (const doc of docs) {
    const parts = doc.slug
    let currentPath = ''

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const parentPath = currentPath
      currentPath = currentPath ? `${currentPath}/${part}` : part

      if (!tree.has(currentPath)) {
        // Check if this is a directory (has index.md) or a file
        const isDirectory = i < parts.length - 1 || parts[i] === 'index'
        const title = doc.frontmatter.title || formatTitle(part)
        const order = doc.frontmatter.order ?? 999

        const node: NavigationNode = {
          title:
            isDirectory && i === parts.length - 1 ? title : formatTitle(part),
          href: isDirectory ? `/${currentPath}` : undefined,
          order,
          children: [],
        }

        tree.set(currentPath, node)

        // Link to parent
        if (parentPath) {
          const parent = tree.get(parentPath)
          if (parent && !parent.children.includes(node)) {
            parent.children.push(node)
          }
        }
      }

      // Set href for the final segment
      if (i === parts.length - 1) {
        const node = tree.get(currentPath)
        if (node) {
          node.title = doc.frontmatter.title || formatTitle(part)
          node.href = `/${doc.slug.join('/')}`
          node.order = doc.frontmatter.order ?? 999
        }
      }
    }
  }

  // Get root level items
  const rootItems = Array.from(tree.values()).filter((node) => {
    const path = Array.from(tree.entries()).find(([, n]) => n === node)?.[0]
    return path && !path.includes('/')
  })

  // Sort recursively
  function sortNodes(nodes: NavigationNode[]): NavigationNode[] {
    return nodes
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
      .map((node) => ({
        ...node,
        children: sortNodes(node.children),
      }))
  }

  // Fix hrefs for nodes with children but no index.md
  // Point them to the first child's href
  function fixMissingIndexHrefs(nodes: NavigationNode[]): NavigationNode[] {
    return nodes.map((node) => {
      const fixedChildren = fixMissingIndexHrefs(node.children)

      // If node has children but href points to a non-existent index
      // (i.e., directory without index.md), use first child's href
      if (fixedChildren.length > 0 && node.href) {
        // Check if this href would actually resolve to a doc
        const hasIndexDoc = docs.some(
          (d) => `/${d.slug.join('/')}` === node.href
        )

        if (!hasIndexDoc && fixedChildren[0]?.href) {
          return {
            ...node,
            href: fixedChildren[0].href,
            children: fixedChildren,
          }
        }
      }

      return {
        ...node,
        children: fixedChildren,
      }
    })
  }

  const sorted = sortNodes(rootItems)
  return fixMissingIndexHrefs(sorted)
}

export async function getSidebarNavigation(): Promise<SidebarNavItem[]> {
  const tree = await buildNavigationTree()

  function convertToSidebarItems(nodes: NavigationNode[]): SidebarNavItem[] {
    return nodes.map((node) => ({
      title: node.title,
      href: node.href,
      items: convertToSidebarItems(node.children),
    }))
  }

  return convertToSidebarItems(tree)
}

export async function getBreadcrumbs(slug: string[]): Promise<NavItem[]> {
  const breadcrumbs: NavItem[] = [{ title: 'Home', href: '/' }]

  let currentPath = ''
  for (let i = 0; i < slug.length; i++) {
    currentPath = currentPath ? `${currentPath}/${slug[i]}` : slug[i]

    try {
      const docs = await getAllDocs()
      const matchingDoc = docs.find((d) => d.slug.join('/') === currentPath)

      if (matchingDoc) {
        breadcrumbs.push({
          title: matchingDoc.frontmatter.title || formatTitle(slug[i]),
          href: `/${currentPath}`,
        })
      }
    } catch {
      breadcrumbs.push({
        title: formatTitle(slug[i]),
        href: `/${currentPath}`,
      })
    }
  }

  return breadcrumbs
}

// Cache navigation functions for performance
export const getCachedSidebarNavigation = cache(getSidebarNavigation)
export const getCachedBreadcrumbs = cache(getBreadcrumbs)
