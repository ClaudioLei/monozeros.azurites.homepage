import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Datenschutz | Monozeros",
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pt-40">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Datenschutz</h1>
        <div className="mt-8 space-y-5 text-muted-foreground">
          <p>
            Diese Seite ist als öffentlich erreichbare Route für die Datenschutzhinweise
            eingerichtet.
          </p>
          <p>
            Die finalen rechtlichen Inhalte sollten vor der Veröffentlichung mit den
            verbindlichen Angaben von Monozeros ersetzt werden.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
