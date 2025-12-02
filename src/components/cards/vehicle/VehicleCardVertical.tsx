"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Zap, Heart, Gauge, Fuel, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GoldenFrame, HexagonStats, SeedOfLifeAccent } from "../geometry";
import { VehicleImage, DealBanner } from "../shared";
import type { VehicleCardVerticalProps } from "./types";

/**
 * Vertical Vehicle Card with Sacred Geometry Design
 *
 * Features:
 * - Golden ratio (1.618:1) image aspect ratio
 * - Seed of Life corner accent
 * - Hexagonal stats display
 * - Golden frame hover effect
 * - Fibonacci-curved deal banner
 */
export function VehicleCardVertical({
  vehicle,
  className,
  linkHref,
  showDealBanner = true,
  showFeatures = false,
  showGeometry = true,
  priority = false,
  onFavorite,
  isFavorited = false,
}: VehicleCardVerticalProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(vehicle.id);
  };

  const cardContent = (
      <GoldenFrame showOnHover={showGeometry} intensity="subtle">
        <Card
          className={cn(
            "overflow-hidden cursor-pointer group h-full",
            "bg-white border-0",
            "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
            "hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
            "transition-all duration-500",
            "hover:-translate-y-1",
            className
          )}
        >
          {/* Image Container with Sacred Geometry */}
          <VehicleImage
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            aspectRatio="golden"
            showGeometry={showGeometry}
            priority={priority}
            overlay={
              <>
                {/* Top Badges Row */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="flex gap-2">
                    {vehicle.instantBook && (
                      <Badge className="bg-primary text-white shadow-lg gap-1 px-2.5 py-1 text-xs">
                        <Zap className="h-3 w-3" />
                        Instant
                      </Badge>
                    )}
                    {vehicle.rating >= 4.8 && (
                      <Badge className="bg-amber-500 text-white shadow-lg gap-1 px-2.5 py-1 text-xs">
                        <Star className="h-3 w-3 fill-white" />
                        Top Rated
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <motion.button
                    onClick={handleFavoriteClick}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      "bg-white/90 backdrop-blur-sm shadow-lg",
                      "hover:bg-white hover:scale-110",
                      "transition-all duration-300"
                    )}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600 hover:text-red-500"
                      )}
                    />
                  </motion.button>
                </div>

                {/* Bottom Info on Image */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-bold text-white text-lg drop-shadow-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {vehicle.location}
                    </div>
                    <span className="text-white/60">•</span>
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {vehicle.rating} ({vehicle.reviews})
                    </div>
                  </div>
                </div>
              </>
            }
          />

          <CardContent className="p-4 space-y-3">
            {/* Hexagonal Stats Row */}
            <HexagonStats
              stats={[
                {
                  icon: <Gauge className="h-3.5 w-3.5" />,
                  value: `${vehicle.mileageIncluded} mi/day`,
                },
                {
                  icon: <Fuel className="h-3.5 w-3.5" />,
                  value: vehicle.fuelPolicy === "full-to-full" ? "Full-Full" : "Same-Same",
                },
                {
                  icon: <Shield className="h-3.5 w-3.5 text-green-600" />,
                  value: "Insured",
                },
              ]}
            />

            {/* Features Pills (optional) */}
            {showFeatures && vehicle.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {vehicle.features.slice(0, 4).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {vehicle.features.length > 4 && (
                  <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
                    +{vehicle.features.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Pricing Section */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${vehicle.pricePerDay}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">/day</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 line-through">
                    ${Math.round(vehicle.pricePerDay * 7)} for 7 days
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    ${vehicle.weeklyPrice * 7} for 7 days
                  </div>
                </div>
              </div>

              {/* Deal Banner with Fibonacci Curve */}
              {showDealBanner && (
                <DealBanner
                  discountedPrice={vehicle.discountedPrice}
                  originalPrice={vehicle.pricePerDay}
                  minDays={3}
                />
              )}
            </div>

            {/* Subtle geometry accent in corner (visible on hover) */}
            {showGeometry && (
              <motion.div
                className="absolute bottom-2 right-2 text-primary pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <SeedOfLifeAccent size={24} opacity={0.08} animate={false} />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </GoldenFrame>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div className="block">{cardContent}</div>;
}
