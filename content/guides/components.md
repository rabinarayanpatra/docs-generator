---
title: 'MDX Components Guide'
description: 'Learn how to use custom MDX components in your documentation'
order: 2
---

# MDX Components Guide

This guide showcases all the custom components available in your documentation.

## Text Formatting

You can use **bold text**, _italic text_, and `inline code` in your documentation.

### Links

Internal links work automatically: [Getting Started](./getting-started)

External links open in a new tab: [Next.js](https://nextjs.org)

## Code Blocks

Code blocks include syntax highlighting and a copy button that appears on hover:

```typescript
interface User {
  id: string
  name: string
  email: string
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

```bash
npm install next-mdx-remote
npm install gray-matter
```

### Line Highlighting

You can highlight specific lines in code blocks using the `{line-numbers}` syntax:

```typescript {2,4-6}
function calculateTotal(items: Item[]) {
  // This line is highlighted
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  // These lines are also highlighted
  const tax = subtotal * 0.1
  const total = subtotal + tax
  return total
}
```

### Word Highlighting

You can also highlight specific words or phrases using the `/word/` syntax:

```javascript
const message = console.log(message) //"Hello, World!"//
```

## Callouts

Use callouts to highlight important information:

<Callout type="info" title="Information">
This is an informational callout. Use it to provide helpful context or additional details.
</Callout>

<Callout type="warning" title="Warning">
This is a warning callout. Use it to alert users about potential issues or important considerations.
</Callout>

<Callout type="error" title="Error">
This is an error callout. Use it to highlight critical problems or things to avoid.
</Callout>

<Callout type="success" title="Success">
This is a success callout. Use it to confirm successful operations or best practices.
</Callout>

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Tables

| Feature             | Description                  | Status         |
| ------------------- | ---------------------------- | -------------- |
| MDX Support         | Full MDX component support   | ✅ Enabled     |
| Syntax Highlighting | Code highlighting with Shiki | ✅ Enabled     |
| Dark Mode           | Theme toggle support         | ✅ Enabled     |
| Search              | Full-text search             | 🚧 Coming Soon |

## Blockquotes

> This is a blockquote. Use it for quotes, important notes, or to highlight key takeaways from your documentation.
>
> You can have multiple paragraphs in a blockquote.

## Images

Images are automatically optimized and responsive:

![Documentation Example](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80)

## Horizontal Rules

You can use horizontal rules to separate sections:

---

## Headings

Headings automatically get anchor links for easy sharing:

### Level 3 Heading

#### Level 4 Heading

## File Tree

Display project structure with files and folders:

<FileTree>
  <FileTreeItem name="src" type="folder">
    <FileTreeItem name="app" type="folder">
      <FileTreeItem name="layout.tsx" />
      <FileTreeItem name="page.tsx" />
      <FileTreeItem name="[...slug]" type="folder">
        <FileTreeItem name="page.tsx" />
      </FileTreeItem>
    </FileTreeItem>
    <FileTreeItem name="components" type="folder">
      <FileTreeItem name="ui" type="folder" />
      <FileTreeItem name="mdx" type="folder" />
    </FileTreeItem>
    <FileTreeItem name="lib" type="folder">
      <FileTreeItem name="docs.ts" />
      <FileTreeItem name="mdx.ts" />
    </FileTreeItem>
  </FileTreeItem>
  <FileTreeItem name="content" type="folder">
    <FileTreeItem name="index.md" />
    <FileTreeItem name="guides" type="folder" />
  </FileTreeItem>
  <FileTreeItem name="package.json" />
  <FileTreeItem name="tsconfig.json" />
</FileTree>

## Steps

Use steps to create sequential instructions with visual numbering:

<Steps>
  <Step title="Clone the repository">
    First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/username/docs-generator.git
    ```

  </Step>
  <Step title="Install dependencies">
    Navigate to the project directory and install dependencies:

    ```bash
    cd docs-generator
    npm install
    ```

  </Step>
  <Step title="Start development server">
    Run the development server:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

  </Step>
</Steps>

## Tabs

Use tabs to organize related content like code examples for different package managers:

<Tabs defaultValue="npm">
  <TabList>
    <Tab value="npm" label="npm" />
    <Tab value="yarn" label="Yarn" />
    <Tab value="pnpm" label="pnpm" />
  </TabList>
  <TabPanel value="npm">
    ```bash
    npm install next-mdx-remote
    ```
  </TabPanel>
  <TabPanel value="yarn">
    ```bash
    yarn add next-mdx-remote
    ```
  </TabPanel>
  <TabPanel value="pnpm">
    ```bash
    pnpm add next-mdx-remote
    ```
  </TabPanel>
</Tabs>

## Math Equations

Our documentation supports mathematical equations using KaTeX syntax.

### Inline Math

Use single dollar signs for inline equations: $E = mc^2$ and $a^2 + b^2 = c^2$.

### Block Math

Use double dollar signs for display equations:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Complex Equations

$$
\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &= \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} &= 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} &= \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} &= 0
\end{aligned}
$$

## Diagrams with Mermaid

Create beautiful diagrams using Mermaid syntax. Diagrams automatically adapt to your theme (light/dark mode).

### Flow Chart

<Mermaid chart={`graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`} />

### Sequence Diagram

<Mermaid chart={`
sequenceDiagram
participant User
participant Browser
participant Server
participant Database

    User->>Browser: Enter URL
    Browser->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Data
    Server-->>Browser: HTTP Response
    Browser-->>User: Display Page

`} />

### Class Diagram

<Mermaid chart={`classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`} />

## Cards

Highlight features, links, or important information using cards.

### Basic Cards

<CardGrid cols={2}>
  <Card title="Getting Started">
    Learn the basics of setting up and using this documentation system.
  </Card>
  <Card title="Advanced Features">
    Explore advanced features like custom components and theming.
  </Card>
</CardGrid>

### Cards with Links

<CardGrid cols={3}>
  <Card title="Installation" href="/guides/getting-started">
    Quick setup guide to get you started in minutes.
  </Card>
  <Card title="Configuration" href="/guides/configuration">
    Customize your documentation to match your needs.
  </Card>
  <Card title="Deployment" href="/guides/deployment">
    Deploy your documentation to production.
  </Card>
</CardGrid>

### Feature Cards

<CardGrid cols={2}>
  <Card title="Fast Performance">
    Built with Next.js for optimal performance and SEO.
  </Card>
  <Card title="Full-text Search">
    Powerful search with FlexSearch for instant results.
  </Card>
  <Card title="Dark Mode">
    Beautiful light and dark themes with automatic switching.
  </Card>
  <Card title="MDX Support">
    Write content in Markdown with React components.
  </Card>
</CardGrid>

## Tips for Using Components

<Callout type="info" title="Best Practices">
- Use callouts sparingly to maintain their impact
- Choose the appropriate callout type for your message
- Keep code examples concise and focused
- Add descriptive titles to callouts when possible
- Use tabs for alternative options (package managers, languages, etc.)
- Use inline math for simple equations and block math for complex ones
- Use Mermaid diagrams to visualize flows, architectures, and relationships
- Use cards to highlight features or create visual navigation
</Callout>
