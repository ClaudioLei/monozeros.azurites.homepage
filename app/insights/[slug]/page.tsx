import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

const articles = [
  {
    slug: "mdr-schweiz-was-ist-das",
    title: "MDR Schweiz: Was ist Managed Detection & Response?",
    category: "MDR Grundlagen",
    readTime: "8 Min",
    excerpt:
      "Managed Detection & Response verbindet Technologie, Analyse und operative Reaktion zu einem laufenden Security-Betrieb.",
  },
  {
    slug: "braucht-mein-unternehmen-ein-soc",
    title: "Braucht mein Unternehmen ein SOC?",
    category: "Strategie",
    readTime: "6 Min",
    excerpt:
      "Ob ein eigenes SOC sinnvoll ist, haengt von Risiko, Teamgroesse, Betriebszeiten und regulatorischen Anforderungen ab.",
  },
  {
    slug: "microsoft-defender-ohne-soc",
    title: "Microsoft Defender ohne SOC - geht das?",
    category: "Technologie",
    readTime: "5 Min",
    excerpt:
      "Microsoft Defender liefert wertvolle Signale, braucht aber klare Prozesse fuer Triage, Eskalation und laufende Optimierung.",
  },
  {
    slug: "incident-response-checkliste",
    title: "Incident Response Checkliste fuer KMU",
    category: "Best Practices",
    readTime: "7 Min",
    excerpt:
      "Eine vorbereitete Incident-Response-Struktur reduziert Reaktionszeit, Missverstaendnisse und Folgeschaeden.",
  },
  {
    slug: "soc-outsourcing-schweiz",
    title: "SOC Outsourcing in der Schweiz: Ein Vergleich",
    category: "Vergleich",
    readTime: "10 Min",
    excerpt:
      "Beim SOC-Outsourcing zaehlen Datenstandort, Transparenz, Integrationsfaehigkeit und klare Verantwortlichkeiten.",
  },
  {
    slug: "cybersecurity-kmu-schweiz",
    title: "Cybersecurity fuer KMU Schweiz: Der Einstieg",
    category: "KMU",
    readTime: "9 Min",
    excerpt:
      "Ein belastbares Security-Fundament entsteht durch priorisierte Massnahmen statt durch isolierte Einzeltools.",
  },
]

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: InsightArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return {}
  }

  return {
    title: `${article.title} | Monozeros`,
    description: article.excerpt,
  }
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pt-40">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurueck zu Insights
        </Link>

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded bg-primary/10 px-2 py-1 text-primary">
              {article.category}
            </span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-12 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Dieser Artikel ist als Platzhalter fuer die oeffentliche Route angelegt. Damit
            verlinkte Insight-Seiten nicht mehr in einem 404 enden, kann der Inhalt hier
            Schritt fuer Schritt mit finalen Fachartikeln ersetzt werden.
          </p>
          <p>
            Fuer eine erste Einordnung der eigenen Umgebung ist das MDR Sizing Assessment
            der passendere Einstieg.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  )
}
