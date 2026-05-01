"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function FadeIn({ children, className, delay = 0, as = "div" }: FadeInProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

type InteractiveRowProps = {
  children: ReactNode;
  className?: string;
};

export function InteractiveRow({ children, className }: InteractiveRowProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileHover={reduced ? undefined : { x: 8 }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
