"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Handshake, 
  TrendingUp, 
  Shield, 
  Users, 
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  Cloud,
  Server,
  Zap
} from "lucide-react"

const partnerTypes = [
  {
    icon: Server,
    title: "MSPs",
    description: "Managed Service Provider, die ihr Portfolio erweitern möchten"
  },
  {
    icon: Building2,
    title: "IT Service Provider",
    description: "IT-Dienstleister mit Fokus auf Unternehmenskunden"
  },
  {
    icon: Cloud,
    title: "Cloud Provider",
    description: "Cloud-Anbieter, die Security Services ergänzen wollen"
  },
  {
    icon: Shield,
    title: "Microsoft Partner",
    description: "Microsoft Partner mit Defender-Implementierungen"
  }
]

const benefits = [
  {
    icon: Layers,
    title: "White Label Optionen",
    description: "Bieten Sie MDR/XDR unter Ihrer eigenen Marke an - nahtlos integriert in Ihr bestehendes Portfolio."
  },
  {
    icon: Handshake,
    title: "Gemeinsames Go-to-Market",
    description: "Profitieren Sie von gemeinsamen Marketing- und Vertriebsaktivitäten für schnelleren Markterfolg."
  },
  {
    icon: Zap,
    title: "Technische Integration",
    description: "Einfache Integration in Ihre bestehenden Prozesse und Tools durch moderne APIs und Schnittstellen."
  },
  {
    icon: TrendingUp,
    title: "Neue Recurring Umsätze",
    description: "Erschliessen Sie wiederkehrende Einnahmen durch Security Services ohne eigene SOC-Investition."
  },
  {
    icon: Users,
    title: "Höhere Kundenbindung",
    description: "Stärken Sie Kundenbeziehungen durch erweiterte Security-Dienstleistungen und 24/7 Verfügbarkeit."
  },
  {
    icon: Shield,
    title: "Security ohne SOC",
    description: "Erweitern Sie Ihr Angebot um professionelle Security Operations ohne eigenes Security Operations Center."
  }
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8">
                <Handshake className="h-4 w-4 text-primary" />
                Partnerprogramm
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Managed XDR für Schweizer IT-Partner
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
                Erweitern Sie Ihr Portfolio um professionelle Security Operations. 
                Mit Monozeros als Partner bieten Sie Ihren Kunden 24/7 Managed Detection & Response - 
                ohne eigenes SOC aufbauen zu müssen.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/kontakt">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Partnergespräch buchen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Für wen ist das Partnerprogramm?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Unser Partnerprogramm richtet sich an IT-Dienstleister im Schweizer Markt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerTypes.map((type) => (
                <div 
                  key={type.title}
                  className="rounded-xl border border-border/60 bg-card p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4">
                    <type.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ihre Vorteile als Partner
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Profitieren Sie von einem durchdachten Partnerprogramm
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border border-border/60 bg-card p-6 lg:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-6">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                So funktioniert die Partnerschaft
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Erstgespräch",
                  description: "Wir besprechen Ihre Anforderungen, Zielkunden und wie eine Zusammenarbeit aussehen könnte."
                },
                {
                  step: "02",
                  title: "Onboarding",
                  description: "Sie erhalten Zugang zu unserer Plattform, Schulungsmaterialien und technischen Ressourcen."
                },
                {
                  step: "03",
                  title: "Go-to-Market",
                  description: "Gemeinsam entwickeln wir Angebote für Ihre Kunden und starten die Vermarktung."
                }
              ].map((phase) => (
                <div key={phase.step} className="relative">
                  <div className="text-6xl font-bold text-primary/10 mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Partners Get */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Was Sie als Partner erhalten
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Umfassende Unterstützung für Ihren Erfolg im Security-Markt
                </p>
                
                <ul className="mt-8 space-y-4">
                  {[
                    "Zugang zur OpenXDR-Plattform",
                    "White Label Möglichkeiten",
                    "Technisches Enablement und Schulungen",
                    "Vertriebsunterstützung und Materialien",
                    "Dedizierter Partner Manager",
                    "Attraktive Partnerkonditionen",
                    "Gemeinsame Kundenbetreuung",
                    "Marketing-Unterstützung"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Bereit für eine Partnerschaft?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Lassen Sie uns besprechen, wie wir gemeinsam den Schweizer Markt 
                  mit professionellen Security Operations versorgen können.
                </p>
                <Link href="/kontakt">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Partnergespräch vereinbaren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Unverbindliches Erstgespräch - wir melden uns innerhalb von 24 Stunden
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
