"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, Shield, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "MDR & Managed XDR", href: "/mdr-managed-xdr" },
  { name: "Hosting & Compliance", href: "/hosting-compliance" },
  { name: "Für Partner", href: "/partner" },
  { name: "Technologie", href: "/technologie" },
  { name: "Assessment", href: "/assessment" },
  { name: "Insights", href: "/insights" },
  { name: "Über uns", href: "/ueber-uns" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Monozeros
          </span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Mehr <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigation.slice(4).map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <ThemeToggle />
          <Link href="/kontakt">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-secondary"
            >
              Kontakt
            </Button>
          </Link>
          <Link href="/assessment">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Assessment starten
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Menü öffnen</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background lg:hidden">
          <div className="space-y-1 px-6 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Theme
              </span>
              <ThemeToggle />
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
              <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground"
                >
                  Kontakt
                </Button>
              </Link>
              <Link href="/assessment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">
                  Assessment starten
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
