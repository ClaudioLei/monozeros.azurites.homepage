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
  const categoryText = {
    Priority: "Hohe MDR-Priorität",
    Qualified: "MDR-relevanter Bedarf",
    Standard: "Standard-Einschätzung",
  }[params.category || ""] || params.category
  const complexityText = {
    High: "Hohe Komplexität",
    Medium: "Mittlere Komplexität",
    Low: "Niedrige Komplexität",
  }[params.complexity || ""] || params.complexity
  const explanation =
    params.complexity === "High"
      ? "Mehrere Sizing-Treiber wie Cloud, Compliance, 24/7-Bedarf oder verteilte Umgebung sprechen für eine detaillierte MDR-Auslegung."
      : params.complexity === "Medium"
        ? "Die Angaben deuten auf relevante MDR-Anforderungen hin. Eine gezielte Abklärung der wichtigsten Logquellen und Betriebszeiten ist sinnvoll."
        : "Die Angaben wirken überschaubar. Für die nächste Einschätzung sind vor allem die kritischen Systeme und vorhandenen Security-Tools relevant."

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground">Vielen Dank.</h1>
        <p className="text-lg text-muted-foreground">
          Ihre Angaben wurden erfolgreich übermittelt. Unser Team prüft die Informationen und meldet sich zeitnah.
        </p>
        {hasScore && (
          <div className="mt-8 rounded-lg border border-border bg-card p-5 text-left">
            <p className="text-sm text-muted-foreground">Assessment Score</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{score}</p>
            {categoryText && (
              <p className="mt-3 text-sm text-muted-foreground">
                Kategorie: <span className="text-foreground">{categoryText}</span>
              </p>
            )}
            {complexityText && (
              <p className="mt-1 text-sm text-muted-foreground">
                Komplexität: <span className="text-foreground">{complexityText}</span>
              </p>
            )}
            <p className="mt-4 text-sm text-muted-foreground">{explanation}</p>
          </div>
        )}
      </div>
    </main>
  )
}
