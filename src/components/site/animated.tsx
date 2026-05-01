"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function FadeIn({ children, className, delay = 0, as = "div" }: FadeInProps) {
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
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
  return (
    <motion.div
      whileHover={{ x: 8 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
