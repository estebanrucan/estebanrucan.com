import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccentHeadingProps = {
  children: string;
  accent?: string;
  className?: string;
};

export function AccentHeading({ children, accent, className }: AccentHeadingProps) {
  if (!accent || !children.includes(accent)) {
    return <h1 className={cn("display-heading", className)}>{children}</h1>;
  }

  const [before, after] = children.split(accent);

  return (
    <h1 className={cn("display-heading", className)}>
      {before}
      <span>{accent}</span>
      {after}
    </h1>
  );
}

type SectionKickerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionKicker({ children, className }: SectionKickerProps) {
  return <p className={cn("section-kicker", className)}>{children}</p>;
}
