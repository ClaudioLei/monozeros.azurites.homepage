import { Shield, Cloud, Eye, MessageSquare, Building2 } from "lucide-react"

const trustItems = [
  {
    icon: Shield,
    label: "Schweizer Ansprechpartner",
    description: "Lokales Onboarding & Support"
  },
  {
    icon: Cloud,
    label: "Flexible Hostingmodelle",
    description: "Standard oder Schweiz"
  },
  {
    icon: Eye,
    label: "24/7 Monitoring",
    description: "Kontinuierliche Überwachung"
  },
  {
    icon: MessageSquare,
    label: "Deutschsprachig",
    description: "Beratung & Eskalation"
  },
  {
    icon: Building2,
    label: "Enterprise-ready",
    description: "Dokumentierte Prozesse"
  },
]

export function TrustBar() {
  return (
    <section className="border-y border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
