import { Check, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const internalSOC = [
  { item: "3-5 Mitarbeitende erforderlich", negative: true },
  { item: "Schichtbetrieb organisieren", negative: true },
  { item: "Aufwändiges Recruiting", negative: true },
  { item: "Kontinuierliche Weiterbildung", negative: true },
  { item: "Tooling & Infrastruktur", negative: true },
  { item: "CHF 600'000+ jährlich", negative: true },
]

const monozeros = [
  { item: "Schneller Start in Wochen", negative: false },
  { item: "Kalkulierbare Kosten", negative: false },
  { item: "Sofortige Entlastung", negative: false },
  { item: "Expertenteam inklusive", negative: false },
  { item: "24/7 ohne Zusatzaufwand", negative: false },
  { item: "Auf Anfrage", negative: false },
]

export function ROISection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            ROI Vergleich
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Was kostet internes SOC vs Managed MDR?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Die Entscheidung für Managed Detection & Response ist auch eine wirtschaftliche.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Internal SOC */}
          <div className="rounded-2xl border border-border/60 bg-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Internes SOC</h3>
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                Komplex
              </span>
            </div>
            <ul className="space-y-4">
              {internalSOC.map((item) => (
                <li key={item.item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Monozeros */}
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8">
            <div className="absolute -top-3 left-6">
              <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                Empfohlen
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">MDR</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Einfach
              </span>
            </div>
            <ul className="space-y-4">
              {monozeros.map((item) => (
                <li key={item.item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item.item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-border/40">
              <Link href="/assessment">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Assessment starten
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
