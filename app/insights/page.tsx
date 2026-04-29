import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Clock, Tag } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Insights | Monozeros",
  description: "Fachwissen zu MDR, SOC, Cybersecurity und Compliance für Schweizer Unternehmen.",
}

const articles = [
  {
    slug: "mdr-schweiz-was-ist-das",
    title: "MDR Schweiz: Was ist Managed Detection & Response?",
    excerpt: "Ein umfassender Leitfaden zu MDR Services für Schweizer Unternehmen. Erfahren Sie, wie Managed Detection & Response funktioniert und ob es für Ihr Unternehmen geeignet ist.",
    category: "MDR Grundlagen",
    readTime: "8 Min",
    date: "15. März 2024",
  },
  {
    slug: "braucht-mein-unternehmen-ein-soc",
    title: "Braucht mein Unternehmen ein SOC?",
    excerpt: "Die Entscheidungshilfe für IT-Verantwortliche: Wann lohnt sich ein eigenes Security Operations Center und wann ist Outsourcing die bessere Wahl?",
    category: "Strategie",
    readTime: "6 Min",
    date: "8. März 2024",
  },
  {
    slug: "microsoft-defender-ohne-soc",
    title: "Microsoft Defender ohne SOC – geht das?",
    excerpt: "Viele Unternehmen setzen Microsoft Defender ein, aber wer überwacht die Alerts? Wir zeigen, wie Sie das Maximum aus Defender herausholen.",
    category: "Technologie",
    readTime: "5 Min",
    date: "1. März 2024",
  },
  {
    slug: "incident-response-checkliste",
    title: "Incident Response Checkliste für KMU",
    excerpt: "Was tun bei einem Cyberangriff? Diese praktische Checkliste hilft Ihnen, im Ernstfall richtig zu reagieren und Schäden zu minimieren.",
    category: "Best Practices",
    readTime: "7 Min",
    date: "22. Februar 2024",
  },
  {
    slug: "soc-outsourcing-schweiz",
    title: "SOC Outsourcing in der Schweiz: Ein Vergleich",
    excerpt: "Die wichtigsten Kriterien bei der Auswahl eines SOC-Anbieters in der Schweiz. Worauf sollten Sie achten?",
    category: "Vergleich",
    readTime: "10 Min",
    date: "15. Februar 2024",
  },
  {
    slug: "cybersecurity-kmu-schweiz",
    title: "Cybersecurity für KMU Schweiz: Der Einstieg",
    excerpt: "Kleine und mittlere Unternehmen sind besonders gefährdet. Wir zeigen, wie Sie mit begrenzten Ressourcen ein solides Security-Fundament aufbauen.",
    category: "KMU",
    readTime: "9 Min",
    date: "8. Februar 2024",
  },
]

export default function InsightsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Insights
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Wissen für Ihre IT-Sicherheit
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Praxisnahe Artikel zu MDR, SOC, Compliance und Cybersecurity für Schweizer Unternehmen.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Featured Article */}
          <div className="mb-16">
            <Link 
              href={`/insights/${articles[0].slug}`}
              className="group block rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">MDR</div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="inline-flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded">
                      <Tag className="h-3 w-3" />
                      {articles[0].category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {articles[0].readTime}
                    </span>
                    <span>{articles[0].date}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {articles[0].title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                    Artikel lesen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                  <div className="text-3xl font-bold text-primary/20">{article.category.slice(0, 3).toUpperCase()}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
                    Weiterlesen
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Haben Sie Fragen zu Ihrer IT-Sicherheit?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Unsere Security-Experten beraten Sie gerne unverbindlich.
          </p>
          <div className="mt-8">
            <Link href="/kontakt">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Beratungsgespräch vereinbaren
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
