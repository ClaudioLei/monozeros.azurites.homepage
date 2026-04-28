import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologie – OpenXDR – Monozeros",
  description:
    "OpenXDR über bestehende Security Investments. Integration mit Microsoft Defender, CrowdStrike, Fortinet, Palo Alto und mehr. Keine Rip-and-Replace Migration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
