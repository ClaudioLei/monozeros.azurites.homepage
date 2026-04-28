import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "MDR & Managed XDR", href: "/mdr" },
    { label: "Compliance & Trust", href: "/compliance" },
    { label: "Für MSPs", href: "/msp" },
    { label: "Technologie", href: "/technologie" },
  ],
  Unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Insights", href: "/insights" },
    { label: "Assessment", href: "/assessment" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  Rechtliches: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-anthracite-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-electric-blue rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                monozeros
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Managed Detection & Response mit Schweizer Expertenservice.
              Professionelle Security Operations für Unternehmen ohne eigenes SOC.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold mb-4 text-white/90">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Monozeros GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success" />
            Swiss Hosted &middot; Azure Switzerland
          </div>
        </div>
      </div>
    </footer>
  );
}
