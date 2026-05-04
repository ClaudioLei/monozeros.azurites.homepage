import {
  AlertTriangle,
  Clock,
  Gauge,
  ShieldAlert,
  Users,
} from "lucide-react"

const problems = [
  {
    icon: AlertTriangle,
    title: "Zu viele Alerts",
    description: "Security Teams ertrinken in Alarmen ohne klare Priorisierung",
  },
  {
    icon: Clock,
    title: "Keine 24/7 Überwachung",
    description: "Angriffe passieren ausserhalb der Bürozeiten",
  },
  {
    icon: Users,
    title: "Fachkräftemangel",
    description: "Qualifizierte Security-Analysten sind schwer zu finden",
  },
  {
    icon: Gauge,
    title: "Langsame Eskalation",
    description: "Kritische Incidents werden zu spät erkannt",
  },
  {
    icon: ShieldAlert,
    title: "Management-Risiko",
    description: "Fehlende Nachweisbarkeit bei Compliance-Prüfungen",
  },
]

export function ProblemSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Das Problem
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Viele Unternehmen besitzen Security Tools, aber keine Security
            Operations.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Die grösste Lücke in der IT-Sicherheit ist nicht die Technologie,
            sondern die fehlenden Prozesse und das fehlende Personal.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-destructive/5 blur-2xl transition-all duration-300 group-hover:bg-destructive/10" />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <problem.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
