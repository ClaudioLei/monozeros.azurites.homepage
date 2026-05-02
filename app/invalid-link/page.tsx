export default function InvalidLinkPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Dieser Link ist ungültig.
        </h1>
        <p className="text-lg text-muted-foreground">
          Bitte kontaktieren Sie{" "}
          <a href="mailto:hello@monozeros.ch" className="text-primary hover:underline">
            hello@monozeros.ch
          </a>
        </p>
      </div>
    </main>
  )
}