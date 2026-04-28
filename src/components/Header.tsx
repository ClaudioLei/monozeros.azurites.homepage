"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/lib/motion";
import { Menu, X, Shield } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "MDR & Managed XDR", href: "/mdr" },
  { label: "Compliance & Trust", href: "/compliance" },
  { label: "Für MSPs", href: "/msp" },
  { label: "Technologie", href: "/technologie" },
  { label: "Assessment", href: "/assessment" },
  { label: "Insights", href: "/insights" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-anthracite-dark rounded-lg flex items-center justify-center group-hover:bg-electric-blue transition-colors duration-300">
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-anthracite-dark">
              monozeros
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-md hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/kontakt"
              className="px-5 py-2.5 text-sm font-medium bg-electric-blue text-white rounded-lg hover:bg-electric-blue-dark transition-colors duration-200"
            >
              Beratungsgespräch
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-anthracite-dark"
            aria-label="Navigation öffnen"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border-light shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border-light">
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 text-sm font-medium bg-electric-blue text-white rounded-lg hover:bg-electric-blue-dark transition-colors"
              >
                Beratungsgespräch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
