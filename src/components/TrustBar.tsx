"use client";

import { useInView } from "@/lib/motion";
import { Server, Clock, Globe, ShieldCheck, Cpu } from "lucide-react";

const items = [
  { icon: Server, label: "Swiss Hosted" },
  { icon: Cpu, label: "Azure Switzerland" },
  { icon: Clock, label: "24/7 Monitoring" },
  { icon: Globe, label: "Deutschsprachig" },
  { icon: ShieldCheck, label: "Enterprise Prozesse" },
];

export default function TrustBar() {
  const { ref, isInView } = useInView(0.1);

  return (
    <div ref={ref} className="border-y border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 transition-all duration-500 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <item.icon className="w-4 h-4 text-electric-blue" />
              <span className="text-sm font-medium text-text-secondary">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
