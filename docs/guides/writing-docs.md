---
title: Writing Documentation
description: Learn how to write great documentation
order: 1
---

# Writing Documentation

This guide covers everything you need to know about writing documentation.

## File Structure

Documentation files live in the `/docs` directory:

```
docs/
├── getting-started/
│   ├── index.md
│   └── installation.md
├── guides/
│   └── writing-docs.md
└── api/
    └── overview.md
```

## Frontmatter

Every documentation file should include frontmatter:

```yaml
---
title: Your Page Title
description: A brief description for SEO
order: 1
---
```

### Available Fields

- `title` (required): Page title
- `description` (required): Page description
- `order` (optional): Sort order in navigation
- `draft` (optional): Hide from production
- `author` (optional): Content author
- `date` (optional): Publication date
- `tags` (optional): Array of tags

## Relative Links

You can link to other docs using relative paths:

```markdown
[Installation Guide](../getting-started/installation)
[API Overview](../api/overview)
```

The `.md` extension is optional and will be handled automatically.

## Code Blocks

Use fenced code blocks with language specification:

````markdown
```typescript
const greeting = 'Hello, World!'
console.log(greeting)
```
````

## Tables

Use GitHub Flavored Markdown tables:

| Feature  | Supported |
| -------- | --------- |
| Markdown | ✅        |
| MDX      | ✅        |
| Search   | ✅        |

## Task Lists

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Next Steps

Learn about configuring your documentation site.
