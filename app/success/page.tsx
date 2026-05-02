import { Check } from "lucide-react"

interface SuccessPageProps {
  searchParams: Promise<{
    score?: string
    category?: string
    complexity?: string
  }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const score = params.score ? Number(params.score) : null
  const hasScore = Number.isFinite(score)

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-500/20 mb-6">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Vielen Dank.
        </h1>
        <p className="text-lg text-muted-foreground">
          Ihre Angaben wurden erfolgreich übermittelt.
          Unser Team prüft die Informationen und meldet sich zeitnah.
        </p>
        {hasScore && (
          <div className="mt-8 rounded-lg border border-border bg-card p-5 text-left">
            <p className="text-sm text-muted-foreground">Assessment Score</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{score}</p>
            {params.category && (
              <p className="mt-3 text-sm text-muted-foreground">
                Kategorie: <span className="text-foreground">{params.category}</span>
              </p>
            )}
            {params.complexity && (
              <p className="mt-1 text-sm text-muted-foreground">
                Komplexität: <span className="text-foreground">{params.complexity}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
