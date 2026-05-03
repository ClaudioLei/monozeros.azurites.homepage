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
          <p>Hirschenstrasse 18</p>
          <p>9200 Gossau</p>
          <p>Schweiz</p>
          <p>Handelsregister-Nr.: CH-320.4.081.054-9</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
