"use client";

import { useInView } from "@/lib/motion";
import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import TrustBar from "@/components/TrustBar";
import FeatureCard from "@/components/FeatureCard";
import { TriangleAlert as AlertTriangle, Users, Clock, TrendingUp, Zap, ArrowRight, CircleCheck as CheckCircle2, Eye, Search, PhoneCall, FileText, ChartBar as BarChart3, ShieldAlert, UserCheck, ArrowUpRight } from "lucide-react";

const problems = [
  { icon: AlertTriangle, title: "Zu viele Alerts", desc: "Security-Tools generieren Tausende von Warnungen – ohne Expertise nicht zu bewältigen." },
  { icon: Clock, title: "Keine 24/7 Überwachung", desc: "Angriffe passieren nachts und am Wochenende. Ohne durchgehendes Monitoring bleiben Bedrohungen unentdeckt." },
  { icon: Users, title: "Fachkräftemangel", desc: "Security-Experten sind rar und teuer. Der Aufbau eines internen SOC dauert Monate." },
  { icon: Zap, title: "Langsame Eskalation", desc: "Ohne klare Prozesse und Verantwortlichkeiten dauert die Reaktion auf Vorfälle zu lange." },
  { icon: TrendingUp, title: "Management-Risiko", desc: "Unentdeckte Vorfälle werden zum geschäftlichen und regulatorischen Risiko." },
];

const solutions = [
  { icon: Eye, title: "Monitoring", desc: "Kontinuierliche Überwachung Ihrer IT-Infrastruktur rund um die Uhr." },
  { icon: ShieldAlert, title: "Alert Triage", desc: "Professionelle Bewertung und Priorisierung aller Security-Alerts." },
  { icon: Search, title: "Investigation", desc: "Tiefgehende Analyse und Untersuchung verdächtiger Aktivitäten." },
  { icon: ArrowUpRight, title: "Eskalation", desc: "Strukturierte Eskalation an die richtigen Stellen mit klaren SLAs." },
  { icon: PhoneCall, title: "Response Koordination", desc: "Koordinierte Massnahmen zur Eindämmung und Behebung von Vorfällen." },
  { icon: FileText, title: "Reporting", desc: "Regelmässige Berichte für Management, Compliance und Audit." },
];

const internalCosts = [
  "3–5 Mitarbeitende für Schichtbetrieb",
  "Rekrutierungskosten CHF 80–120k pro Stelle",
  "Fortlaufende Weiterbildung",
  "Tool-Lizenzen und Infrastruktur",
  "Aufbauzeit 6–12 Monate",
];

const monozerosBenefits = [
  "Start innerhalb von Wochen",
  "Kalkulierbare monatliche Kosten",
  "Sofortige Entlastung des Teams",
  "Zugang zu Security-Experten",
  "Keine Recruiting-Verantwortung",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-electric-blue/3 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <HeroContent />
        </div>
      </section>

      <TrustBar />

      {/* Problem */}
      <Section>
        <SectionHeader
          label="Die Realität"
          title="Viele Unternehmen besitzen Security Tools – aber keine Security Operations"
          description="Tools allein schützen nicht. Ohne professionelle Überwachung, Analyse und Reaktion bleiben kritische Bedrohungen unentdeckt."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.desc} index={i} />
          ))}
        </div>
      </Section>

      {/* Solution */}
      <Section className="bg-surface">
        <SectionHeader
          label="Die Lösung"
          title="Monozeros übernimmt Ihre Security Operations"
          description="Von der Überwachung bis zur Response – wir betreiben Ihr Security Operations Center, damit Sie sich auf Ihr Kerngeschäft konzentrieren können."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <FeatureCard key={s.title} icon={s.icon} title={s.title} description={s.desc} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/mdr" size="lg">
            MDR Services ansehen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>

      {/* ROI */}
      <Section>
        <SectionHeader
          label="Wirtschaftlichkeit"
          title="Was kostet internes SOC vs. Managed MDR?"
          center
        />
        <ROIGrid />
        <div className="mt-12 text-center">
          <Button href="/assessment" size="lg">
            Assessment starten <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>

      {/* Social Proof */}
      <Section dark>
        <SectionHeader
          label="Vertrauen"
          title="Vertrauenswürdig für anspruchsvolle Organisationen"
          description="Monozeros betreut Unternehmen, die professionelle Security Operations benötigen – ohne Konzernkomplexität."
          center
          light
        />
        <SocialProofGrid />
        <div className="mt-12 text-center">
          <Button href="/kontakt" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-anthracite-dark">
            Beratungsgespräch buchen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}

function HeroContent() {
  const { ref, isInView } = useInView(0.1);

  return (
    <div ref={ref} className="max-w-3xl">
      <div
        className={`transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
          Managed Detection & Response
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          24/7 Cybersecurity für Schweizer Unternehmen – ohne eigenes SOC
        </h1>
        <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
          Monozeros verbindet moderne OpenXDR Technologie mit Schweizer
          Expertenservice, schneller Incident Response und professionellen
          Security Operations.
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
    </div>
  );
}

function ROIGrid() {
  const { ref, isInView } = useInView(0.1);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div
        className={`p-8 rounded-2xl border border-border bg-surface transition-all duration-700 ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-error" />
          </div>
          <h3 className="text-lg font-semibold text-anthracite-dark">Internes SOC</h3>
        </div>
        <ul className="space-y-3">
          {internalCosts.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-error/40 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`p-8 rounded-2xl border-2 border-electric-blue/30 bg-electric-blue-glow transition-all duration-700 delay-150 ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-electric-blue/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-electric-blue" />
          </div>
          <h3 className="text-lg font-semibold text-anthracite-dark">Monozeros MDR</h3>
        </div>
        <ul className="space-y-3">
          {monozerosBenefits.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-primary">
              <CheckCircle2 className="w-4 h-4 text-electric-blue mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SocialProofGrid() {
  const { ref, isInView } = useInView(0.1);

  const items = [
    { icon: BarChart3, title: "Regulierte Organisationen", desc: "Compliance-nahe Security Prozesse für Finanzinstitute, Healthcare und KRITIS." },
    { icon: UserCheck, title: "Komplexe IT-Landschaften", desc: "Multi-Vendor-Umgebungen mit professionellem Monitoring und Response." },
    { icon: TrendingUp, title: "Wachsende Unternehmen", desc: "Security Operations, die mit Ihrem Unternehmen mitwachsen." },
    { icon: Users, title: "MSP Partner", desc: "White Label SOC für IT Service Provider und Managed Service Provider." },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`p-7 rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <item.icon className="w-8 h-8 text-electric-blue-light mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
