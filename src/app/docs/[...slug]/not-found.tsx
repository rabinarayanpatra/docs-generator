import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-muted-foreground">
        The documentation page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/docs"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to Documentation
      </Link>
    </div>
  )
}
