import { ArrowRight } from "lucide-react";

import { architecture } from "@/content/site";

export function CaseArchitecture() {
  return (
    <div className="architecture-flow" aria-label="Arquitectura de Speech Analytics">
      {architecture.map((step, index) => {
        const Icon = step.icon;

        return (
          <div className="architecture-flow__group" key={step.label}>
            <div className="architecture-step">
              <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
              <span>{step.label}</span>
            </div>
            {index < architecture.length - 1 ? (
              <ArrowRight className="architecture-arrow" size={24} strokeWidth={1.3} aria-hidden="true" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
