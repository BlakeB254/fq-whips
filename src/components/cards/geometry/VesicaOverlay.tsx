"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VesicaOverlayProps {
  className?: string;
  position?: "edges" | "center" | "corners";
  intensity?: "subtle" | "medium";
}

/**
 * Sacred Geometry: Vesica Piscis Overlay
 * Creates soft, ethereal edges on images using overlapping circle gradients
 * Represents the intersection of two worlds/circles
 */
export function VesicaOverlay({
  className,
  position = "edges",
  intensity = "subtle",
}: VesicaOverlayProps) {
  const opacityValue = intensity === "subtle" ? 0.15 : 0.25;

  if (position === "center") {
    return (
      <motion.div
        className={cn(
          "absolute inset-0 pointer-events-none",
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Central vesica shape */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 80% at 50% 50%, transparent 40%, rgba(0,0,0,${opacityValue}) 100%)`,
          }}
        />
      </motion.div>
    );
  }

  if (position === "corners") {
    return (
      <motion.div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden",
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top-left vesica */}
        <div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2"
          style={{
            background: `radial-gradient(circle at center, rgba(0,0,0,${opacityValue * 0.5}) 0%, transparent 70%)`,
          }}
        />
        {/* Bottom-right vesica (smaller - golden ratio) */}
        <div
          className="absolute -bottom-[15%] -right-[15%] w-[38%] h-[38%]"
          style={{
            background: `radial-gradient(circle at center, rgba(0,0,0,${opacityValue * 0.5}) 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    );
  }

  // Default: edges - soft vignette effect
  return (
    <motion.div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Soft edge vignette following vesica proportions */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 0% 50%, rgba(0,0,0,${opacityValue * 0.3}) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 100% 50%, rgba(0,0,0,${opacityValue * 0.3}) 0%, transparent 50%)
          `,
        }}
      />
    </motion.div>
  );
}
