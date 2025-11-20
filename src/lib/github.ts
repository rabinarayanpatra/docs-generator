import { cache } from 'react'

interface GitHubRepo {
  stargazers_count: number
  forks_count: number
  watchers_count: number
}

export const getGitHubStars = cache(async (repo: string): Promise<number> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch GitHub stars for ${repo}`)
      return 0
    }

    const data: GitHubRepo = await response.json()
    return data.stargazers_count
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
    return 0
  }
})
