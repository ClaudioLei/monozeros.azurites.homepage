"use client";

import { useInView } from "@/lib/motion";

const integrations = [
  "Microsoft Defender",
  "CrowdStrike",
  "Fortinet",
  "Palo Alto",
  "SentinelOne",
  "Okta",
  "Entra ID",
  "AWS",
  "Azure",
  "Syslog",
  "Firewalls",
  "Email Security",
];

export default function IntegrationGrid() {
  const { ref, isInView } = useInView(0.05);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {integrations.map((name, i) => (
        <div
          key={name}
          className={`flex items-center justify-center px-4 py-4 rounded-xl border border-border bg-white text-sm font-medium text-text-secondary hover:border-electric-blue/40 hover:text-electric-blue hover:shadow-sm transition-all duration-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
