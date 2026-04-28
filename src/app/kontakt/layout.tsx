import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Monozeros",
  description:
    "Kontaktieren Sie Monozeros für MDR, Compliance, Partnerschaft oder ein Beratungsgespräch. Schweizer Cybersecurity Experte.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
