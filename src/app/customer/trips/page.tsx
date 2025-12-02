"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customerBookings } from "@/lib/mock-data";
import { VehicleCard } from "@/components/cards";
import { Calendar, Clock, Car } from "lucide-react";

function EmptyState({ type }: { type: "upcoming" | "past" }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-semibold mb-2">
          No {type === "upcoming" ? "upcoming" : "past"} trips
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {type === "upcoming"
            ? "Ready to hit the road? Find your next adventure!"
            : "Your completed trips will appear here."}
        </p>
        {type === "upcoming" && (
          <Button asChild>
            <Link href="/customer/search/">Find a Car</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingTrips = customerBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending" || b.status === "active"
  );
  const pastTrips = customerBookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">My Trips</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past rentals
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming
            {upcomingTrips.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {upcomingTrips.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <Clock className="h-4 w-4" />
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.0618 * index }}
              >
                <VehicleCard
                  vehicle={booking.vehicle}
                  variant="booking"
                  booking={booking}
                  isPast={false}
                  showGeometry={true}
                  onMessage={() => console.log("Message host")}
                  onGetDirections={() => console.log("Get directions")}
                  onCallSupport={() => console.log("Call support")}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState type="upcoming" />
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTrips.length > 0 ? (
            pastTrips.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.0618 * index }}
              >
                <VehicleCard
                  vehicle={booking.vehicle}
                  variant="booking"
                  booking={booking}
                  isPast={true}
                  showGeometry={true}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState type="past" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
