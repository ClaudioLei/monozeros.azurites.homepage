import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDR Readiness Assessment – Monozeros",
  description:
    "Bewerten Sie Ihren Security-Reifegrad. Erfahren Sie, ob Managed Detection & Response für Ihr Unternehmen geeignet ist.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
