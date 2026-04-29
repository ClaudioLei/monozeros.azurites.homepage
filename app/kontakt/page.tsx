"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Mail, Phone, MapPin, Clock, 
  ArrowRight, Check, Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@monozeros.ch",
    href: "mailto:info@monozeros.ch"
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+41 44 300 12 34",
    href: "tel:+41443001234"
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Zürich, Schweiz",
    href: null
  },
  {
    icon: Clock,
    label: "SOC Status",
    value: "24/7 Operational",
    href: null
  },
]

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="relative mx-auto max-w-2xl px-6 lg:px-8 text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-500/20 mb-6">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Nachricht gesendet
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
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
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Kontakt
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Lassen Sie uns sprechen
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Haben Sie Fragen zu unseren Services oder möchten Sie ein unverbindliches Beratungsgespräch? Wir freuen uns auf Ihre Nachricht.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Kontaktinformationen
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium text-foreground">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-xl border border-border/60 bg-card">
                <h3 className="font-semibold text-foreground mb-3">
                  Schnelle Antwort garantiert
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wir antworten in der Regel innerhalb von 24 Stunden. Für dringende Security-Angelegenheiten erreichen Sie uns auch telefonisch.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Nachricht senden
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name *</Label>
                    <Input
                      id="name"
                      required
                      placeholder="Max Muster"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-foreground">Firma *</Label>
                    <Input
                      id="company"
                      required
                      placeholder="Muster AG"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-foreground">Rolle</Label>
                    <Input
                      id="role"
                      placeholder="CTO, IT-Leiter, etc."
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="max.muster@firma.ch"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone" className="text-foreground">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+41 44 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message" className="text-foreground">Nachricht *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Wie können wir Ihnen helfen?"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="mt-2 bg-input border-border resize-none"
                    />
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden dürfen.
                </p>

                <div className="mt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Nachricht senden
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
