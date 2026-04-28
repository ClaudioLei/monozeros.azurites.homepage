"use client";

import { useInView } from "@/lib/motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function Section({ children, className = "", id, dark }: SectionProps) {
  const { ref, isInView } = useInView(0.05);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 lg:py-28 ${dark ? "bg-anthracite-dark text-white" : ""} ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  center,
  light,
}: {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {label && (
        <p
          className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            light ? "text-electric-blue-light" : "text-electric-blue"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-3xl lg:text-4xl font-bold leading-tight tracking-tight ${
          light ? "text-white" : "text-anthracite-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg max-w-2xl leading-relaxed ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-text-secondary"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
