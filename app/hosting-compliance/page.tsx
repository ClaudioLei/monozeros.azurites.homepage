"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Server,
  Globe,
  ShieldCheck,
  Lock,
  FileCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Building2,
  Scale
} from "lucide-react"

export default function HostingPage() {
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
                <Server className="h-4 w-4 text-primary" />
                Flexible Betriebsmodelle
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Hosting & Compliance
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
                Flexible Betriebsmodelle für Budget, Sicherheit und Compliance.
                Wählen Sie das Deployment, das zu Ihren Anforderungen passt.
              </p>
            </div>
          </div>
        </section>

        {/* Deployment Options */}
        <section className="py-24 bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Deployment-Optionen
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Von kosteneffizient bis hochreguliert - wir bieten das passende Modell
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Deployment */}
              <div className="relative rounded-2xl border border-border/60 bg-card p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Standard Deployment</h3>
                    <span className="text-sm text-primary font-medium">Empfohlen für Mid-Market</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">
                  Gehostet auf AWS Singapore - die kosteneffiziente Lösung für schnellen Start
                  und professionellen Betrieb. Ideal für viele Mid-Market Unternehmen.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "AWS Singapore Infrastructure",
                    "Schneller Projektstart",
                    "Kosteneffizient",
                    "Enterprise-grade Sicherheit",
                    "Ideal für Mid-Market Kunden",
                    "Bewährtes Betriebsmodell"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Go-live in wenigen Tagen möglich
                  </span>
                </div>
              </div>

              {/* Switzerland Deployment */}
              <div className="relative rounded-2xl border-2 border-primary/30 bg-card p-8 lg:p-10">
                <div className="absolute -top-3 right-8">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Optional
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Switzerland Deployment</h3>
                    <span className="text-sm text-muted-foreground font-medium">Für erhöhte Anforderungen</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">
                  Dediziertes Hosting auf AWS Schweiz für Unternehmen mit erhöhten
                  regulatorischen Anforderungen und sensiblen Workloads.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "AWS Schweiz (Zürich Region)",
                    "Daten verbleiben in der Schweiz",
                    "Für regulierte Branchen",
                    "Dedizierte Infrastruktur",
                    "Ideal für sensible Workloads",
                    "Individuelle Angebote"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Dedizierte Beratung für Ihr Setup
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance & Data Protection */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Governance & Datenschutz
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Strukturierte Prozesse und transparente Kontrollen für Ihren Betrieb
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Rollenbasierte Zugriffe",
                  description: "Granulare Zugriffssteuerung nach dem Least-Privilege-Prinzip für alle Benutzer und Systeme."
                },
                {
                  icon: FileCheck,
                  title: "Transparente Prozesse",
                  description: "Dokumentierte Abläufe, nachvollziehbare Entscheidungen und klare Verantwortlichkeiten."
                },
                {
                  icon: AlertTriangle,
                  title: "Definierte Eskalationen",
                  description: "Strukturierte Eskalationspfade mit definierten Reaktionszeiten und Ansprechpartnern."
                },
                {
                  icon: Scale,
                  title: "Nachvollziehbare Reports",
                  description: "Regelmässige Berichte über Sicherheitslage, Vorfälle und durchgeführte Massnahmen."
                },
                {
                  icon: Lock,
                  title: "Datenschutz by Design",
                  description: "Datenschutzprinzipien von Anfang an in alle Prozesse und Systeme integriert."
                },
                {
                  icon: ShieldCheck,
                  title: "Kundenspezifische Modelle",
                  description: "Anpassbare Betriebsmodelle nach Ihren spezifischen Anforderungen und Policies."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/60 bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-16 bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Wichtiger Hinweis
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monozeros bietet keine Rechtsberatung an. Die Compliance-Unterstützung erfolgt
                      ausschliesslich auf technischer und organisatorischer Ebene. Für rechtliche
                      Fragestellungen empfehlen wir die Konsultation entsprechender Fachpersonen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-border/60 p-12 lg:p-16">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Welches Modell passt zu Ihnen?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Lassen Sie uns gemeinsam herausfinden, welches Deployment-Modell
                  optimal zu Ihren Anforderungen und Ihrem Budget passt.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/assessment">
                    <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                      Assessment starten
                    </Button>
                  </Link>
                  <Link href="/kontakt">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary">
                      Beratungsgespräch buchen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
