import Link from "next/link"
import { Mail, MapPin, Phone, Shield } from "lucide-react"

const footerLinks = {
  services: [
    { name: "MDR & Managed XDR", href: "/mdr-managed-xdr" },
    { name: "Hosting & Compliance", href: "/hosting-compliance" },
    { name: "Technologie", href: "/technologie" },
  ],
  company: [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Assessment", href: "/assessment" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Impressum", href: "/impressum" },
    { name: "AGB", href: "/agb" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
         <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
           <div className="lg:col-span-1">
             <Link href="/" className="flex items-center gap-2">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                 <Shield className="h-6 w-6 text-primary-foreground" />
               </div>
               <span className="text-xl font-semibold tracking-tight text-foreground">
                 Monozeros
               </span>
             </Link>
             <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
               Schweizer Cybersecurity mit operativer Realität. Managed Detection
               & Response für Unternehmen ohne eigenes SOC.
             </p>
             <div className="mt-6 space-y-3">
               <div className="flex items-center gap-3 text-sm text-muted-foreground">
                 <MapPin className="h-4 w-4 text-primary" />
                 <span>Hirschenstrasse 18</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-muted-foreground">
                 <MapPin className="h-4 w-4 text-primary" />
                 <span>9200 Gossau, Schweiz</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-muted-foreground">
                 <Mail className="h-4 w-4 text-primary" />
                 <a
                   href="mailto:info@monozeros.ch"
                   className="transition-colors hover:text-foreground"
                 >
                   info@monozeros.ch
                 </a>
               </div>
               <div className="flex items-center gap-3 text-sm text-muted-foreground">
                 <Phone className="h-4 w-4 text-primary" />
                 <a
                   href="tel:+41443001234"
                   className="transition-colors hover:text-foreground"
                 >
                   +41 71 232 65 66
                 </a>
               </div>
             </div>
           </div>

           <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
               Services
             </h3>
             <ul className="mt-4 space-y-3">
               {footerLinks.services.map((link) => (
                 <li key={link.name}>
                   <Link
                     href={link.href}
                     className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
               Unternehmen
             </h3>
             <ul className="mt-4 space-y-3">
               {footerLinks.company.map((link) => (
                 <li key={link.name}>
                   <Link
                     href={link.href}
                     className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
               Rechtliches
             </h3>
             <ul className="mt-4 space-y-3">
               {footerLinks.legal.map((link) => (
                 <li key={link.name}>
                   <Link
                     href={link.href}
                     className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
         </div>

         <div className="mt-12 border-t border-border/40 pt-8">
           <div className="flex items-center justify-center md:justify-start">
             <p className="text-sm text-muted-foreground">
               © {new Date().getFullYear()} Monozeros GmbH. Alle Rechte vorbehalten.
             </p>
           </div>
         </div>

         <div className="mt-8 border-t border-border/40 pt-6">
           <div className="flex items-center justify-center md:justify-start">
             <p className="text-xs text-muted-foreground leading-relaxed">
               Hinweise zu Sicherheit und Compliance: Die angebotenen MDR- und OpenXDR-Services reduzieren Sicherheitsrisiken und unterstützen bei Erkennung, Analyse, Dokumentation und Reaktion auf Cybervorfälle. Sie stellen jedoch keine Garantie dar, dass Systeme nicht kompromittiert werden können. Compliance-, Melde- und Datenschutzpflichten hängen vom konkreten Einsatz, den angebundenen Systemen, dem vereinbarten Betriebsmodell und der rechtlichen Bewertung des Kunden ab. Monozeros erbringt keine Rechtsberatung.
             </p>
           </div>
         </div>
       </div>
    </footer>
  )
}
