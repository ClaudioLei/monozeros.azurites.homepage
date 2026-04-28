"use client";

import { useState } from "react";
import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import { ArrowRight, CircleCheck as CheckCircle2, MapPin, Mail, Phone } from "lucide-react";

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    firma: "",
    rolle: "",
    email: "",
    telefon: "",
    nachricht: "",
    honeypot: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-anthracite-dark min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-electric-blue-light mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Nachricht gesendet
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns innerhalb eines Werktags bei Ihnen.
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
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Kontakt
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Sprechen Sie mit uns
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            Ob MDR, Compliance oder Partnerschaft – wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Rolle">
                  <input
                    type="text"
                    value={form.rolle}
                    onChange={(e) => setForm({ ...form, rolle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                  />
                </FormField>
                <FormField label="E-Mail" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                    required
                  />
                </FormField>
              </div>

              <FormField label="Telefon">
                <input
                  type="tel"
                  value={form.telefon}
                  onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition"
                />
              </FormField>

              <FormField label="Nachricht" required>
                <textarea
                  rows={5}
                  value={form.nachricht}
                  onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition resize-none"
                  required
                />
              </FormField>

              {/* Honeypot */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg">
                  Nachricht senden{" "}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-anthracite-dark mb-4">
                  Monozeros GmbH
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-electric-blue mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">Schweiz</p>
                      <p className="text-xs text-text-tertiary mt-1">Swiss Hosted &middot; Azure Switzerland</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-electric-blue mt-0.5 shrink-0" />
                    <p className="text-sm text-text-secondary">info@monozeros.com</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-electric-blue mt-0.5 shrink-0" />
                    <p className="text-sm text-text-secondary">+41 44 000 00 00</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface">
                <h4 className="text-sm font-semibold text-anthracite-dark mb-2">
                  Schnelle Antwort
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Wir antworten in der Regel innerhalb eines Werktags auf Ihre Anfrage.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface">
                <h4 className="text-sm font-semibold text-anthracite-dark mb-2">
                  Datenschutz
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Ihre Daten werden vertraulich behandelt und ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text-secondary mb-1.5 block">
        {label} {required && <span className="text-error">*</span>}
      </span>
      {children}
    </label>
  );
}
