"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vehicles, customerBookings } from "@/lib/mock-data";
import {
  Search,
  Calendar,
  Car,
  MapPin,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Gauge,
  Fuel,
  Shield,
} from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();

  const upcomingTrips = customerBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );
  const pastTrips = customerBookings.filter((b) => b.status === "completed");

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready for your next adventure in the Midwest?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link href="/customer/search/">
          <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Find a Car</h3>
                <p className="text-sm text-muted-foreground">
                  Browse available vehicles
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/customer/trips/">
          <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">My Trips</h3>
                <p className="text-sm text-muted-foreground">
                  View upcoming & past trips
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/faq/">
          <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Car className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Get Help</h3>
                <p className="text-sm text-muted-foreground">
                  FAQs & support
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Upcoming Trips */}
      {upcomingTrips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Trips</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/customer/trips/">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingTrips.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={booking.vehicle.images[0]}
                      alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {booking.vehicle.year} {booking.vehicle.make}{" "}
                          {booking.vehicle.model}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {booking.vehicle.location}
                        </div>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-primary">
                      ${booking.totalPrice}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Featured Vehicles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Available Now</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer/search/">
              Browse all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vehicles.slice(0, 4).map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/customer/vehicle/?id=${vehicle.id}`}
            >
              <Card className="overflow-hidden cursor-pointer group h-full bg-white border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      {vehicle.instantBook && (
                        <Badge className="bg-primary text-white shadow-lg gap-1 px-2 py-0.5 text-xs">
                          <Zap className="h-3 w-3" />
                          Instant
                        </Badge>
                      )}
                    </div>
                    <button
                      className="h-7 w-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                  </div>

                  {/* Bottom Info on Image */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-bold text-white text-sm drop-shadow-lg">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1 text-white/90 text-xs">
                        <MapPin className="h-3 w-3" />
                        {vehicle.location}
                      </div>
                      <span className="text-white/60">•</span>
                      <div className="flex items-center gap-1 text-white/90 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vehicle.rating}
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-3">
                  {/* Quick Stats */}
                  <div className="flex items-center justify-between py-2 px-2.5 bg-gray-50 rounded-lg mb-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Gauge className="h-3 w-3" />
                      <span>{vehicle.mileageIncluded}mi</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1 text-gray-600">
                      <Fuel className="h-3 w-3" />
                      <span>{vehicle.fuelPolicy}</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1 text-green-600">
                      <Shield className="h-3 w-3" />
                      <span>Insured</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${vehicle.pricePerDay}
                      </span>
                      <span className="text-xs text-gray-500">/day</span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      ${vehicle.weeklyPrice}/day for 7+
                    </div>
                  </div>

                  {/* Deal Banner */}
                  <div className="relative overflow-hidden rounded-md bg-gradient-to-r from-green-500 to-emerald-600 p-2 text-white">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">
                        ${vehicle.discountedPrice}/day for 3+ days
                      </span>
                      <span className="bg-white/20 rounded-full px-2 py-0.5 font-bold">
                        SAVE ${(vehicle.pricePerDay - vehicle.discountedPrice) * 3}+
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {pastTrips.length}
            </div>
            <div className="text-sm text-muted-foreground">Completed Trips</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {upcomingTrips.length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Trips</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              $
              {pastTrips.reduce((sum, trip) => sum + trip.totalPrice, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">4.9</div>
            <div className="text-sm text-muted-foreground">Your Rating</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
