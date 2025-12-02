"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeedOfLifeAccentProps {
  className?: string;
  size?: number;
  opacity?: number;
  animate?: boolean;
}

// Pre-calculated positions for six circles at 60-degree intervals
// Using fixed values to avoid hydration mismatch from floating point differences
const CIRCLE_POSITIONS = [
  { cos: 1, sin: 0 },           // 0°
  { cos: 0.5, sin: 0.866 },     // 60° (sqrt(3)/2 ≈ 0.866)
  { cos: -0.5, sin: 0.866 },    // 120°
  { cos: -1, sin: 0 },          // 180°
  { cos: -0.5, sin: -0.866 },   // 240°
  { cos: 0.5, sin: -0.866 },    // 300°
];

/**
 * Sacred Geometry: Seed of Life
 * Seven overlapping circles forming the foundation of the Flower of Life
 * Used as subtle corner decorations on cards
 */
export function SeedOfLifeAccent({
  className,
  size = 60,
  opacity = 0.04,
  animate = true,
}: SeedOfLifeAccentProps) {
  const radius = size * 0.25;
  const center = size / 2;

  // Six circles around center, positioned at 60-degree intervals
  // Using pre-calculated values to avoid server/client hydration mismatch
  const outerCircles = CIRCLE_POSITIONS.map((pos) => ({
    cx: center + radius * pos.cos,
    cy: center + radius * pos.sin,
  }));

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const },
        opacity: { duration: 0.3 },
      },
    },
  };

  const Wrapper = animate ? motion.svg : "svg";
  const Circle = animate ? motion.circle : "circle";

  return (
    <Wrapper
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none", className)}
      style={{ opacity }}
      width={size}
      height={size}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Center circle */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5}
        variants={animate ? pathVariants : undefined}
      />

      {/* Six surrounding circles */}
      {outerCircles.map((circle, i) => (
        <Circle
          key={i}
          cx={circle.cx}
          cy={circle.cy}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          variants={animate ? pathVariants : undefined}
          style={animate ? { transition: `all 0.3s ease ${i * 0.1}s` } : undefined}
        />
      ))}
    </Wrapper>
  );
}
