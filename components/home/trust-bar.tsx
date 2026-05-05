import {
  BadgeCheck,
  Building2,
  Cloud,
  Eye,
  MessageSquare,
  Shield,
} from "lucide-react"

const trustItems = [
  {
    icon: Shield,
    label: "Schweizer Ansprechpartner",
    description: "Lokales Onboarding und Support",
  },
    {
      icon: BadgeCheck,
      label: "Sicherheitsprozesse nach etablierten Standards",
      description: "Ausgerichtet an ISO/IEC 27001, NIST und bewährten MDR-Betriebsprozessen",
    },
  {
    icon: Cloud,
    label: "Flexible Hostingmodelle",
    description: "Standard oder Schweiz",
  },
  {
    icon: Eye,
    label: "Security Monitoring",
    description: "Kontinuierliche Transparenz",
  },
  {
    icon: MessageSquare,
    label: "Deutschsprachig",
    description: "Beratung und Eskalation",
  },
  {
    icon: Building2,
    label: "Enterprise-ready",
    description: "Dokumentierte Prozesse",
  },
]

export function TrustBar() {
  return (
    <section className="border-y border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
