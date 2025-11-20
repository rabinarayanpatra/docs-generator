# Contributing to Documentation Generator

Thank you for your interest in contributing to the Documentation Generator! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Guidelines](#code-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- Git

### Setup

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/docs-generator.git
   cd docs-generator
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/docs-generator.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications
- `chore/` - Maintenance tasks

Examples:

- `feature/add-code-tabs`
- `fix/search-highlighting`
- `docs/update-installation`

### Making Changes

1. **Keep changes focused**
   - One feature or fix per pull request
   - Avoid mixing unrelated changes

2. **Test your changes**

   ```bash
   npm run lint        # Check for linting errors
   npm run type-check  # Check TypeScript types
   npm run test        # Run tests
   npm run build       # Test production build
   ```

3. **Update documentation**
   - Update README.md if needed
   - Add inline code comments for complex logic
   - Update or add JSDoc comments

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

## Code Guidelines

### TypeScript

- Use TypeScript for all new files
- Provide proper type annotations
- Avoid `any` type when possible
- Use interfaces for object shapes

```typescript
// Good
interface User {
  name: string
  email: string
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`
}

// Avoid
function greetUser(user: any) {
  return `Hello, ${user.name}!`
}
```

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use descriptive prop names

```typescript
// Good
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={getButtonClass(variant)}>
      {children}
    </button>
  )
}
```

### File Structure

- Components in `src/components/`
- Utilities in `src/lib/`
- Types in `src/types/`
- One component per file
- Co-locate related files

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use design tokens from theme
- Maintain consistent spacing

```typescript
// Good
<div className="flex items-center gap-4 p-4 md:gap-6 md:p-6">
  <h1 className="text-2xl font-bold md:text-3xl">Title</h1>
</div>
```

### Code Formatting

We use Prettier and ESLint. The configuration will format your code automatically on commit.

```bash
# Format manually
npm run format

# Lint manually
npm run lint
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test additions or modifications
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

### Examples

```bash
feat: add dark mode toggle

fix: resolve search highlighting issue

docs: update installation instructions

refactor: simplify navigation logic

perf: optimize image loading

test: add tests for search component
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Keep subject line under 72 characters
- Capitalize the subject line
- Don't end subject with a period
- Use imperative mood ("fix" not "fixes")
- Reference issues and PRs when applicable

```bash
# Good
git commit -m "feat: add search highlighting

Implements real-time highlighting of search results
in the command menu.

Closes #123"

# Bad
git commit -m "Added some fixes"
```

## Pull Request Process

### Before Submitting

1. **Update your branch**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**

   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

3. **Update documentation**
   - Update README if needed
   - Add inline comments
   - Update CHANGELOG if applicable

### Submitting

1. **Push your changes**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub and create a PR
   - Use a descriptive title
   - Fill out the PR template
   - Link related issues

3. **PR Title Format**
   Follow the same format as commit messages:
   ```
   feat: add your feature
   fix: resolve bug in component
   ```

### PR Description Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How to test these changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No console errors
```

### Review Process

- Maintainers will review your PR
- Address feedback and push updates
- Once approved, your PR will be merged
- Delete your branch after merge

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Writing Tests

Place tests next to the code they test:

```
src/
  components/
    Button.tsx
    Button.test.tsx
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button onClick={() => {}}>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Documentation

### Code Comments

Add comments for:

- Complex algorithms
- Non-obvious decisions
- Workarounds and hacks
- Public APIs

```typescript
/**
 * Calculates the reading time for a document
 * @param content - The markdown content
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  // Average reading speed is 200 words per minute
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
```

### README Updates

If your changes affect:

- Installation process
- Configuration options
- Available features
- API usage

Update the README.md accordingly.

## Getting Help

- Open an issue for bugs
- Start a discussion for questions
- Join our community chat
- Check existing issues and PRs

## Recognition

Contributors will be:

- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the changelog

Thank you for contributing!
