"use client";

import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import { Eye, ShieldAlert, Search, ArrowUpRight, PhoneCall, FileText, ArrowRight, Clock, Target, Users, ChartBar as BarChart3, ShieldCheck, Headphones } from "lucide-react";

const services = [
  { icon: Eye, title: "24/7 Monitoring", desc: "Kontinuierliche Überwachung Ihrer gesamten IT-Infrastruktur durch geschulte Security-Analysten – rund um die Uhr, 365 Tage im Jahr." },
  { icon: Target, title: "Threat Hunting", desc: "Proaktive Suche nach versteckten Bedrohungen in Ihren Systemen. Unsere Analysten identifizieren Kompromittierungen, bevor sie zum Schaden führen." },
  { icon: ShieldAlert, title: "Incident Handling", desc: "Strukturierte Reaktion auf Sicherheitsvorfälle mit definierten Eskalationspfaden, Containment-Massnahmen und Recovery-Unterstützung." },
  { icon: Search, title: "Use Case Tuning", desc: "Kontinuierliche Optimierung Ihrer Detection-Regeln und Use Cases für weniger Rauschen und mehr relevante Alerts." },
  { icon: FileText, title: "Executive Reporting", desc: "Regelmässige Management-Berichte mit Kennzahlen, Trendanalysen und Empfehlungen für strategische Security-Entscheidungen." },
  { icon: Headphones, title: "Security Ansprechpartner", desc: "Ein dedizierter Security-Ansprechpartner, der Ihre IT-Landschaft, Prozesse und Anforderungen kennt." },
];

const benefits = [
  { icon: Clock, title: "Sofort aktiv", desc: "Keine langen Aufbauzeiten. Innerhalb von Wochen ist Ihr Monitoring betriebsbereit." },
  { icon: Users, title: "Experten-Zugang", desc: "Zugang zu einem Team aus geschulten Security-Analysten ohne eigene Rekrutierung." },
  { icon: BarChart3, title: "Kalkulierbar", desc: "Transparente, monatliche Kosten statt unplanmässiger Investitionen." },
  { icon: ShieldCheck, title: "Compliance-ready", desc: "Prozesse und Dokumentation, die regulatorische Anforderungen unterstützen." },
];

export default function MDRPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Managed Detection & Response
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Ihr externes Security Operations Center
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Monozeros betreibt Ihr Security Operations Center – mit 24/7 Monitoring, Threat Hunting und professionellem Incident Handling. Ideal für Unternehmen ohne eigenes SOC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/assessment" size="lg">
              MDR Assessment starten
            </Button>
            <Button href="/kontakt" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-anthracite-dark">
              Beratungsgespräch buchen
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeader
          label="Unsere Services"
          title="Vollumfängliche Security Operations"
          description="Wir übernehmen den gesamten Betrieb Ihres Security Operations Centers – von der Überwachung bis zur Response."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <FeatureCard key={s.title} icon={s.icon} title={s.title} description={s.desc} index={i} />
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-surface">
        <SectionHeader
          label="Vorteile"
          title="Warum Managed MDR?"
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <FeatureCard key={b.title} icon={b.icon} title={b.title} description={b.desc} index={i} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Bereit für professionelle Security Operations?
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Starten Sie mit einem MDR Readiness Assessment und erfahren Sie, wie Monozeros Ihr Unternehmen schützen kann.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/assessment" size="lg">
              Assessment starten <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/kontakt" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-anthracite-dark">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
