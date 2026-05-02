import { Check } from "lucide-react"

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-500/20 mb-6">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Vielen Dank.
        </h1>
        <p className="text-lg text-muted-foreground">
          Ihre Angaben wurden erfolgreich übermittelt.
          Unser Team prüft die Informationen und meldet sich zeitnah.
        </p>
      </div>
    </main>
  )
}