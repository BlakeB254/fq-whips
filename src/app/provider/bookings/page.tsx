"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { providerBookings } from "@/lib/mock-data";
import { VehicleCard } from "@/components/cards";
import { Calendar, Check, Clock } from "lucide-react";

export default function ProviderBookingsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingBookings = providerBookings.filter((b) => b.status === "pending");
  const confirmedBookings = providerBookings.filter(
    (b) => b.status === "confirmed"
  );
  const completedBookings = providerBookings.filter(
    (b) => b.status === "completed"
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your rental requests and trips
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {pendingBookings.length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {confirmedBookings.length}
            </div>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{completedBookings.length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pending" className="flex-1 sm:flex-none">
              Pending ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="flex-1 sm:flex-none">
              Confirmed ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 sm:flex-none">
              Completed ({completedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No pending requests</h3>
                  <p className="text-sm text-muted-foreground">
                    New booking requests will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.0618 * index }}
                >
                  <VehicleCard
                    vehicle={booking.vehicle}
                    variant="provider-booking"
                    booking={booking}
                    renterName={booking.renter}
                    showGeometry={true}
                    onMessage={() => console.log("Message renter")}
                    onAccept={() => console.log("Accept booking", booking.id)}
                    onDecline={() => console.log("Decline booking", booking.id)}
                  />
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6 space-y-4">
            {confirmedBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No confirmed bookings</h3>
                  <p className="text-sm text-muted-foreground">
                    Confirmed bookings will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              confirmedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.0618 * index }}
                >
                  <VehicleCard
                    vehicle={booking.vehicle}
                    variant="provider-booking"
                    booking={booking}
                    renterName={booking.renter}
                    showGeometry={true}
                    onMessage={() => console.log("Message guest")}
                  />
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {completedBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Check className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No completed trips</h3>
                  <p className="text-sm text-muted-foreground">
                    Your trip history will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.0618 * index }}
                >
                  <VehicleCard
                    vehicle={booking.vehicle}
                    variant="provider-booking"
                    booking={booking}
                    renterName={booking.renter}
                    isPast={true}
                    showGeometry={true}
                  />
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
