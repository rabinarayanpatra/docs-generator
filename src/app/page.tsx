export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Documentation Generator</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Modern documentation built with Next.js 16
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/docs"
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            className="rounded-lg border border-border px-6 py-3 transition-colors hover:bg-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
