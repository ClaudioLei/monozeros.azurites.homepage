import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Monozeros",
  description:
    "Schweizer Cybersecurity mit operativer Realität. Enterprise IT Erfahrung, Security Operations Verständnis und Governance Fokus.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
