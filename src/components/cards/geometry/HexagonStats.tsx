"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HexagonStatProps {
  icon: ReactNode;
  value: string;
  className?: string;
}

interface HexagonStatsProps {
  stats: HexagonStatProps[];
  className?: string;
  variant?: "row" | "compact";
}

/**
 * Sacred Geometry: Hexagonal Stats Display
 * Stats displayed in hexagonal containers - honeycomb pattern
 * Represents efficiency and natural organization
 */
export function HexagonStat({ icon, value, className }: HexagonStatProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5",
        "bg-gray-50/80 text-gray-600",
        "transition-all duration-300",
        "group-hover:bg-primary/5 group-hover:text-primary",
        className
      )}
      style={{
        clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
      }}
    >
      <span className="text-gray-500 group-hover:text-primary/70 transition-colors">
        {icon}
      </span>
      <span className="text-xs font-medium whitespace-nowrap">{value}</span>
    </div>
  );
}

export function HexagonStats({ stats, className, variant = "row" }: HexagonStatsProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {stats.map((stat, i) => (
          <HexagonStat
            key={i}
            icon={stat.icon}
            value={stat.value}
            className={stat.className}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "bg-gradient-to-r from-gray-50/60 via-gray-50/80 to-gray-50/60",
        "rounded-lg px-2 py-1.5",
        "border border-gray-100/50",
        className
      )}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center">
          <HexagonStat
            icon={stat.icon}
            value={stat.value}
            className={stat.className}
          />
          {i < stats.length - 1 && (
            <div className="w-px h-4 bg-gray-200/60 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
