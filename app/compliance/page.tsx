import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Shield, Database, Lock, FileText, Users, AlertTriangle,
  Check, ArrowRight, Building2, Scale
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Compliance & Trust | Monozeros",
  description: "Cybersecurity mit Governance-Fokus. Swiss Hosted, ISO 27001 readiness, revDSG-orientierte Prozesse.",
}

const trustCenterItems = [
  {
    icon: Database,
    title: "Datenhaltung Schweiz",
    description: "Ihre Daten bleiben in der Schweiz. Wir nutzen kontrollierte Infrastrukturmodelle mit Azure Switzerland als bevorzugtem Standort.",
    features: ["Azure Switzerland", "Schweizer Rechenzentren", "Keine Datenexporte"]
  },
  {
    icon: Lock,
    title: "Security Governance",
    description: "Dokumentierte Rollen, Berechtigungen und Eskalationsprozesse. Vollständige Auditierbarkeit aller Aktivitäten.",
    features: ["Rollenbasierte Zugriffe", "Eskalationsprozesse", "Audit Trails"]
  },
  {
    icon: Shield,
    title: "Datenschutz",
    description: "Transparente Prozesse orientiert an Auftragsbearbeitung. Wir verarbeiten nur, was für den Service notwendig ist.",
    features: ["Transparente Verarbeitung", "Minimale Datenerhebung", "Klare Zweckbindung"]
  },
  {
    icon: FileText,
    title: "Security Roadmap",
    description: "ISO 27001 Readiness mit dokumentierten Kontrollen. Wir arbeiten kontinuierlich an unserer Prozessreife.",
    features: ["ISO 27001 orientiert", "Dokumentierte Kontrollen", "Kontinuierliche Verbesserung"]
  },
  {
    icon: AlertTriangle,
    title: "Incident Readiness",
    description: "Definierte Eskalationsketten und Management Reports. Vollständige Nachvollziehbarkeit bei Sicherheitsvorfällen.",
    features: ["Eskalationsketten", "Management Reports", "Incident Documentation"]
  },
]

const complianceSupport = [
  {
    title: "revDSG-orientierte Prozesse",
    description: "Unsere Prozesse sind auf das revidierte Datenschutzgesetz der Schweiz ausgerichtet."
  },
  {
    title: "Security Reporting",
    description: "Regelmässige Reports für Management, Verwaltungsrat und externe Prüfer."
  },
  {
    title: "Incident Dokumentation",
    description: "Lückenlose Dokumentation aller Sicherheitsvorfälle für Compliance-Nachweise."
  },
  {
    title: "Regulierte Organisationen",
    description: "Erfahrung mit Healthcare, Finance und öffentlichen Institutionen."
  },
]

export default function CompliancePage() {
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
              Compliance & Trust
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Cybersecurity mit Governance-Fokus
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Vertrauen durch Transparenz. Erfahren Sie, wie Monozeros Ihre Daten schützt und Compliance-Anforderungen unterstützt.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Center */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <Shield className="h-4 w-4" />
              Trust Center
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transparenz schafft Vertrauen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Detaillierte Informationen zu unseren Sicherheitsmassnahmen und Prozessen
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {trustCenterItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Support */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Compliance Unterstützung
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Wir unterstützen Ihre Compliance
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Monozeros hilft Ihnen, regulatorische Anforderungen zu erfüllen. Unsere Prozesse und Reports sind auf die Bedürfnisse regulierter Organisationen ausgerichtet.
              </p>
              
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {complianceSupport.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg border border-border/60 bg-secondary/30">
                <div className="flex items-start gap-3">
                  <Scale className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Hinweis:</strong> Monozeros bietet keine Rechtsberatung. Für rechtliche Fragen zu Datenschutz und Compliance empfehlen wir die Konsultation spezialisierter Anwälte.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-2xl shadow-primary/5">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Für regulierte Branchen</span>
                </div>
                
                <div className="space-y-4">
                  {["Healthcare", "Finance", "Public Sector", "Industrie"].map((industry) => (
                    <div key={industry} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-foreground font-medium">{industry}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">Erfahrung</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link href="/kontakt">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                      Compliance-Gespräch vereinbaren
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
