# Documentation Generator

A modern, fast, and beautiful documentation generator built with Next.js 16, TypeScript, and Tailwind CSS. Create stunning documentation sites with MDX support, full-text search, dark mode, and more.

## Features

- **📝 MDX Support** - Write documentation with Markdown and React components
- **🎨 Beautiful UI** - Clean, responsive design with dark mode support
- **🔍 Full-Text Search** - Fast client-side search powered by FlexSearch
- **📱 Mobile Responsive** - Optimized for all screen sizes
- **🎯 SEO Optimized** - Built-in SEO with sitemap, robots.txt, and RSS feed
- **⚡ Lightning Fast** - Built on Next.js 16 with Turbopack for optimized performance
- **🧭 Auto Navigation** - Automatic prev/next navigation and table of contents
- **🎭 Syntax Highlighting** - Beautiful code blocks with Shiki
- **📊 Math Support** - KaTeX for mathematical expressions
- **🔗 Auto-linking** - Automatic heading anchor links
- **📈 Reading Time** - Estimated reading time for each page
- **🎪 Mermaid Diagrams** - Support for flowcharts and diagrams

## Quick Start

### Prerequisites

- Node.js 20.9.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd docs-generator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
docs-generator/
├── content/              # Your documentation content
│   ├── index.md         # Homepage
│   ├── getting-started/ # Getting started section
│   ├── guides/          # Guides section
│   └── api/             # API reference
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── layout.tsx   # Root layout
│   │   └── [...slug]/   # Dynamic documentation pages
│   ├── components/      # React components
│   │   ├── layout/      # Layout components
│   │   ├── navigation/  # Navigation components
│   │   ├── mdx/         # MDX components
│   │   └── search/      # Search components
│   ├── config/          # Configuration files
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets
└── next.config.ts       # Next.js configuration
```

## Writing Documentation

### Creating Pages

Create new documentation pages by adding Markdown or MDX files to the `content/` directory:

```markdown
---
title: Your Page Title
description: A brief description of the page
order: 1
published: true
---

# Your Page Title

Your content here...
```

### Frontmatter Options

- `title` (required): Page title
- `description` (required): Page description for SEO
- `order` (optional): Order within the section (default: 999)
- `published` (optional): Whether to publish the page (default: true)
- `date` (optional): Publication date
- `author` (optional): Author name
- `image` (optional): Page image for social sharing

### File Organization

Pages are organized by directory structure:

- `content/index.md` → `/`
- `content/getting-started/index.md` → `/getting-started`
- `content/guides/writing-docs.md` → `/guides/writing-docs`

### Sections

The default section order is:

1. Getting Started
2. Guides
3. API
4. Reference
5. Examples

You can customize this in `src/lib/page-navigation.ts`.

## Configuration

### Site Configuration

Edit `src/config/site.ts` to customize your site:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Your Documentation',
  description: 'Your site description',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.example.com',

  nav: {
    mainNav: [
      { title: 'Getting Started', href: '/getting-started' },
      { title: 'Guides', href: '/guides' },
      { title: 'API', href: '/api' },
    ],
    socialLinks: [{ title: 'GitHub', href: 'https://github.com/yourusername' }],
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
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://docs.example.com
```

### Navigation Configuration

Edit `src/lib/navigation.ts` to customize the sidebar navigation structure.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (using ESLint CLI)
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run analyze` - Analyze bundle size

## MDX Components

### Built-in Components

The documentation generator includes styled components for:

- Headings (h1-h4)
- Paragraphs
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Links (internal and external)
- Blockquotes
- Tables
- Images

### Code Blocks

Code blocks support syntax highlighting and line numbers:

\`\`\`typescript
function hello(name: string) {
console.log(`Hello, ${name}!`)
}
\`\`\`

### Math Expressions

Inline math: `$E = mc^2$`

Block math:

```
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
```

### Callouts

Use blockquotes for callouts:

```markdown
> **Note:** This is an important note.
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Set environment variables
6. Deploy

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
CMD ["npm", "start"]
```

## Performance

The documentation generator is optimized for performance:

- **Static Generation**: Pages are pre-rendered at build time
- **Image Optimization**: Automatic image optimization with Next.js
- **Bundle Analysis**: Use `npm run analyze` to analyze bundle size
- **Code Splitting**: Automatic code splitting for optimal loading
- **Request Caching**: React.cache() for efficient data fetching

## SEO Features

- Dynamic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Open Graph metadata
- Twitter Card metadata
- JSON-LD structured data
- RSS feed (`/feed.xml`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with Turbopack
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [FlexSearch](https://github.com/nextapps-de/flexsearch) - Full-text search
- [Shiki](https://shiki.matsu.io/) - Syntax highlighting
- [KaTeX](https://katex.org/) - Math rendering
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - UI primitives

## Support

For support, please open an issue on GitHub.
