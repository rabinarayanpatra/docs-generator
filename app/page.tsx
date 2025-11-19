export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Documentation Generator
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Modern documentation built with Next.js 16
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/docs"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
