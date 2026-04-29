import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: 'Monozeros | 24/7 Cybersecurity für Schweizer Unternehmen',
  description: 'Managed Detection & Response mit Schweizer Expertenservice. OpenXDR + lokaler Service Layer. Security Operations ohne Konzernkomplexität.',
  keywords: ['Cybersecurity', 'MDR', 'SOC', 'Schweiz', 'Managed Security', 'OpenXDR', 'Incident Response'],
  authors: [{ name: 'Monozeros GmbH' }],
  openGraph: {
    title: 'Monozeros | 24/7 Cybersecurity für Schweizer Unternehmen',
    description: 'Managed Detection & Response mit Schweizer Expertenservice. Security Operations ohne eigenes SOC.',
    type: 'website',
    locale: 'de_CH',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
