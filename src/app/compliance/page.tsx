"use client";

import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import { ArrowRight, Server, ShieldCheck, Lock, Map, CircleAlert as AlertCircle, FileText, CircleCheck as CheckCircle2 } from "lucide-react";

const trustItems = [
  {
    icon: Server,
    title: "Datenhaltung",
    desc: "Schweiz bevorzugt. Kontrollierte Infrastrukturmodelle mit nachvollziehbarer Datenverarbeitung.",
    points: ["Swiss-first Hosting", "Kontrollierte Infrastruktur", "Nachvollziehbare Datenflüsse"],
  },
  {
    icon: ShieldCheck,
    title: "Security Governance",
    desc: "Rollen, Berechtigungen und Eskalationsprozesse, die Audit-anforderungen erfüllen.",
    points: ["Rollen & Berechtigungen", "Eskalationsprozesse", "Auditierbarkeit"],
  },
  {
    icon: Lock,
    title: "Datenschutz",
    desc: "Transparente Prozesse und Auftragsbearbeitung orientiert an Schweizer Standards.",
    points: ["Transparente Prozesse", "Auftragsbearbeitung orientiert", "DSG-konform"],
  },
  {
    icon: Map,
    title: "Security Roadmap",
    desc: "Dokumentierte Kontrollen und Prozessreife für Ihre regulatorische Reise.",
    points: ["ISO 27001 Readiness", "Dokumentierte Kontrollen", "Prozessreife"],
  },
  {
    icon: AlertCircle,
    title: "Incident Readiness",
    desc: "Definierte Eskalationsketten, Management Reports und vollständige Nachvollziehbarkeit.",
    points: ["Eskalationsketten", "Management Reports", "Nachvollziehbarkeit"],
  },
];

const complianceItems = [
  "revDSG orientierte Prozesse",
  "Security Reporting für Audit und Management",
  "Incident Dokumentation und Nachvollziehbarkeit",
  "Unterstützung regulierter Organisationen",
];

export default function CompliancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Compliance & Trust
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Cybersecurity mit Governance-Fokus
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Monozeros verbindet Security Operations mit Compliance-Anforderungen. Unsere Prozesse unterstützen regulierte Organisationen bei der Erfüllung ihrer Pflichten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/kontakt" size="lg">
              Beratungsgespräch buchen
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Center */}
      <Section>
        <SectionHeader
          label="Trust Center"
          title="Transparenz und Kontrolle"
          description="Unsere Trust-Prinzipien bilden das Fundament für Vertrauen in unsere Security Services."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <TrustCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </Section>

      {/* Compliance */}
      <Section className="bg-surface">
        <SectionHeader
          label="Compliance Unterstützung"
          title="Regulatorisch kompetent"
          description="Wir unterstützen Sie bei der Erfüllung regulatorischer Anforderungen – ohne Rechtsberatung zu ersetzen."
        />
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {complianceItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-electric-blue mt-0.5 shrink-0" />
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-5 rounded-xl border border-border bg-white">
            <p className="text-sm text-text-tertiary">
              <strong className="text-text-secondary">Hinweis:</strong> Monozeros bietet keine Rechtsberatung an. Unsere Compliance-Unterstützung bezieht sich auf Security-Prozesse, Dokumentation und Reporting im Kontext regulatorischer Anforderungen.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Compliance als Teil Ihrer Security Operations
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Erfahren Sie, wie Monozeros Ihre Compliance-Anforderungen in Security-Prozesse integriert.
          </p>
          <Button href="/kontakt" size="lg">
            Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}

function TrustCard({
  icon: Icon,
  title,
  desc,
  points,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  points: string[];
  index: number;
}) {
  return (
    <div
      className="group p-8 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-electric-blue/30 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-electric-blue-glow text-electric-blue flex items-center justify-center mb-5 group-hover:bg-electric-blue/20 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-anthracite-dark mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">{desc}</p>
      <ul className="space-y-2">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-text-tertiary">
            <span className="w-1 h-1 rounded-full bg-electric-blue" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
