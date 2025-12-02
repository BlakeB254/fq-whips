"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/cards";
import { vehicles } from "@/lib/mock-data";

export function VehicleShowcase() {
  const featuredVehicles = vehicles.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary uppercase tracking-wider"
            >
              Featured Vehicles
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mt-3"
            >
              Popular Picks in the Midwest
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground mt-2"
            >
              Sign in to book any of these amazing vehicles
            </motion.p>
          </div>
          <Button asChild>
            <Link href="/login/?type=customer">Sign In to Browse All</Link>
          </Button>
        </div>

        {/* Vehicle Grid - Sacred Geometry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.0618 }} // Fibonacci timing
            >
              <VehicleCard
                vehicle={vehicle}
                variant="featured"
                linkHref="/login/?type=customer"
                showDealBanner={true}
                showGeometry={true}
                priority={index < 4}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Ready to hit the road? Create an account to book your perfect ride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login/?type=customer">Sign In to Book</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login/?type=provider">List Your Car</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
