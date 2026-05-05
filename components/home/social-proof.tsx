import { Building2, Network, TrendingUp, Users } from "lucide-react"

const segments = [
  {
    icon: Building2,
    title: "Regulierte Organisationen",
    description: "Die zugrunde liegende Cynclair/AZURITES-Plattform wird in regulierten Branchen eingesetzt. Monozeros fokussiert sich auf die Anforderungen Schweizer Unternehmen in Bereichen wie Healthcare, Finance, Public Sector und Industrie."
  },
  {
    icon: Network,
    title: "Komplexe IT-Landschaften",
    description: "Multi-Cloud, On-Premise und hybride Umgebungen – wir integrieren alles"
  },
  {
    icon: TrendingUp,
    title: "Wachsende Unternehmen",
    description: "Skalierbare Security, die mit Ihrem Unternehmen wächst"
  },
  {
    icon: Users,
    title: "MSP Partner",
    description: "White Label SOC Services für IT-Dienstleister und Cloud Provider"
  },
]

export function SocialProof() {
  return (
    <section className="py-24 lg:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Vertrauenswürdig
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Für anspruchsvolle Organisationen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Die zugrunde liegende Cynclair/AZURITES-Plattform wird in regulierten Branchen eingesetzt. Monozeros fokussiert sich auf die Anforderungen Schweizer Unternehmen in Bereichen wie Healthcare, Finance, Public Sector und Industrie.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment) => (
            <div
              key={segment.title}
              className="group relative rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <segment.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{segment.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{segment.description}</p>
            </div>
          ))}
        </div>

        {/* Industry logos placeholder */}
        <div className="mt-16 border-t border-border/40 pt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Fokusbranchen
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {["Healthcare", "Finance", "Public Sector", "Industrie", "Professionelle Dienstleister"].map((industry) => (
              <div
                key={industry}
                className="text-lg font-medium text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
