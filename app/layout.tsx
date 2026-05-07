import type { Metadata } from "next"
import { headers } from "next/headers"

import { AnalyticsConsentManager } from "@/components/analytics-consent-manager"
import { CspNonceProvider } from "@/components/csp-nonce-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Monozeros | Cybersecurity für Schweizer Unternehmen",
  description:
    "Managed Detection & Response mit Schweizer Expertenservice. OpenXDR plus lokaler Service Layer. Security Operations ohne Konzernkomplexität.",
  keywords: [
    "Cybersecurity",
    "MDR",
    "SOC",
    "Schweiz",
    "Managed Security",
    "OpenXDR",
    "Incident Response",
  ],
  authors: [{ name: "Monozeros GmbH" }],
  openGraph: {
    title: "Monozeros | Cybersecurity für Schweizer Unternehmen",
    description:
      "Managed Detection & Response mit Schweizer Expertenservice. Security Operations ohne eigenes SOC.",
    type: "website",
    locale: "de_CH",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const nonce = (await headers()).get("x-nonce")

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className="bg-background"
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased">
        <CspNonceProvider nonce={nonce}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            nonce={nonce ?? undefined}
          >
            {children}
            <AnalyticsConsentManager />
          </ThemeProvider>
        </CspNonceProvider>
      </body>
    </html>
  )
}
