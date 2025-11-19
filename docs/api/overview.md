---
title: API Overview
description: API reference for the documentation generator
order: 1
---

# API Overview

This section contains the API reference for the documentation generator.

## Core Functions

The generator exposes several core functions:

### `getDocBySlug()`

Retrieves a documentation page by its slug.

```typescript
import { getDocBySlug } from '@/lib/docs'

const doc = await getDocBySlug(['getting-started', 'installation'])
```

**Parameters:**

- `slug: string[]` - Array of path segments

**Returns:**

- `Promise<DocsPage>` - The documentation page

### `getAllDocs()`

Retrieves all documentation pages.

```typescript
import { getAllDocs } from '@/lib/docs'

const docs = await getAllDocs()
```

**Returns:**

- `Promise<DocsPage[]>` - Array of all documentation pages

## Types

### `DocsFrontmatter`

```typescript
interface DocsFrontmatter {
  title: string
  description: string
  order?: number
  author?: string
  date?: string
  tags?: string[]
  draft?: boolean
}
```

### `DocsPage`

```typescript
interface DocsPage {
  slug: string[]
  frontmatter: DocsFrontmatter
  content: string
  path: string
  readingTime?: string
}
```

## Configuration

See the configuration guide for details on customizing the generator.
