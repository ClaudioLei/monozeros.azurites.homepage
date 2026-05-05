"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TurnstileWidget } from "@/components/turnstile-widget"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@monozeros.ch",
    href: "mailto:info@monozeros.ch",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Hirschenstrasse 18\n9200 Gossau",
    href: null,
  },
]

const roleOptions = [
  "CEO / Geschäftsleitung",
  "CIO / IT-Leitung",
  "CISO / Security-Leitung",
  "CTO",
  "IT-Administrator",
  "Security Engineer / Analyst",
  "System Engineer",
  "Einkauf / Beschaffung",
  "Projektleitung",
  "Sonstige Rolle",
]

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [turnstileToken, setTurnstileToken] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  })
  const [honeypot, setHoneypot] = useState("")
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = "Name ist erforderlich"
    }
    if (!formData.company) {
      newErrors.company = "Firma ist erforderlich"
    }
    if (!formData.role) {
      newErrors.role = "Rolle ist erforderlich"
    }
    if (!formData.email) {
      newErrors.email = "Email ist erforderlich"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse"
    }
    if (!formData.message) {
      newErrors.message = "Nachricht ist erforderlich"
    }
    if (!turnstileToken) {
      newErrors.turnstile = "Bitte bestätigen Sie die Sicherheitsprüfung"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (honeypot) {
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        const apiError = result.error
        if (apiError?.code === "TURNSTILE_FAILED") {
          setTurnstileToken("")
          setErrors({
            turnstile:
              "Die Sicherheitsprüfung ist fehlgeschlagen oder abgelaufen. Bitte bestätigen Sie sie erneut.",
            submit:
              apiError.message || "Sicherheitsprüfung fehlgeschlagen.",
          })
        } else {
          setErrors({
            submit:
              apiError?.message ||
              result.error ||
              "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.",
          })
        }
      }
    } catch {
      setErrors({
        submit: "Verbindungsfehler. Bitte versuchen Sie es erneut.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative flex min-h-[80vh] items-center pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Nachricht gesendet
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns innerhalb
              von 24 Stunden bei Ihnen melden.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Kontakt
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
              Lassen Sie uns sprechen
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Haben Sie Fragen zu unseren Services oder möchten Sie ein
              unverbindliches Beratungsgespräch? Wir freuen uns auf Ihre
              Nachricht.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Kontaktinformationen
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium whitespace-pre-line text-foreground">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-xl border border-border/60 bg-card p-6">
                <h3 className="mb-3 font-semibold text-foreground">
                  Wir melden uns schnellstmöglich
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wir antworten in der Regel innerhalb von 24 Stunden. Für
                  dringende Security-Angelegenheiten erreichen Sie uns auch
                  telefonisch.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10"
              >
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Nachricht senden
                </h2>

                <div className="hidden">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="name"
                      className="mb-2 block text-foreground"
                    >
                      Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="Max Muster"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={
                        errors.name
                          ? "border-destructive"
                          : "border-border bg-input"
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="company"
                      className="mb-2 block text-foreground"
                    >
                      Firma *
                    </Label>
                    <Input
                      id="company"
                      required
                      placeholder="Muster AG"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className={
                        errors.company
                          ? "border-destructive"
                          : "border-border bg-input"
                      }
                    />
                    {errors.company && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block text-foreground">
                      Rolle *
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger
                        aria-invalid={!!errors.role}
                        className={
                          errors.role
                            ? "w-full border-destructive"
                            : "w-full border-border bg-input"
                        }
                      >
                        <SelectValue placeholder="Bitte Rolle auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.role}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 block text-foreground"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="max.muster@firma.ch"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={
                        errors.email
                          ? "border-destructive"
                          : "border-border bg-input"
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="phone"
                      className="mb-2 block text-foreground"
                    >
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+41 44 123 45 67"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="border-border bg-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="message"
                      className="mb-2 block text-foreground"
                    >
                      Nachricht *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Wie können wir Ihnen helfen?"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={
                        errors.message
                          ? "border-destructive"
                          : "border-border bg-input resize-none"
                      }
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {errors.submit}
                  </div>
                )}

                <p className="mt-6 text-sm text-muted-foreground">
                  Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur
                  Bearbeitung Ihrer Anfrage verwenden dürfen.
                </p>

                <TurnstileWidget
                  action="contact"
                  siteKey={turnstileSiteKey}
                  error={errors.turnstile}
                  onToken={(token) => {
                    setTurnstileToken(token)
                    setErrors(({ turnstile: _turnstile, ...rest }) => rest)
                  }}
                  onReset={(message) => {
                    setTurnstileToken("")
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      turnstile: message,
                    }))
                  }}
                />

                <div className="mt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>Wird gesendet...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
