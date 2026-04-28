import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Trust – Monozeros",
  description:
    "Cybersecurity mit Governance-Fokus. revDSG-orientierte Prozesse, Security Reporting und Compliance-Unterstützung für regulierte Organisationen.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
