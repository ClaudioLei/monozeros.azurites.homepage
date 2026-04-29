import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Handshake, TrendingUp, Users, Shield, 
  Layers, HeartHandshake, ArrowRight, Check
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Für MSPs | Monozeros",
  description: "White Label SOC für ausgewählte Schweizer IT Partner. Co-Selling, technische Integration und neue recurring Revenue Streams.",
}

const benefits = [
  {
    icon: Handshake,
    title: "Co-Selling",
    description: "Gemeinsamer Vertrieb mit Ihrer Marke. Wir unterstützen Sie bei Kundengesprächen und technischen Präsentationen."
  },
  {
    icon: Shield,
    title: "White Label MDR",
    description: "Unser SOC unter Ihrer Marke. Ihre Kunden sehen Ihr Branding, Sie profitieren von unserer Expertise."
  },
  {
    icon: Layers,
    title: "Technische Integration",
    description: "Nahtlose Integration in Ihre bestehenden Tools und Prozesse. API-first Ansatz für maximale Flexibilität."
  },
  {
    icon: TrendingUp,
    title: "Recurring Revenue",
    description: "Neue monatliche Einnahmen mit Security Services. Attraktive Partnerkonditionen und Margen."
  },
  {
    icon: HeartHandshake,
    title: "Kundenbindung",
    description: "Stärken Sie die Beziehung zu Ihren Kunden durch umfassende Security Services."
  },
  {
    icon: Users,
    title: "Entlastung",
    description: "Kein eigenes SOC-Team erforderlich. Wir übernehmen die komplexen Security Operations."
  },
]

const partnerTypes = [
  "MSPs",
  "IT Service Provider",
  "Cloud Provider",
  "Microsoft Partner",
  "System Integratoren",
]

const features = [
  "Dedizierter Partner Manager",
  "White Label Dashboard",
  "Co-Branded Reports",
  "Partner Portal",
  "Technische Schulungen",
  "Marketing Unterstützung",
  "Attraktive Margen",
  "SLA Garantien",
]

export default function MSPPage() {
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
              Partner Programm
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              White Label SOC für ausgewählte Schweizer IT Partner
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Erweitern Sie Ihr Portfolio um professionelle Security Services. Ohne eigenes SOC-Team, ohne Investitionen in Infrastruktur.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/kontakt">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Partnergespräch buchen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Warum Partner werden?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Profitieren Sie von unserer Expertise und erweitern Sie Ihr Angebot
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types & Features */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Partner Types */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Für wen ist das Partnerprogramm?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Wir arbeiten mit ausgewählten IT-Partnern zusammen, die ihren Kunden erstklassige Security Services bieten möchten.
              </p>
              
              <ul className="mt-8 space-y-4">
                {partnerTypes.map((type) => (
                  <li key={type} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Features */}
            <div className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Was Sie als Partner erhalten
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-4">
                  Interessiert? Lassen Sie uns über eine Partnerschaft sprechen.
                </p>
                <Link href="/kontakt">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    Partnergespräch vereinbaren
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
