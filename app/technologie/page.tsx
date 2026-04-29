import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Layers, Cloud, Server, Mail, Key, Shield, 
  ArrowRight, Check, Plug, Terminal, Webhook
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Technologie | Monozeros",
  description: "OpenXDR über bestehende Security Investments. Integration mit Microsoft Defender, CrowdStrike, Fortinet, Palo Alto und mehr.",
}

const integrations = [
  { name: "Microsoft Defender", category: "Endpoint" },
  { name: "CrowdStrike", category: "Endpoint" },
  { name: "SentinelOne", category: "Endpoint" },
  { name: "Fortinet", category: "Network" },
  { name: "Palo Alto", category: "Network" },
  { name: "Cisco", category: "Network" },
  { name: "Okta", category: "Identity" },
  { name: "Entra ID", category: "Identity" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Microsoft 365", category: "Productivity" },
]

const integrationTypes = [
  {
    icon: Webhook,
    title: "API",
    description: "Direkte API-Integration für Echtzeit-Daten"
  },
  {
    icon: Terminal,
    title: "Syslog",
    description: "Standard Syslog-Forwarding für Netzwerk-Logs"
  },
  {
    icon: Plug,
    title: "Agent",
    description: "Leichtgewichtige Agents für Endpoint-Daten"
  },
  {
    icon: Server,
    title: "Log Collector",
    description: "On-Premise Collector für sensitive Umgebungen"
  },
]

const benefits = [
  "Keine Rip-and-Replace Migration",
  "Maximale Nutzung bestehender Investments",
  "Herstellerunabhängige Korrelation",
  "Single Pane of Glass",
  "Schnelle Integration in Wochen",
  "Kontinuierliche Erweiterung",
]

const categories = [
  { icon: Shield, name: "Endpoint Security", count: "3+" },
  { icon: Cloud, name: "Cloud Plattformen", count: "3+" },
  { icon: Server, name: "Network Security", count: "5+" },
  { icon: Key, name: "Identity Provider", count: "2+" },
  { icon: Mail, name: "Email Security", count: "2+" },
  { icon: Layers, name: "SIEM/SOAR", count: "3+" },
]

export default function TechnologiePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Technologie
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              OpenXDR über bestehende Security Investments
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Keine Migration erforderlich. Wir integrieren Ihre bestehenden Security-Tools und schaffen eine einheitliche Sicht auf Ihre gesamte IT-Sicherheit.
            </p>
          </div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-12 bg-primary/5 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <Layers className="h-8 w-8 text-primary" />
            <p className="text-xl font-semibold text-foreground">
              Keine Rip-and-Replace Migration.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Integration mit Ihrem Stack
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Wir verbinden uns mit den Tools, die Sie bereits nutzen
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-xl border border-border/60 bg-card p-6 text-center transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{category.name}</h3>
                <p className="mt-1 text-2xl font-bold text-primary">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Unterstützte Integrationen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Eine Auswahl unserer häufigsten Integrationen
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-4 transition-all duration-300 hover:border-primary/50"
              >
                <span className="font-medium text-foreground">{integration.name}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {integration.category}
                </span>
              </div>
            ))}
          </div>
          
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ihre Lösung nicht dabei? Kontaktieren Sie uns – wir erweitern kontinuierlich unsere Integrationen.
          </p>
        </div>
      </section>

      {/* Integration Types */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Flexible Integrationsarten
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Je nach Ihrer Infrastruktur bieten wir verschiedene Integrationsmöglichkeiten – von API-basierten Verbindungen bis zu On-Premise Log Collectors.
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {integrationTypes.map((type) => (
                  <div key={type.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <type.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl border border-border/60 bg-card p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Vorteile des OpenXDR Ansatzes
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-border/40">
                <Link href="/assessment">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    Integration prüfen lassen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
