import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PlayCircle, Radar, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "AZURITES OpenXDR | Monozeros",
  description:
    "AZURITES OpenXDR von Cynclair verbindet Security-Daten aus bestehenden Tools und macht daraus klare, priorisierte Sicherheitsvorfälle.",
}

export default function TechnologiePage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.01_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.01_250/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-1/4 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              AZURITES OpenXDR von Cynclair
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              AZURITES OpenXDR - Security Operations auf einen Blick
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Erkennen, analysieren und reagieren: AZURITES bündelt
              Security-Daten aus bestehenden Tools und macht daraus klare,
              priorisierte Sicherheitsvorfälle.
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground">
              AZURITES OpenXDR von Cynclair verbindet Logs, Alerts und
              Telemetrie aus Endpoints, Firewalls, Servern, Cloud- und
              Identity-Systemen in einer zentralen Plattform. So entsteht ein
              klares Lagebild für schnelle Erkennung, strukturierte Analyse und
              automatisierte Incident Response.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/kontakt">
                <Button
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Demo anfragen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur">
                <Radar className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Zentrale Sicht
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Security-Daten aus bestehenden Tools in einer Plattform.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Priorisierte Vorfälle
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Relevante Ereignisse werden klar strukturiert und gewichtet.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur">
                <PlayCircle className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Schnellere Reaktion
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Analyse und Incident Response werden operativ unterstützt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Video
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              AZURITES in Aktion
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Sehen Sie im kurzen Walkthrough, wie AZURITES Sicherheitsdaten
              zusammenführt, Alerts analysiert und Security Operations
              unterstützt.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
            <video controls className="block w-full bg-black">
              <source
                src="https://www.cynclair.com/wp-content/uploads/2026/04/Azurites-Walkthrough-Sub-EN-1.mp4"
                type="video/mp4"
              />
              <track
                kind="captions"
                src="/azurites-video-captions.vtt"
                srcLang="en"
                label="English captions"
                default
              />
              Ihr Browser unterstützt das Video-Tag nicht.
            </video>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/kontakt">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-secondary"
              >
                Demo anfragen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
