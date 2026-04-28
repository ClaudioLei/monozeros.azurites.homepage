import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Für MSPs – White Label SOC – Monozeros",
  description:
    "White Label SOC für ausgewählte Schweizer IT Partner. Co-Selling, White Label MDR und neue recurring Revenue Streams.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
