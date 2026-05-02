import { Eye, Filter, Search, Bell, Shield, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    icon: Eye,
    title: "Monitoring",
    description: "Kontinuierliche Überwachung Ihrer gesamten IT-Infrastruktur"
  },
  {
    icon: Filter,
    title: "Alert Triage",
    description: "Intelligente Filterung und Priorisierung aller Sicherheitsmeldungen"
  },
  {
    icon: Search,
    title: "Investigation",
    description: "Tiefgehende Analyse verdächtiger Aktivitäten durch erfahrene Analysten"
  },
  {
    icon: Bell,
    title: "Eskalation",
    description: "Schnelle, strukturierte Eskalation an die richtigen Ansprechpartner"
  },
  {
    icon: Shield,
    title: "Response Koordination",
    description: "Professionelle Koordination aller Gegenmassnahmen"
  },
  {
    icon: FileText,
    title: "Reporting",
    description: "Executive Reports für Management und Compliance-Nachweise"
  },
]

export function SolutionSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Die Lösung
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Monozeros übernimmt Ihre Security Operations
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Wir sind Ihr externes Security Operations Center. Von der Überwachung bis zur Response – wir kümmern uns um Ihre IT-Sicherheit, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {solutions.map((solution) => (
                <div key={solution.title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <solution.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
<Link href="/mdr-managed-xdr">
                 <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                   Mehr über MDR erfahren
                   <ArrowRight className="h-4 w-4" />
                 </Button>
               </Link>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            <div className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-2xl shadow-primary/5">
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/40">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">monozeros-soc-dashboard</span>
              </div>

              {/* Mock SOC Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aktive Sensoren</span>
                  <span className="text-sm font-mono text-green-500">● 847 Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Alerts heute</span>
                  <span className="text-sm font-mono text-foreground">2,341</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Kritische Events</span>
                  <span className="text-sm font-mono text-primary">0 Offen</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">MTTR</span>
                  <span className="text-sm font-mono text-foreground">12 Min</span>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Letzte Aktivität: vor 2 Sekunden</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
