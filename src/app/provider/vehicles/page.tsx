"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { vehicles } from "@/lib/mock-data";
import { VehicleCard } from "@/components/cards";
import { Plus, Search } from "lucide-react";

export default function ProviderVehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock provider's vehicles (first 4 from data)
  const myVehicles = vehicles.slice(0, 4);

  const filteredVehicles = myVehicles.filter((v) => {
    const query = searchQuery.toLowerCase();
    return (
      v.make.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">My Vehicles</h1>
          <p className="text-muted-foreground mt-1">
            Manage your {myVehicles.length} listed vehicles
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                This is a demo. In the full version, you&apos;ll be able to list
                your vehicle here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Adding a vehicle involves:
              </p>
              <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                <li>Vehicle details (make, model, year)</li>
                <li>Photos of your vehicle</li>
                <li>Pricing and availability</li>
                <li>Pickup location</li>
                <li>Vehicle features and rules</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => setShowAddDialog(false)}
              >
                Got it!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Vehicles Grid - Sacred Geometry Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.0618 * index }} // Fibonacci timing
          >
            <VehicleCard
              vehicle={vehicle}
              variant="management"
              showGeometry={true}
              onEdit={(id) => console.log("Edit vehicle:", id)}
              onManageAvailability={(id) => console.log("Manage availability:", id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No vehicles found</h3>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
