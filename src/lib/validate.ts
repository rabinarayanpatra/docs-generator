import fs from 'fs'
import path from 'path'

/**
 * Validates that the required index.md file exists in the content directory
 * @throws {Error} If index.md is missing
 */
export function validateContentStructure(): void {
  const contentDir = path.join(process.cwd(), 'content')
  const indexPath = path.join(contentDir, 'index.md')
  const indexMdxPath = path.join(contentDir, 'index.mdx')

  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    throw new Error(
      `Missing required directory: 'content'\n\n` +
        `Please create a 'content' directory in the root of your project.\n` +
        `This directory should contain your documentation markdown files.`
    )
  }

  // Check if index.md or index.mdx exists
  if (!fs.existsSync(indexPath) && !fs.existsSync(indexMdxPath)) {
    throw new Error(
      `Missing required file: 'content/index.md'\n\n` +
        `Please create an index.md file in the content directory to serve as your documentation home page.\n\n` +
        `Example content/index.md:\n` +
        `---\n` +
        `title: "Welcome"\n` +
        `description: "Documentation home page"\n` +
        `---\n\n` +
        `# Welcome to the Documentation\n\n` +
        `Get started by exploring the documentation.`
    )
  }
}
