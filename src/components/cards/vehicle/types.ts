import type { Vehicle, Booking } from "@/lib/mock-data";

export interface VehicleCardBaseProps {
  vehicle: Vehicle;
  className?: string;
  showGeometry?: boolean;
  priority?: boolean;
}

export interface VehicleCardVerticalProps extends VehicleCardBaseProps {
  linkHref?: string;
  showDealBanner?: boolean;
  showFeatures?: boolean;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export interface VehicleCardHorizontalProps extends VehicleCardBaseProps {
  variant?: "management" | "booking" | "provider-booking";
  booking?: Booking;
  isPast?: boolean;
  renterName?: string;
  onEdit?: (id: string) => void;
  onManageAvailability?: (id: string) => void;
  onMessage?: () => void;
  onGetDirections?: () => void;
  onCallSupport?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
  orientation?: "vertical" | "horizontal";
  variant?: "featured" | "search" | "management" | "booking" | "provider-booking" | "compact";
  className?: string;
  linkHref?: string;
  booking?: Booking;
  isPast?: boolean;
  renterName?: string;
  showDealBanner?: boolean;
  showFeatures?: boolean;
  showGeometry?: boolean;
  priority?: boolean;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onEdit?: (id: string) => void;
  onManageAvailability?: (id: string) => void;
  onMessage?: () => void;
  onGetDirections?: () => void;
  onCallSupport?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
}
