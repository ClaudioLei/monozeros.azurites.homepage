import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monozeros – 24/7 Cybersecurity für Schweizer Unternehmen",
  description:
    "Managed Detection & Response mit Schweizer Expertenservice. OpenXDR, Incident Response und professionelle Security Operations ohne eigenes SOC.",
  keywords: [
    "MDR Schweiz",
    "Managed Detection Response",
    "SOC Outsourcing",
    "Cybersecurity Schweiz",
    "OpenXDR",
    "Incident Response",
    "Security Operations",
  ],
  openGraph: {
    title: "Monozeros – 24/7 Cybersecurity für Schweizer Unternehmen",
    description:
      "Managed Detection & Response mit Schweizer Expertenservice. OpenXDR, Incident Response und professionelle Security Operations ohne eigenes SOC.",
    type: "website",
    locale: "de_CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
