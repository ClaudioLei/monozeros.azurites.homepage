"use client"

import Link from "next/link"
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Zap,
  Gauge,
  Clock3,
  ServerCog,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  {
    value: "SLA-basiert",
    label: "Reaktionszeiten",
    detail: "Klare Eskalations- und Kommunikationspfade statt unklarer Warteschleifen.",
    icon: Clock3,
  },
  {
    value: "24/7",
    label: "SOC-Monitoring",
    detail: "Kontinuierliche Überwachung durch die Cynclair/AZURITES-Plattform.",
    icon: Gauge,
  },
  {
    value: "gemäss SLA",
    label: "Service-Verfügbarkeit",
    detail: "Planbare Betriebsmodelle für Sicherheitsverantwortliche und IT-Teams.",
    icon: ServerCog,
  },
  {
    value: "Zahlreiche",
    label: "Integrationen",
    detail: "API-, Syslog-, Agent- und Log-Collector-Anbindungen für bestehende Landschaften.",
    icon: Workflow,
  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            24/7 MDR-Monitoring für Schweizer Unternehmen
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            Monozeros unterstützt Schweizer Organisationen beim Einsatz moderner OpenXDR- und MDR-Services auf Basis
            der AZURITES/Cynclair-Plattform mit lokaler Beratung, strukturiertem Onboarding und klaren
            Eskalationsprozessen.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/assessment">
              <Button
                size="lg"
                className="gap-2 bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90"
              >
                MDR Assessment starten
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border px-8 text-base text-foreground hover:bg-secondary"
              >
                Beratungsgespräch buchen
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>24/7 SOC-Monitoring über Cynclair/AZURITES</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-5 w-5 text-primary" />
              <span>Deutschsprachige Kundenbetreuung gemäss SLA</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-5 w-5 text-primary" />
              <span>Schweizer Hosting optional</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>API-, Syslog-, Agent- und Log-Collector-Integration</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative mt-24 overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl shadow-primary/5 backdrop-blur-sm md:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute -top-20 right-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 border-b border-border/40 pb-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary/80">Service Highlights</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Operative Sicherheit mit klaren Zusagen statt nur guten Absichten
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Die wichtigsten Leistungsmerkmale auf einen Blick, damit Entscheider sofort verstehen, wie der Service im
              Alltag trägt.
            </p>
          </div>

          <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-background/90"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-8 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-primary">{stat.label}</div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
