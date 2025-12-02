"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { vehicles, MIDWEST_LOCATIONS } from "@/lib/mock-data";
import { VehicleCard } from "@/components/cards";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Car,
} from "lucide-react";

interface FilterContentProps {
  location: string;
  setLocation: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  setSearchQuery: (value: string) => void;
}

function FilterContent({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  setSearchQuery,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {MIDWEST_LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price per day</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setLocation("");
          setPriceRange([0, 100]);
          setSearchQuery("");
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Filter by location
    if (location && location !== "all") {
      filtered = filtered.filter((v) => v.location === location);
    }

    // Filter by price range
    filtered = filtered.filter(
      (v) => v.pricePerDay >= priceRange[0] && v.pricePerDay <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.make.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended - instant book first, then by rating
        filtered.sort((a, b) => {
          if (a.instantBook && !b.instantBook) return -1;
          if (!a.instantBook && b.instantBook) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [location, priceRange, sortBy, searchQuery]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Find Your Ride</h1>
        <p className="text-muted-foreground">
          Browse {vehicles.length} vehicles across the Midwest
        </p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by make, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent
                location={location}
                setLocation={setLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-64 flex-shrink-0"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              <FilterContent
                location={location}
                setLocation={setLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setSearchQuery={setSearchQuery}
              />
            </CardContent>
          </Card>
        </motion.aside>

        {/* Vehicle Grid - Sacred Geometry Cards */}
        <div className="flex-1">
          {filteredVehicles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No vehicles found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLocation("");
                    setPriceRange([0, 100]);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredVehicles.length} vehicle
                {filteredVehicles.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.0618 * index }} // Fibonacci timing
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      variant="search"
                      linkHref={`/customer/vehicle/?id=${vehicle.id}`}
                      showDealBanner={true}
                      showFeatures={true}
                      showGeometry={true}
                      priority={index < 3}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
