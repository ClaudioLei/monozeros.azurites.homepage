import Link from "next/link"
import { ArrowRight, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Bereit für professionelle Security Operations?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Starten Sie mit einem kostenlosen Assessment und erfahren Sie, wie Monozeros Ihre IT-Sicherheit auf das nächste Level bringt.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link href="/assessment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
                  <FileText className="h-5 w-5" />
                  Assessment starten
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 w-full sm:w-auto">
                  <Calendar className="h-5 w-5" />
                  Termin buchen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
