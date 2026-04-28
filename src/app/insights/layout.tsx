import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights – Monozeros",
  description:
    "Wissen und Perspektiven für Schweizer Cybersecurity. MDR, SOC Outsourcing, Incident Response und Compliance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
