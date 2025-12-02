"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vehicles, providerBookings } from "@/lib/mock-data";
import {
  DollarSign,
  Car,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Eye,
  Plus,
} from "lucide-react";

export default function ProviderDashboard() {
  const { user } = useAuth();

  // Filter provider's vehicles (in real app, this would be filtered by owner)
  const myVehicles = vehicles.slice(0, 4);
  const pendingBookings = providerBookings.filter(
    (b) => b.status === "pending"
  );
  const activeBookings = providerBookings.filter(
    (b) => b.status === "confirmed"
  );
  const completedBookings = providerBookings.filter(
    (b) => b.status === "completed"
  );

  // Calculate earnings
  const totalEarnings = completedBookings.reduce(
    (sum, b) => sum + b.totalPrice * 0.8,
    0
  );
  const monthlyEarnings = totalEarnings * 0.4; // Mock monthly portion

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
          Here&apos;s how your vehicles are performing
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  ${monthlyEarnings.toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold">{myVehicles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">4.9</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link href="/provider/vehicles/">
          <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Vehicle</h3>
                <p className="text-sm text-muted-foreground">
                  List another car to earn more
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/provider/bookings/">
          <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">View Bookings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your upcoming rentals
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Pending Bookings */}
      {pendingBookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/provider/bookings/">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={booking.vehicle.images[0]}
                          alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {booking.vehicle.year} {booking.vehicle.make}{" "}
                          {booking.vehicle.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Guest: {booking.renter}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ${booking.totalPrice}
                        </p>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* My Vehicles Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Vehicles</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/provider/vehicles/">
              Manage <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-32 h-28 relative flex-shrink-0">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.location}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vehicle.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{vehicle.reviews} trips</span>
                    </div>
                    <div className="ml-auto font-semibold">
                      ${vehicle.pricePerDay}/day
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Earnings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Earnings Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-primary">
                  ${totalEarnings.toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  ${monthlyEarnings.toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Trips</p>
                <p className="text-2xl font-bold">{completedBookings.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Trips</p>
                <p className="text-2xl font-bold">{activeBookings.length}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <Button asChild>
                <Link href="/provider/earnings/">
                  View Detailed Earnings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
