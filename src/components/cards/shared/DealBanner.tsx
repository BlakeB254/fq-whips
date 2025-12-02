"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DealBannerProps {
  discountedPrice: number;
  originalPrice: number;
  minDays?: number;
  className?: string;
}

/**
 * Deal Banner with Fibonacci Curve
 * - Curved top edge following golden ratio proportions
 * - Subtle geometric decorations
 */
export function DealBanner({
  discountedPrice,
  originalPrice,
  minDays = 3,
  className,
}: DealBannerProps) {
  const savings = (originalPrice - discountedPrice) * minDays;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600",
        "text-white",
        className
      )}
      style={{
        borderRadius: "0.75rem",
        // Fibonacci-inspired asymmetric corners
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "1.25rem",
        borderBottomRightRadius: "0.5rem",
        borderBottomLeftRadius: "1.25rem",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Geometric decorations - circles following golden ratio sizes */}
      <div
        className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full"
        style={{ width: "4rem", height: "4rem" }} // Base
      />
      <div
        className="absolute -bottom-4 -left-4 rounded-full bg-white/10"
        style={{ width: "2.472rem", height: "2.472rem" }} // 4rem / phi
      />
      <div
        className="absolute top-1/2 right-1/4 rounded-full bg-white/5"
        style={{ width: "1.528rem", height: "1.528rem" }} // 2.472rem / phi
      />

      {/* Content */}
      <div className="relative px-3 py-2.5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium text-green-100 uppercase tracking-wide">
            Multi-Day Deal
          </div>
          <div className="text-sm font-bold">
            ${discountedPrice}/day for {minDays}+ days
          </div>
        </div>

        {/* Savings badge with hexagonal feel */}
        <div
          className="bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-bold"
          style={{
            clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
            borderRadius: "2px",
          }}
        >
          SAVE ${savings}+
        </div>
      </div>

      {/* Subtle curved line accent at top */}
      <svg
        className="absolute top-0 left-0 w-full h-2 pointer-events-none"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <path
          d="M0,8 Q25,0 50,4 T100,8"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}
