import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import { ArrowRight, Building2, Shield, Target, MapPin } from "lucide-react";

const values = [
  {
    icon: Building2,
    title: "Enterprise IT Erfahrung",
    desc: "Fundiertes Verständnis für komplexe IT-Landschaften und Unternehmensprozesse.",
  },
  {
    icon: Shield,
    title: "Security Operations Verständnis",
    desc: "Praktische Erfahrung im Betrieb von Security Operations Centers und Incident Response.",
  },
  {
    icon: Target,
    title: "Governance Fokus",
    desc: "Security als Teil der Unternehmenssteuerung – nicht als reines Technik-Thema.",
  },
  {
    icon: MapPin,
    title: "Schweizer Marktkenntnis",
    desc: "Verständnis für regulatorische Anforderungen, Marktdynamik und Kundenerwartungen in der Schweiz.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Über uns
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Schweizer Cybersecurity mit operativer Realität
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            Monozeros wurde gegründet, um professionelle Security Operations zugänglich zu machen – ohne Konzernpreise und ohne unnötige Komplexität.
          </p>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <SectionHeader
          label="Unsere Mission"
          title="Security Operations für Unternehmen, die es verdienen"
          description="Wir glauben, dass professionelle Cybersecurity nicht nur Grosskonzernen vorbehalten sein sollte. Monozeros macht Security Operations für Mid-Market-Unternehmen und regulierte Organisationen zugänglich – mit Schweizer Präzision und pragmatischem Ansatz."
        />
      </Section>

      {/* Leadership */}
      <Section className="bg-surface">
        <SectionHeader
          label="Leadership"
          title="Erfahrung, die zählt"
          description="Unser Team bringt tiefgehende Erfahrung aus Enterprise IT, Security Operations und dem Schweizer Markt mit."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-7 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-electric-blue/30 transition-all duration-300"
            >
              <v.icon className="w-8 h-8 text-electric-blue mb-4" />
              <h3 className="text-base font-semibold text-anthracite-dark mb-2">{v.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Lernen Sie uns kennen
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Vereinbaren Sie ein unverbindliches Gespräch und erfahren Sie, wie Monozeros Ihr Unternehmen schützen kann.
          </p>
          <Button href="/kontakt" size="lg">
            Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
