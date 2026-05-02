import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Eye, Search, Shield, Bell, FileText, Users, 
  Clock, Zap, Target, ArrowRight, Check 
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "MDR & Managed XDR | Monozeros",
  description: "Ihr externes Security Operations Center. 24/7 Monitoring, Threat Hunting, Incident Handling und Executive Reporting.",
}

const services = [
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Kontinuierliche Überwachung Ihrer gesamten IT-Infrastruktur durch erfahrene Security-Analysten. Keine Lücken, keine blinden Flecken."
  },
  {
    icon: Search,
    title: "Threat Hunting",
    description: "Proaktive Suche nach versteckten Bedrohungen in Ihrem Netzwerk. Wir finden Angreifer, bevor sie Schaden anrichten."
  },
  {
    icon: Shield,
    title: "Incident Handling",
    description: "Schnelle, professionelle Reaktion auf Sicherheitsvorfälle. Von der Erkennung bis zur Eindämmung – wir koordinieren alles."
  },
  {
    icon: Target,
    title: "Use Case Tuning",
    description: "Kontinuierliche Optimierung der Erkennungsregeln. Weniger False Positives, bessere Detection."
  },
  {
    icon: FileText,
    title: "Executive Reporting",
    description: "Verständliche Reports für Management und Verwaltungsrat. Compliance-ready und audit-tauglich."
  },
  {
    icon: Users,
    title: "Security Ansprechpartner",
    description: "Ihr dedizierter Security-Kontakt. Deutschsprachig, erreichbar und immer über Ihre Umgebung informiert."
  },
]

const process = [
  {
    step: "01",
    title: "Onboarding",
    description: "Integration Ihrer Systeme und Definition der Eskalationsprozesse"
  },
  {
    step: "02",
    title: "Tuning",
    description: "Optimierung der Detection Rules auf Ihre Umgebung"
  },
  {
    step: "03",
    title: "Operations",
    description: "24/7 Monitoring und kontinuierliche Verbesserung"
  },
  {
    step: "04",
    title: "Reporting",
    description: "Regelmässige Reviews und Executive Reports"
  },
]

const benefits = [
  "Kein eigenes SOC-Personal erforderlich",
  "Sofortiger Start ohne lange Aufbauphase",
  "Kalkulierbare monatliche Kosten",
  "Zugang zu Security-Expertenwissen",
  "24/7 Abdeckung ohne Schichtbetrieb",
  "Schweizer Ansprechpartner und Datenhaltung",
]

export default function MDRPage() {
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
              MDR & Managed XDR
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Ihr externes Security Operations Center
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Professionelle Security Operations ohne eigenes SOC. Wir übernehmen Monitoring, Detection und Response – Sie konzentrieren sich auf Ihr Kerngeschäft.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/assessment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Assessment starten
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Beratungsgespräch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Was wir für Sie übernehmen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Komplette Security Operations aus einer Hand
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              So funktioniert es
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Von der Integration bis zum laufenden Betrieb
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border/60 -translate-x-1/2" />
                )}
                <div className="text-5xl font-bold text-primary/20">{item.step}</div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & CTA */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ideal für Unternehmen ohne eigenes SOC
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Sie brauchen professionelle Security, aber kein eigenes Security Operations Center? Monozeros MDR ist die Lösung.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Quick Start</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                In 4 Wochen einsatzbereit
              </h3>
              <p className="mt-4 text-muted-foreground">
                Kein langwieriger Aufbau. Wir integrieren Ihre Systeme und starten mit dem Monitoring innerhalb von 4 Wochen.
              </p>
              <div className="mt-8">
                <Link href="/assessment">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
                    Jetzt Assessment starten
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
