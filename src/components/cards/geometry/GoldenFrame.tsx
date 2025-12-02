"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GoldenFrameProps {
  children: ReactNode;
  className?: string;
  showOnHover?: boolean;
  intensity?: "subtle" | "medium" | "strong";
}

/**
 * Sacred Geometry: Golden Frame
 * A frame container with proportions following the golden ratio (1.618)
 * Frame reveals on hover with asymmetric border widths
 */
export function GoldenFrame({
  children,
  className,
  showOnHover = true,
  intensity = "subtle",
}: GoldenFrameProps) {
  const opacityMap = {
    subtle: { rest: 0, hover: 0.12 },
    medium: { rest: 0.05, hover: 0.2 },
    strong: { rest: 0.1, hover: 0.35 },
  };

  const opacities = opacityMap[intensity];

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-xl", className)}
      initial="rest"
      whileHover={showOnHover ? "hover" : undefined}
    >
      {children}

      {/* Golden ratio frame overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          boxShadow: `
            inset 2px 0 0 0 var(--primary),
            inset 0 2px 0 0 var(--primary),
            inset -1.236px 0 0 0 var(--primary),
            inset 0 -1.236px 0 0 var(--primary)
          `,
        }}
        variants={{
          rest: { opacity: opacities.rest },
          hover: {
            opacity: opacities.hover,
            transition: { duration: 0.3, ease: [0.618, 0, 0.382, 1] },
          },
        }}
      />

      {/* Corner accent - top left */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, var(--primary) 0%, transparent 60%)`,
        }}
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: {
            opacity: opacities.hover * 0.5,
            scale: 1,
            transition: { duration: 0.4, ease: [0.618, 0, 0.382, 1] },
          },
        }}
      />

      {/* Corner accent - bottom right (smaller, golden ratio) */}
      <motion.div
        className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
        style={{
          background: `linear-gradient(-45deg, var(--primary) 0%, transparent 60%)`,
        }}
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: {
            opacity: opacities.hover * 0.5,
            scale: 1,
            transition: { duration: 0.4, delay: 0.1, ease: [0.618, 0, 0.382, 1] },
          },
        }}
      />
    </motion.div>
  );
}
