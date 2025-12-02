"use client";

import Image from "next/image";
import {
  Star,
  MapPin,
  Calendar,
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  MessageCircle,
  Phone,
  Navigation,
  Clock,
  Car,
  CheckCircle2,
  AlertCircle,
  User,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GoldenFrame, HexagonStat, SeedOfLifeAccent } from "../geometry";
import { VesicaOverlay } from "../geometry";
import type { VehicleCardHorizontalProps } from "./types";

/**
 * Horizontal Vehicle Card with Sacred Geometry Design
 *
 * Features:
 * - Golden ratio section divisions (38.2% | 38.2% | 23.6%)
 * - Vesica Piscis soft image edges
 * - Hexagonal stats display
 * - Seed of Life corner accent
 * - Used for provider management and booking views
 */
export function VehicleCardHorizontal({
  vehicle,
  className,
  variant = "management",
  booking,
  isPast = false,
  renterName,
  showGeometry = true,
  onEdit,
  onManageAvailability,
  onMessage,
  onGetDirections,
  onCallSupport,
  onAccept,
  onDecline,
}: VehicleCardHorizontalProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, {
      icon: typeof CheckCircle2;
      label: string;
      className?: string;
      variant?: "default" | "outline" | "destructive";
    }> = {
      confirmed: { icon: CheckCircle2, label: "Confirmed", className: "bg-green-500" },
      pending: { icon: Clock, label: "Pending", className: "bg-yellow-500" },
      active: { icon: Car, label: "Active", className: "bg-blue-500" },
      completed: { icon: CheckCircle2, label: "Completed", variant: "outline" },
      cancelled: { icon: AlertCircle, label: "Cancelled", variant: "destructive" },
    };

    const config = statusConfig[status];
    if (!config) return <Badge>{status}</Badge>;

    const Icon = config.icon;
    return (
      <Badge
        className={cn("gap-1", config.className)}
        variant={config.variant || "default"}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  // Management variant (provider vehicles page)
  if (variant === "management") {
    return (
      <GoldenFrame showOnHover={showGeometry} intensity="subtle">
        <Card className={cn("overflow-hidden group", className)}>
          <div className="flex flex-col sm:flex-row">
            {/* Image Section - Golden ratio minor (38.2%) */}
            <div className="sm:w-[38.2%] h-40 sm:h-auto relative flex-shrink-0 overflow-hidden">
              <Image
                src={vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Vesica overlay for soft edges */}
              {showGeometry && <VesicaOverlay position="edges" intensity="subtle" />}

              {/* Status Badge */}
              <Badge
                className="absolute top-2 left-2 bg-green-500/90 text-white border-0"
              >
                Active
              </Badge>

              {/* Seed of Life accent */}
              {showGeometry && (
                <div className="absolute bottom-2 left-2 text-white/60">
                  <SeedOfLifeAccent size={28} opacity={0.1} animate={false} />
                </div>
              )}
            </div>

            {/* Content Section */}
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    {vehicle.location}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Listing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(vehicle.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onManageAvailability?.(vehicle.id)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Manage Availability
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Listing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Hexagonal Stats Row */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <HexagonStat
                  icon={<Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                  value={vehicle.rating.toString()}
                />
                <HexagonStat
                  icon={<TrendingUp className="h-3.5 w-3.5 text-green-600" />}
                  value={`${vehicle.reviews} trips`}
                />
                <HexagonStat
                  icon={<DollarSign className="h-3.5 w-3.5 text-primary" />}
                  value={`$${vehicle.pricePerDay}/day`}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit?.(vehicle.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onManageAvailability?.(vehicle.id)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </div>

              {/* Golden divider line */}
              {showGeometry && (
                <div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"
                  style={{ width: "61.8%" }}
                />
              )}
            </CardContent>
          </div>
        </Card>
      </GoldenFrame>
    );
  }

  // Booking variant (trips/bookings pages)
  if (variant === "booking" && booking) {
    return (
      <GoldenFrame showOnHover={showGeometry} intensity="subtle">
        <Card className={cn("overflow-hidden group", className)}>
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-64 aspect-video md:aspect-auto md:h-auto flex-shrink-0 overflow-hidden">
              <Image
                src={vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {showGeometry && <VesicaOverlay position="edges" intensity="subtle" />}

              {/* Seed of Life accent */}
              {showGeometry && (
                <div className="absolute bottom-2 left-2 text-white/60">
                  <SeedOfLifeAccent size={28} opacity={0.1} animate={false} />
                </div>
              )}
            </div>

            {/* Trip Details */}
            <CardContent className="flex-1 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(booking.status)}
                  </div>

                  <h3 className="text-xl font-semibold mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {vehicle.location}
                  </div>

                  {/* Trip Dates with Vesica-inspired connection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="h-10 w-10 flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary"
                        style={{
                          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      >
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Pick-up</div>
                        <div className="font-medium">
                          {new Date(booking.startDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">10:00 AM</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="h-10 w-10 flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary"
                        style={{
                          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      >
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Return</div>
                        <div className="font-medium">
                          {new Date(booking.endDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">10:00 AM</div>
                      </div>
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={vehicle.host.avatar}
                      alt={vehicle.host.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium">{vehicle.host.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vehicle.host.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="lg:text-right space-y-4">
                  <div className="relative">
                    <div className="text-2xl font-bold">${booking.totalPrice}</div>
                    <div className="text-sm text-muted-foreground">Total</div>

                    {/* Subtle geometry accent */}
                    {showGeometry && (
                      <div className="absolute -top-2 -right-2 text-primary/20 pointer-events-none">
                        <SeedOfLifeAccent size={32} opacity={0.08} animate={false} />
                      </div>
                    )}
                  </div>

                  {!isPast && (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={onMessage}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Message Host
                      </Button>
                      {booking.status === "confirmed" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={onGetDirections}
                          >
                            <Navigation className="h-4 w-4" />
                            Get Directions
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={onCallSupport}
                          >
                            <Phone className="h-4 w-4" />
                            Call Support
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {isPast && booking.status === "completed" && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Star className="h-4 w-4" />
                      Leave Review
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </GoldenFrame>
    );
  }

  // Provider Booking variant (provider's view of bookings with Accept/Decline)
  if (variant === "provider-booking" && booking) {
    return (
      <GoldenFrame showOnHover={showGeometry} intensity="subtle">
        <Card className={cn("overflow-hidden group", className)}>
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative w-full lg:w-48 h-40 lg:h-auto shrink-0 overflow-hidden">
              <Image
                src={vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {showGeometry && <VesicaOverlay position="edges" intensity="subtle" />}

              {/* Seed of Life accent */}
              {showGeometry && (
                <div className="absolute bottom-2 left-2 text-white/60">
                  <SeedOfLifeAccent size={28} opacity={0.1} animate={false} />
                </div>
              )}
            </div>

            {/* Booking Details */}
            <CardContent className="flex-1 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  {/* Vehicle Info */}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {vehicle.location}
                    </div>
                  </div>

                  {/* Dates with hexagonal icons */}
                  <div className="flex items-center gap-2 text-sm">
                    <div
                      className="h-7 w-7 flex items-center justify-center shrink-0 bg-primary/10 text-primary"
                      style={{
                        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      }}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <span>
                      {new Date(booking.startDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(booking.endDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Renter Info */}
                  {renterName && (
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className="h-7 w-7 flex items-center justify-center shrink-0 bg-primary/10 text-primary"
                        style={{
                          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      >
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <span>{renterName}</span>
                    </div>
                  )}
                </div>

                {/* Price & Status */}
                <div className="text-right space-y-2 relative">
                  {getStatusBadge(booking.status)}
                  <div className="text-2xl font-bold">${booking.totalPrice}</div>
                  <div className="text-sm text-muted-foreground">
                    Your earnings: ${(booking.totalPrice * 0.8).toFixed(0)}
                  </div>

                  {/* Subtle geometry accent */}
                  {showGeometry && (
                    <div className="absolute -top-2 -right-2 text-primary/20 pointer-events-none">
                      <SeedOfLifeAccent size={32} opacity={0.08} animate={false} />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions based on status */}
              {booking.status === "pending" && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline" className="gap-1" onClick={onMessage}>
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <div className="flex-1" />
                  <Button size="sm" variant="outline" className="gap-1" onClick={onDecline}>
                    <X className="h-4 w-4" />
                    Decline
                  </Button>
                  <Button size="sm" className="gap-1" onClick={onAccept}>
                    <Check className="h-4 w-4" />
                    Accept
                  </Button>
                </div>
              )}

              {booking.status === "confirmed" && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline" className="gap-1" onClick={onMessage}>
                    <MessageCircle className="h-4 w-4" />
                    Message Guest
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="h-4 w-4" />
                    Call Guest
                  </Button>
                </div>
              )}

              {/* Golden divider line */}
              {showGeometry && (
                <div
                  className="absolute bottom-0 left-0 h-px bg-linear-to-r from-primary/20 via-primary/10 to-transparent"
                  style={{ width: "61.8%" }}
                />
              )}
            </CardContent>
          </div>
        </Card>
      </GoldenFrame>
    );
  }

  // Fallback
  return null;
}
