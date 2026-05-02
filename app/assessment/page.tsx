"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Users, Server, Cloud, Shield, Clock, Building2, 
  ArrowRight, ArrowLeft, Check, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const steps = [
  {
    id: 1,
    title: "Unternehmensgrösse",
    description: "Wie gross ist Ihr Unternehmen?"
  },
  {
    id: 2,
    title: "IT-Infrastruktur",
    description: "Beschreiben Sie Ihre IT-Landschaft"
  },
  {
    id: 3,
    title: "Security & Compliance",
    description: "Aktuelle Security-Situation"
  },
  {
    id: 4,
    title: "Kontaktdaten",
    description: "Für die Ergebniszustellung"
  },
]

const employeeRanges = [
  "1-50 Mitarbeitende",
  "51-200 Mitarbeitende", 
  "201-500 Mitarbeitende",
  "501-1000 Mitarbeitende",
  "1000+ Mitarbeitende",
]

const industries = [
  "Healthcare",
  "Finance & Banking",
  "Industrie & Produktion",
  "Public Sector",
  "IT & Technology",
  "Andere",
]

const cloudUsage = [
  "Kein Cloud",
  "Nur Microsoft 365",
  "AWS",
  "Azure",
  "Google Cloud",
  "Multi-Cloud",
]

const securityTools = [
  "Microsoft Defender",
  "CrowdStrike",
  "SentinelOne",
  "Fortinet",
  "Palo Alto",
  "Keine/Unbekannt",
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    employees: "",
    endpoints: "",
    servers: "",
    industry: "",
    cloudUsage: "",
    securityTools: [] as string[],
    needs24x7: false,
    complianceRequired: false,
    name: "",
    company: "",
    email: "",
    phone: "",
    privacyAccepted: false,
    website: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!formData.privacyAccepted) {
      setSubmitError("Bitte akzeptieren Sie die Datenschutzhinweise.")
      return
    }

    const message = [
      "Public MDR Readiness Assessment",
      "",
      `Mitarbeitende: ${formData.employees || "-"}`,
      `Branche: ${formData.industry || "-"}`,
      `Endpoints: ${formData.endpoints || "-"}`,
      `Server: ${formData.servers || "-"}`,
      `Cloud Nutzung: ${formData.cloudUsage || "-"}`,
      `Security Tools: ${formData.securityTools.length > 0 ? formData.securityTools.join(", ") : "-"}`,
      `24/7 Ueberwachung benoetigt: ${formData.needs24x7 ? "Ja" : "Nein"}`,
      `Compliance-Anforderungen: ${formData.complianceRequired ? "Ja" : "Nein"}`,
    ].join("\n")

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          topic: "Public MDR Assessment",
          message,
          privacyAccepted: true,
          website: formData.website,
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        setSubmitError(result?.error?.message || result?.error || "Die Anfrage konnte nicht gesendet werden.")
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError("Verbindungsfehler. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSecurityTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      securityTools: prev.securityTools.includes(tool)
        ? prev.securityTools.filter(t => t !== tool)
        : [...prev.securityTools, tool]
    }))
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
              Vielen Dank für Ihre Anfrage
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Wir haben Ihre Informationen erhalten und werden uns innerhalb von 24 Stunden mit einer ersten Einschätzung bei Ihnen melden.
            </p>
            <div className="mt-8 p-6 rounded-xl border border-border/60 bg-card text-left">
              <h3 className="font-semibold text-foreground mb-4">Nächste Schritte:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                  Analyse Ihrer Angaben durch unsere Security-Experten
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                  Erste Einschätzung und empfohlenes Setup per Email
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                  Persönliches Beratungsgespräch zur Vertiefung
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <FileText className="h-4 w-4" />
              MDR Readiness Assessment
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Wie bereit ist Ihr Unternehmen für MDR?
            </h1>
            <p className="mt-4 text-muted-foreground">
              Beantworten Sie einige Fragen und erhalten Sie eine erste Einschätzung.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-border bg-card text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 transition-colors ${
                      currentStep > step.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-foreground">{steps[currentStep - 1].title}</p>
              <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-8">
            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>

            {/* Step 1: Company Size */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-3 block">Anzahl Mitarbeitende</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {employeeRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setFormData({...formData, employees: range})}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          formData.employees === range
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        <Users className="h-5 w-5 mb-2" />
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Branche</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => setFormData({...formData, industry: industry})}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          formData.industry === industry
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: IT Infrastructure */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="endpoints" className="text-foreground">Anzahl Endpoints (PCs/Laptops)</Label>
                    <Input
                      id="endpoints"
                      type="number"
                      placeholder="z.B. 150"
                      value={formData.endpoints}
                      onChange={(e) => setFormData({...formData, endpoints: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="servers" className="text-foreground">Anzahl Server</Label>
                    <Input
                      id="servers"
                      type="number"
                      placeholder="z.B. 20"
                      value={formData.servers}
                      onChange={(e) => setFormData({...formData, servers: e.target.value})}
                      className="mt-2 bg-input border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Cloud Nutzung</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cloudUsage.map((cloud) => (
                      <button
                        key={cloud}
                        type="button"
                        onClick={() => setFormData({...formData, cloudUsage: cloud})}
                        className={`p-3 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                          formData.cloudUsage === cloud
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        <Cloud className="h-4 w-4" />
                        {cloud}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security & Compliance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-3 block">Aktuelle Security Tools (Mehrfachauswahl)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {securityTools.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleSecurityTool(tool)}
                        className={`p-3 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                          formData.securityTools.includes(tool)
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        <Shield className="h-4 w-4" />
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, needs24x7: !formData.needs24x7})}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.needs24x7
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <div className="font-medium text-foreground">24/7 Überwachung benötigt</div>
                    <div className="text-sm text-muted-foreground">Kritische Systeme ausserhalb Bürozeiten</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, complianceRequired: !formData.complianceRequired})}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.complianceRequired
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Building2 className="h-5 w-5 text-primary mb-2" />
                    <div className="font-medium text-foreground">Compliance-Anforderungen</div>
                    <div className="text-sm text-muted-foreground">Regulierte Branche oder spezielle Auflagen</div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div className="space-y-6">
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
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <div>
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
                </div>
                <p className="text-sm text-muted-foreground">
                  Mit dem Absenden stimmen Sie zu, dass wir Sie bezüglich Ihrer Anfrage kontaktieren dürfen.
                </p>
                <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-4">
                  <Checkbox
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => setFormData({...formData, privacyAccepted: !!checked})}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    Ich stimme zu, dass Monozeros meine Angaben zur Einschätzung der MDR-Anforderungen und zur Kontaktaufnahme verwendet. Es werden keine Passwörter, API-Keys oder produktiven Zugangsdaten abgefragt.
                  </span>
                </label>
              </div>
            )}

            {submitError && (
              <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < 4 ? (
                <Button type="button" onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Weiter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  {isSubmitting ? "Wird gesendet..." : "Assessment absenden"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
