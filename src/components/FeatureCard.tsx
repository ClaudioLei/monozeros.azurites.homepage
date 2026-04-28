"use client";

import { useInView } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  light?: boolean;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  light,
}: FeatureCardProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group p-8 rounded-2xl border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        light
          ? "bg-white/5 border-white/10 hover:border-white/20"
          : "bg-white border-border hover:border-electric-blue/30"
      } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
          light
            ? "bg-electric-blue/20 text-electric-blue-light group-hover:bg-electric-blue/30"
            : "bg-electric-blue-glow text-electric-blue group-hover:bg-electric-blue/20"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3
        className={`text-lg font-semibold mb-2 ${
          light ? "text-white" : "text-anthracite-dark"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          light ? "text-white/60" : "text-text-secondary"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
