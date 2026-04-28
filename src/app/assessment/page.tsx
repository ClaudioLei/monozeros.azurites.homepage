"use client";

import { useState } from "react";
import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import { ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react";

const employeeOptions = ["1–50", "51–200", "201–500", "500+"];
const endpointOptions = ["1–100", "101–500", "501–1000", "1000+"];
const serverOptions = ["1–20", "21–100", "101–500", "500+"];
const cloudOptions = ["Keine", "Teilweise", "Überwiegend", "Vollständig"];
const securityToolOptions = [
  "Microsoft Defender",
  "CrowdStrike",
  "SentinelOne",
  "Fortinet",
  "Palo Alto",
  "Keine",
];
const needOptions = ["Ja", "Nein", "Unsicher"];
const branchOptions = ["Healthcare", "Finance", "Industrie", "Public", "IT Services", "Sonstige"];
const complianceOptions = ["revDSG", "ISO 27001", "NIS2", "Finma", "Keine", "Sonstige"];

export default function AssessmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    firma: "",
    email: "",
    mitarbeitende: "",
    endpoints: "",
    server: "",
    cloud: "",
    security_tools: [] as string[],
    need_24_7: "",
    branche: "",
    compliance: [] as string[],
  });

  const toggleArrayField = (field: "security_tools" | "compliance", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-anthracite-dark min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-electric-blue-light mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Assessment eingereicht
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Vielen Dank. Unser Team wird Ihre Angaben prüfen und sich innerhalb von 2 Werktagen mit einem Reifegrad-Profil und Empfehlungen bei Ihnen melden.
          </p>
          <Button href="/">Zurück zur Startseite</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Assessment
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            MDR Readiness Assessment
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            Beantworten Sie einige Fragen zu Ihrer IT-Infrastruktur. Sie erhalten eine Einschätzung Ihres Security-Reifegrads und ein empfohlenes Setup.
          </p>
        </div>
      </section>

      {/* Form */}
      <Section>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-anthracite-dark mb-5">Kontaktdaten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Name" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                  required
                />
              </FormField>
              <FormField label="Firma" required>
                <input
                  type="text"
                  value={form.firma}
                  onChange={(e) => setForm({ ...form, firma: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                  required
                />
              </FormField>
              <FormField label="E-Mail" required className="sm:col-span-2">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                  required
                />
              </FormField>
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className="text-lg font-semibold text-anthracite-dark mb-5">IT-Infrastruktur</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField
                label="Mitarbeitende"
                value={form.mitarbeitende}
                onChange={(v) => setForm({ ...form, mitarbeitende: v })}
                options={employeeOptions}
              />
              <SelectField
                label="Endpoints"
                value={form.endpoints}
                onChange={(v) => setForm({ ...form, endpoints: v })}
                options={endpointOptions}
              />
              <SelectField
                label="Server"
                value={form.server}
                onChange={(v) => setForm({ ...form, server: v })}
                options={serverOptions}
              />
              <SelectField
                label="Cloud-Nutzung"
                value={form.cloud}
                onChange={(v) => setForm({ ...form, cloud: v })}
                options={cloudOptions}
              />
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-semibold text-anthracite-dark mb-5">Security</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Vorhandene Security-Tools</p>
                <div className="flex flex-wrap gap-2">
                  {securityToolOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleArrayField("security_tools", opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        form.security_tools.includes(opt)
                          ? "bg-electric-blue text-white border-electric-blue"
                          : "bg-white text-text-secondary border-border hover:border-electric-blue/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <SelectField
                label="24/7 Bedarf"
                value={form.need_24_7}
                onChange={(v) => setForm({ ...form, need_24_7: v })}
                options={needOptions}
              />

              <SelectField
                label="Branche"
                value={form.branche}
                onChange={(v) => setForm({ ...form, branche: v })}
                options={branchOptions}
              />

              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Compliance-Anforderungen</p>
                <div className="flex flex-wrap gap-2">
                  {complianceOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleArrayField("compliance", opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        form.compliance.includes(opt)
                          ? "bg-electric-blue text-white border-electric-blue"
                          : "bg-white text-text-secondary border-border hover:border-electric-blue/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Wird gesendet..." : "Assessment einreichen"}{" "}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Section>
    </>
  );
}

function FormField({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-text-secondary mb-1.5 block">
        {label} {required && <span className="text-error">*</span>}
      </span>
      {children}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text-secondary mb-1.5 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition appearance-none"
      >
        <option value="">Bitte wählen</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
