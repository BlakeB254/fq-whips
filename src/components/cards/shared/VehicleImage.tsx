"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SeedOfLifeAccent, VesicaOverlay } from "../geometry";
import type { ReactNode } from "react";

interface VehicleImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "golden" | "16/10" | "square";
  showGeometry?: boolean;
  overlay?: ReactNode;
  priority?: boolean;
}

/**
 * Vehicle Image with Sacred Geometry Overlays
 * - Vesica Piscis soft edge vignette
 * - Seed of Life corner accent
 * - Golden ratio aspect ratio option
 */
export function VehicleImage({
  src,
  alt,
  className,
  aspectRatio = "golden",
  showGeometry = true,
  overlay,
  priority = false,
}: VehicleImageProps) {
  const aspectClass = {
    golden: "aspect-[1.618/1]",
    "16/10": "aspect-[16/10]",
    square: "aspect-square",
  }[aspectRatio];

  return (
    <div className={cn("relative overflow-hidden", aspectClass, className)}>
      {/* Main Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Sacred Geometry: Vesica Piscis Edge Treatment */}
      {showGeometry && <VesicaOverlay position="edges" intensity="subtle" />}

      {/* Sacred Geometry: Seed of Life Corner Accent */}
      {showGeometry && (
        <motion.div
          className="absolute top-2 left-2 text-white/80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <SeedOfLifeAccent size={32} opacity={0.06} animate={false} />
        </motion.div>
      )}

      {/* Custom overlay content (badges, etc.) */}
      {overlay}
    </div>
  );
}
