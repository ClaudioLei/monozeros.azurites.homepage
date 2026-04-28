"use client";

import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import IntegrationGrid from "@/components/IntegrationGrid";
import {
  ArrowRight,
  Cable,
  Terminal,
  MonitorSmartphone,
  Database,
  Layers,
  RefreshCw,
} from "lucide-react";

const integrationTypes = [
  { icon: Cable, title: "API", desc: "Direkte API-Integration für moderne Cloud-Services und SaaS-Plattformen." },
  { icon: Terminal, title: "Syslog", desc: "Klassische Syslog-Anbindung für Netzwerkgeräte und Server-Infrastruktur." },
  { icon: MonitorSmartphone, title: "Agent", desc: "Leichtgewichtige Agenten für Endpoints und Server mit umfassender Telemetrie." },
  { icon: Database, title: "Log Collector", desc: "Zentralisierte Log-Erfassung für heterogene IT-Umgebungen." },
];

const principles = [
  { icon: Layers, title: "Bestehende Investments nutzen", desc: "OpenXDR integriert Ihre vorhandenen Security-Tools statt sie zu ersetzen. Keine Rip-and-Replace Migration." },
  { icon: RefreshCw, title: "Vendor-unabhängig", desc: "Offene Architektur ohne Lock-in. Sie behalten die Kontrolle über Ihre Tool-Auswahl." },
];

export default function TechnologiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Technologie
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            OpenXDR über bestehende Security Investments
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Keine Rip-and-Replace Migration. Monozeros integriert Ihre vorhandenen Security-Tools in eine zentrale Detection & Response Plattform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/assessment" size="lg">
              Assessment starten
            </Button>
            <Button href="/kontakt" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-anthracite-dark">
              Beratungsgespräch buchen
            </Button>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <Section>
        <SectionHeader
          label="Integrationen"
          title="Verbunden mit Ihren Security-Tools"
          description="OpenXDR integriert mit den führenden Security-Lösungen – und mit Ihrer bestehenden Infrastruktur."
        />
        <IntegrationGrid />
      </Section>

      {/* Integration Types */}
      <Section className="bg-surface">
        <SectionHeader
          label="Integrationsarten"
          title="Flexibel angebunden"
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {integrationTypes.map((t, i) => (
            <div
              key={t.title}
              className="p-7 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-electric-blue/30 transition-all duration-300 hover:-translate-y-1"
            >
              <t.icon className="w-8 h-8 text-electric-blue mb-4" />
              <h3 className="text-base font-semibold text-anthracite-dark mb-2">{t.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Principles */}
      <Section>
        <SectionHeader
          label="Architektur"
          title="Offen. Unabhängig. Pragmatisch."
          description="OpenXDR steht für eine offene, vendor-unabhängige Architektur, die Ihre bestehenden Investments nutzt und erweitert."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {principles.map((p) => (
            <div key={p.title} className="p-8 rounded-2xl border border-border bg-white">
              <p.icon className="w-10 h-10 text-electric-blue mb-5" />
              <h3 className="text-lg font-semibold text-anthracite-dark mb-2">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ihre Tools. Unsere Plattform.
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Erfahren Sie, wie OpenXDR Ihre bestehende Security-Infrastruktur erweitert.
          </p>
          <Button href="/assessment" size="lg">
            Assessment starten <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
