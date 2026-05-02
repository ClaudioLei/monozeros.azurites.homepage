export default function AlreadySubmittedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Dieses Assessment wurde bereits eingereicht.
        </h1>
        <p className="text-lg text-muted-foreground">
          Vielen Dank.
        </p>
      </div>
    </main>
  )
}