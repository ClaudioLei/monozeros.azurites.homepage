"use client";

import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import {
  ArrowRight,
  Handshake,
  Tag,
  Plug,
  TrendingUp,
  Users,
  Shield,
  DollarSign,
  Link2,
  Award,
} from "lucide-react";

const benefits = [
  { icon: Handshake, title: "Co-Selling", desc: "Gemeinsame Kundenbetreuung mit klaren Rollen. Sie bleiben der primäre Ansprechpartner, wir liefern die Security-Expertise." },
  { icon: Tag, title: "White Label MDR", desc: "Security Services unter Ihrem Brand. Ihre Kunden erhalten professionelles MDR – von Ihnen vermarktet und von uns betrieben." },
  { icon: Plug, title: "Technische Integration", desc: "Nahtlose Integration in Ihre bestehende IT-Infrastruktur und Management-Tools. Weniger Aufwand, mehr Effizienz." },
  { icon: DollarSign, title: "Neue Revenue Streams", desc: "Recurring Revenue durch Security Services. Erweitern Sie Ihr Portfolio ohne eigene SOC-Investitionen." },
  { icon: Users, title: "Höhere Kundenbindung", desc: "Security als Bindungsfaktor. Kunden, die MDR über Sie beziehen, wechseln seltener den Provider." },
  { icon: Award, title: "Sofortige Expertise", desc: "Zugang zu einem Team von Security-Experten ohne eigene Rekrutierung und Schulung." },
];

const partnerTypes = [
  { icon: Link2, title: "MSPs", desc: "Managed Service Provider, die ihr Portfolio um Security erweitern möchten." },
  { icon: Shield, title: "IT Service Provider", desc: "IT-Dienstleister, die ihren Kunden professionelle Security anbieten wollen." },
  { icon: TrendingUp, title: "Cloud Provider", desc: "Cloud-Infrastruktur-Anbieter, die Security als Mehrwert integrieren." },
  { icon: Award, title: "Microsoft Partner", desc: "Microsoft-Partner, die Defender-Lösungen mit Managed Services ergänzen." },
];

export default function MSPPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Für Partner
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            White Label SOC für ausgewählte Schweizer IT Partner
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Erweitern Sie Ihr Service-Portfolio um Managed Detection & Response – ohne eigene SOC-Investitionen. Monozeros betreibt das SOC, Sie bleiben der Ansprechpartner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/kontakt" size="lg">
              Partnergespräch buchen
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section>
        <SectionHeader
          label="Partnerschaft"
          title="Ihre Vorteile als Monozeros Partner"
          description="Wir ermöglichen Ihnen den Einstieg in Managed Security Services – professionell, skalierbar und unter Ihrem Brand."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <FeatureCard key={b.title} icon={b.icon} title={b.title} description={b.desc} index={i} />
          ))}
        </div>
      </Section>

      {/* Partner Types */}
      <Section className="bg-surface">
        <SectionHeader
          label="Für wen"
          title="Geeignet für folgende Partner"
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partnerTypes.map((p, i) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.desc} index={i} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Werden Sie Monozeros Partner
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Vereinbaren Sie ein unverbindliches Partnergespräch und erfahren Sie, wie Sie MDR in Ihr Portfolio integrieren.
          </p>
          <Button href="/kontakt" size="lg">
            Partnergespräch buchen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
