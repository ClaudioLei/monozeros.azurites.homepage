import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { getLegalMarkdownBlocks, LegalMarkdown } from "@/lib/legal-markdown"

export const metadata = {
  title: "Datenschutz | Monozeros",
}

export default async function DatenschutzPage() {
  const blocks = await getLegalMarkdownBlocks("DSG.md")

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:pt-40">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Rechtliches
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Datenschutz</h1>
        </div>
        <LegalMarkdown blocks={blocks} />
      </section>
      <Footer />
    </main>
  )
}
