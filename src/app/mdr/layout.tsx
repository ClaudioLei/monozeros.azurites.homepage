import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDR & Managed XDR – Monozeros",
  description:
    "Ihr externes Security Operations Center. 24/7 Monitoring, Threat Hunting und Incident Handling für Unternehmen ohne eigenes SOC.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
