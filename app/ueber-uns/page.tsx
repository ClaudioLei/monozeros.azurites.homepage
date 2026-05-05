import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Shield, Target, Users, Award, 
  ArrowRight, MapPin, Globe
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Über uns | Monozeros",
  description: "Schweizer Cybersecurity mit operativer Realität. Professionelle Security Operations zugänglich machen – ohne Konzernpreise.",
}

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Sicherheit ist keine Nebensache, sondern der Kern unseres Handelns."
  },
  {
    icon: Target,
    title: "Operative Exzellenz",
    description: "Wir liefern nicht nur Technologie, sondern echte Security Operations."
  },
  {
    icon: Users,
    title: "Partnerschaftlich",
    description: "Wir verstehen uns als Erweiterung Ihres Teams, nicht als externer Dienstleister."
  },
  {
    icon: Award,
    title: "Schweizer Qualität",
    description: "Lokale Präsenz, deutschsprachige Betreuung und strukturierte Datenschutz- und Sicherheitsprozesse."
  },
]

const credentials = [
  {
    title: "Enterprise IT Erfahrung",
    description: "Unser Team bringt jahrelange Erfahrung aus grossen IT-Organisationen mit."
  },
  {
    title: "Security Operations Verständnis",
    description: "Wir haben selbst SOCs aufgebaut und betrieben – wir kennen die Herausforderungen."
  },
  {
    title: "Governance Fokus",
    description: "Compliance und Governance sind integraler Bestandteil unserer Services."
  },
  {
    title: "Schweizer Marktkenntnis",
    description: "Wir verstehen die spezifischen Anforderungen des Schweizer Marktes."
  },
]

export default function AboutPage() {
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
              Über uns
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Schweizer Cybersecurity mit operativer Realität
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Monozeros wurde gegründet, um professionelle Security Operations zugänglich zu machen – ohne Konzernpreise und ohne unnötige Komplexität.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Unsere Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Zu viele Unternehmen in der Schweiz verfügen über Security-Tools, aber nicht über die Ressourcen, diese effektiv zu nutzen. Alerts bleiben unbearbeitet, Bedrohungen werden übersehen, und das Management trägt ein Risiko, das es nicht einschätzen kann.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Monozeros schliesst diese Lücke. Wir bringen Enterprise-Level Security Operations zu Mid-Market Unternehmen – mit lokaler Präsenz, verständlichen Prozessen und transparenten Kosten.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border border-border/60 bg-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Credibility */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Erfahrung, die zählt
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Unser Team vereint tiefes technisches Wissen mit operativer Erfahrung
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((credential) => (
              <div
                key={credential.title}
                className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{credential.title}</h3>
                  <p className="mt-1 text-muted-foreground">{credential.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl border border-border/60 bg-card p-8 lg:p-12">
               <div className="flex items-center gap-2 text-primary mb-6">
                 <MapPin className="h-5 w-5" />
                 <span className="font-medium">Standort Schweiz</span>
               </div>
               <h3 className="text-2xl font-bold text-foreground">
                 Lokal verankert, international vernetzt
               </h3>
               <p className="mt-4 text-muted-foreground leading-relaxed">
                 Unser Hauptsitz ist in Gossau SG. Von hier aus betreuen wir Unternehmen in der gesamten Schweiz. Der Standardbetrieb erfolgt über die Cynclair/AZURITES-Infrastruktur, ein dediziertes Schweizer Hosting-Modell ist auf Anfrage möglich. Unsere Ansprechpartner betreuen Kunden deutschsprachig.
               </p>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Azure Switzerland</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Deutschsprachig</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Bereit für ein Gespräch?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Wir freuen uns darauf, mehr über Ihre Security-Herausforderungen zu erfahren und zu zeigen, wie Monozeros helfen kann.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    Kontakt aufnehmen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                    Assessment starten
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
