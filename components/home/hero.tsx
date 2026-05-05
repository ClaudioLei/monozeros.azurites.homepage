"use client"

import Link from "next/link"
import { ArrowRight, Shield, Lock, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
         <div className="mx-auto max-w-4xl text-center">
           {/* Main Headline */}
           <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
             24/7 MDR-Monitoring für Schweizer Unternehmen
           </h1>

           {/* Subheadline */}
           <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto text-pretty">
             Monozeros unterstützt Schweizer Organisationen beim Einsatz moderner OpenXDR- und MDR-Services auf Basis der AZURITES/Cynclair-Plattform – mit lokaler Beratung, strukturiertem Onboarding und klaren Eskalationsprozessen.
           </p>

           {/* CTAs */}
           <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
             <Link href="/assessment">
               <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8">
                 MDR Assessment starten
                 <ArrowRight className="h-4 w-4" />
               </Button>
             </Link>
             <Link href="/kontakt">
               <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 text-base px-8">
                 Beratungsgespräch buchen
               </Button>
             </Link>
           </div>

           {/* Trust Indicators */}
           <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Shield className="h-5 w-5 text-primary" />
               <span>24/7 SOC-Monitoring</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Lock className="h-5 w-5 text-primary" />
               <span>Deutschsprachige Kundenbetreuung</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Eye className="h-5 w-5 text-primary" />
               <span>Schweizer Hosting optional</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Zap className="h-5 w-5 text-primary" />
               <span>API-, Syslog-, Agent- und Log-Collector-Integration</span>
             </div>
           </div>
         </div>

         {/* Stats Section */}
         <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
           {[
             { value: "< 15 Min", label: "Mean Time to Respond" },
             { value: "24/7", label: "SOC-Monitoring" },
             { value: "gemäss SLA", label: "Service Verfügbarkeit" },
             { value: "Zahlreiche", label: "Integrationen und API-Anbindungen verfügbar" },
           ].map((stat) => (
             <div key={stat.label} className="text-center">
               <div className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</div>
               <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
             </div>
           ))}
         </div>
       </div>
    </section>
  )
}
