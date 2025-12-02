"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { vehicles } from "@/lib/mock-data";
import {
  ArrowLeft,
  MapPin,
  Star,
  Zap,
  Calendar,
  Shield,
  Clock,
  CheckCircle2,
  MessageCircle,
  Share2,
  Heart,
  Car,
  Fuel,
  Gauge,
  Users,
  Sparkles,
  TrendingDown,
  Gift,
  BadgeCheck,
  ChevronRight,
  Phone,
} from "lucide-react";

function VehicleDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get("id");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [tripDays, setTripDays] = useState(3);
  const [isLiked, setIsLiked] = useState(false);

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  // Calculate pricing based on trip length
  const pricing = useMemo(() => {
    if (!vehicle) return null;

    let dailyRate = vehicle.pricePerDay;
    let discount = 0;
    let discountLabel = "";

    if (tripDays >= 7) {
      dailyRate = vehicle.weeklyPrice;
      discount = Math.round(((vehicle.pricePerDay - vehicle.weeklyPrice) / vehicle.pricePerDay) * 100);
      discountLabel = "Weekly discount applied!";
    } else if (tripDays >= 3) {
      dailyRate = vehicle.discountedPrice;
      discount = Math.round(((vehicle.pricePerDay - vehicle.discountedPrice) / vehicle.pricePerDay) * 100);
      discountLabel = "3+ day discount applied!";
    }

    const subtotal = dailyRate * tripDays;
    const serviceFee = 15;
    const insurance = 25;
    const total = subtotal + serviceFee + insurance;
    const originalTotal = vehicle.pricePerDay * tripDays + serviceFee + insurance;
    const savings = originalTotal - total;

    return { dailyRate, discount, discountLabel, subtotal, serviceFee, insurance, total, savings };
  }, [vehicle, tripDays]);

  if (!vehicle) {
    return (
      <div className="p-6 lg:p-8">
        <Card>
          <CardContent className="p-12 text-center">
            <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Vehicle not found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This vehicle may no longer be available
            </p>
            <Button asChild>
              <Link href="/customer/search/">Browse Vehicles</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      router.push("/customer/trips/");
    }, 2000);
  };

  return (
    <div className="pb-32 lg:pb-8">
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] lg:h-[50vh] bg-black"
      >
        <Image
          src={vehicle.images[selectedImage]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full ${isLiked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/90 hover:bg-white'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-16 left-4 flex flex-col gap-2">
          {vehicle.instantBook && (
            <Badge className="gap-1 bg-primary text-primary-foreground shadow-lg">
              <Zap className="h-3 w-3" />
              Instant Book
            </Badge>
          )}
          <Badge className="gap-1 bg-green-500 text-white shadow-lg">
            <Sparkles className="h-3 w-3" />
            Top Rated
          </Badge>
        </div>

        {/* Vehicle Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold drop-shadow-lg">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {vehicle.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{vehicle.rating}</span>
                <span className="opacity-80">({vehicle.reviews} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image Thumbnails */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            {vehicle.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-white scale-110"
                    : "border-white/50 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-6 relative z-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Gauge className="h-6 w-6 mx-auto text-primary mb-1" />
                      <p className="text-sm font-medium">{vehicle.mileageIncluded} mi/day</p>
                      <p className="text-xs text-muted-foreground">Included</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Fuel className="h-6 w-6 mx-auto text-primary mb-1" />
                      <p className="text-sm font-medium capitalize">{vehicle.fuelPolicy.replace('-', ' to ')}</p>
                      <p className="text-xs text-muted-foreground">Fuel Policy</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="h-6 w-6 mx-auto text-primary mb-1" />
                      <p className="text-sm font-medium">5 Seats</p>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Car className="h-6 w-6 mx-auto text-primary mb-1" />
                      <p className="text-sm font-medium capitalize">{vehicle.type}</p>
                      <p className="text-xs text-muted-foreground">Type</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Description & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3">About this {vehicle.make}</h2>
                    <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
                  </div>

                  <Separator className="my-6" />

                  {/* Features Grid */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {vehicle.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                          <span className="text-sm font-medium text-green-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Host Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={vehicle.host.avatar}
                          alt={vehicle.host.name}
                        />
                        <AvatarFallback className="text-xl">
                          {vehicle.host.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {vehicle.host.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                          <BadgeCheck className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-bold">{vehicle.host.name}</h3>
                        {vehicle.host.verified && (
                          <Badge variant="secondary" className="gap-1 bg-white">
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                            Verified Host
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-1">
                        Member since {vehicle.host.joinedYear}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-bold">{vehicle.host.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">{vehicle.host.trips}</p>
                          <p className="text-xs text-muted-foreground">Trips</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">{vehicle.host.responseRate}%</p>
                          <p className="text-xs text-muted-foreground">Response</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Usually responds {vehicle.host.responseTime}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      {vehicle.rating} • {vehicle.reviews} Reviews
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      See all <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sample reviews */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">John D.</p>
                        <p className="text-xs text-muted-foreground">November 2024</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &quot;Amazing car! Super clean and drove perfectly. The host was very responsive and made pickup a breeze. Would definitely rent again!&quot;
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">Sarah M.</p>
                        <p className="text-xs text-muted-foreground">October 2024</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &quot;Great experience from start to finish. The car was exactly as described and perfect for our weekend trip. Highly recommend!&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6"
            >
              <Card className="shadow-xl border-2">
                <CardContent className="p-6">
                  {/* Price Header */}
                  <div className="text-center mb-4">
                    {pricing && pricing.discount > 0 && (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg text-muted-foreground line-through">
                          ${vehicle.pricePerDay}
                        </span>
                        <Badge className="bg-green-500 text-white">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {pricing.discount}% OFF
                        </Badge>
                      </div>
                    )}
                    <div className="text-4xl font-bold text-primary">
                      ${pricing?.dailyRate}
                      <span className="text-lg font-normal text-muted-foreground">
                        /day
                      </span>
                    </div>
                    {pricing && pricing.discount > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        <Gift className="h-4 w-4 inline mr-1" />
                        {pricing.discountLabel}
                      </p>
                    )}
                  </div>

                  {/* Discount Tiers */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="font-semibold text-green-800 mb-2">🎉 Multi-Day Discounts</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-green-700">
                        <span>3+ days:</span>
                        <span className="font-semibold">${vehicle.discountedPrice}/day</span>
                      </div>
                      <div className="flex justify-between text-green-700">
                        <span>7+ days:</span>
                        <span className="font-semibold">${vehicle.weeklyPrice}/day</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Trip Length Selector */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold mb-3 block">Select Trip Length</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 3, 5, 7].map((days) => (
                        <button
                          key={days}
                          onClick={() => setTripDays(days)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            tripDays === days
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-muted hover:border-primary/50"
                          }`}
                        >
                          <p className="font-bold">{days}</p>
                          <p className="text-xs text-muted-foreground">day{days > 1 ? 's' : ''}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Demo Trip Dates */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pickup</p>
                        <p className="font-medium">Dec 15, 2024 • 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Return</p>
                        <p className="font-medium">Dec {15 + tripDays}, 2024 • 10:00 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {pricing && (
                    <div className="space-y-2 mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${pricing.dailyRate} × {tripDays} days
                        </span>
                        <span>${pricing.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service fee</span>
                        <span>${pricing.serviceFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Insurance</span>
                        <span>${pricing.insurance}</span>
                      </div>
                      {pricing.savings > 0 && (
                        <div className="flex justify-between text-sm text-green-600 font-medium">
                          <span>You save</span>
                          <span>-${pricing.savings}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${pricing.total}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <AnimatePresence mode="wait">
                    {isBooked ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10 }}
                        >
                          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-3" />
                        </motion.div>
                        <p className="text-xl font-bold text-green-600">
                          Booking Confirmed!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Redirecting to your trips...
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Button
                          className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                          size="lg"
                          onClick={handleBook}
                        >
                          {vehicle.instantBook ? (
                            <>
                              <Zap className="h-5 w-5 mr-2" />
                              Book Instantly
                            </>
                          ) : (
                            "Request to Book"
                          )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          Free cancellation up to 24 hours before pickup
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Shield className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Insurance Included</p>
                        <p className="text-xs text-muted-foreground">
                          Liability coverage meets state minimums
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <BadgeCheck className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Verified Host</p>
                        <p className="text-xs text-muted-foreground">
                          Background checked & ID verified
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-2xl p-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {pricing && pricing.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${vehicle.pricePerDay}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ${pricing?.dailyRate}
              </span>
              <span className="text-sm text-muted-foreground">/day</span>
            </div>
            {pricing && pricing.discount > 0 && (
              <p className="text-xs text-green-600 font-medium">
                {pricing.discount}% off for 3+ days
              </p>
            )}
          </div>
          <AnimatePresence mode="wait">
            {isBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-green-600"
              >
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-semibold">Booked!</span>
              </motion.div>
            ) : (
              <Button size="lg" className="px-8" onClick={handleBook}>
                {vehicle.instantBook ? (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Book Now
                  </>
                ) : (
                  "Request"
                )}
              </Button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function VehicleDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <div className="h-[40vh] bg-muted animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-muted rounded-lg animate-pulse" />
                <div className="h-64 bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-muted rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <VehicleDetailContent />
    </Suspense>
  );
}
