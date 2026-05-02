import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Impressum | Monozeros",
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pt-40">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Impressum</h1>
        <div className="mt-8 space-y-5 text-muted-foreground">
          <p>Monozeros GmbH</p>
          <p>Zuerich, Schweiz</p>
          <p>
            Die finalen Impressumsangaben sollten vor der Veroeffentlichung mit Adresse,
            Vertretungsberechtigten und Registerangaben ergaenzt werden.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
