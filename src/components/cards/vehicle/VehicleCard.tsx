"use client";

import { VehicleCardVertical } from "./VehicleCardVertical";
import { VehicleCardHorizontal } from "./VehicleCardHorizontal";
import type { VehicleCardProps } from "./types";

/**
 * Universal Vehicle Card Component
 *
 * Automatically selects the appropriate card variant based on:
 * - orientation: "vertical" (browsing) or "horizontal" (management/booking)
 * - variant: "featured", "search", "management", "booking", "compact"
 *
 * Sacred Geometry Features:
 * - Golden ratio proportions
 * - Hexagonal stats
 * - Seed of Life accents
 * - Vesica Piscis image overlays
 * - Golden frame hover effects
 */
export function VehicleCard({
  vehicle,
  orientation = "vertical",
  variant = "featured",
  className,
  linkHref,
  booking,
  isPast,
  renterName,
  showDealBanner = true,
  showFeatures = false,
  showGeometry = true,
  priority = false,
  onFavorite,
  isFavorited,
  onEdit,
  onManageAvailability,
  onMessage,
  onGetDirections,
  onCallSupport,
  onAccept,
  onDecline,
}: VehicleCardProps) {
  // Determine orientation based on variant if not explicitly set
  const effectiveOrientation =
    variant === "management" || variant === "booking" || variant === "provider-booking"
      ? "horizontal"
      : orientation;

  if (effectiveOrientation === "horizontal") {
    return (
      <VehicleCardHorizontal
        vehicle={vehicle}
        className={className}
        variant={variant === "booking" ? "booking" : variant === "provider-booking" ? "provider-booking" : "management"}
        booking={booking}
        isPast={isPast}
        renterName={renterName}
        showGeometry={showGeometry}
        onEdit={onEdit}
        onManageAvailability={onManageAvailability}
        onMessage={onMessage}
        onGetDirections={onGetDirections}
        onCallSupport={onCallSupport}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    );
  }

  return (
    <VehicleCardVertical
      vehicle={vehicle}
      className={className}
      linkHref={linkHref}
      showDealBanner={showDealBanner}
      showFeatures={showFeatures || variant === "search"}
      showGeometry={showGeometry}
      priority={priority}
      onFavorite={onFavorite}
      isFavorited={isFavorited}
    />
  );
}
