"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  Key,
  Car,
  Shield,
  Camera,
  DollarSign,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const renterSteps = [
  {
    icon: Search,
    title: "Find Your Perfect Car",
    description:
      "Browse hundreds of vehicles in your area. Filter by type, features, price, and more to find exactly what you need.",
  },
  {
    icon: Calendar,
    title: "Book Instantly",
    description:
      "Many vehicles offer instant booking. Select your dates, review the transparent pricing, and confirm in seconds.",
  },
  {
    icon: Key,
    title: "Pick Up & Go",
    description:
      "Meet your host or use contactless pickup. Complete a quick vehicle inspection and you're ready to drive.",
  },
  {
    icon: Star,
    title: "Drive & Return",
    description:
      "Enjoy your trip! Return the car at the agreed time and location. Leave a review to help the community.",
  },
];

const hostSteps = [
  {
    icon: Camera,
    title: "List Your Vehicle",
    description:
      "Add photos, set your price, and describe your car. Our easy listing process takes just minutes.",
  },
  {
    icon: Shield,
    title: "Get Protected",
    description:
      "We verify all guests and provide comprehensive insurance. Your car is protected on every trip.",
  },
  {
    icon: Calendar,
    title: "Accept Bookings",
    description:
      "Get notified of booking requests. Accept or decline based on your schedule. Use instant booking for automatic approvals.",
  },
  {
    icon: DollarSign,
    title: "Earn Money",
    description:
      "Get paid directly to your account after each trip. Most hosts earn $500-$1,500+ per month per vehicle.",
  },
];

const benefits = [
  "Transparent pricing with no hidden fees",
  "24/7 roadside assistance included",
  "Liability insurance on every trip",
  "Verified hosts and guests",
  "Midwest-based customer support",
  "Quick pickup guarantee",
  "Flexible cancellation policies",
  "Wide vehicle selection",
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              How Fast Quick Whipz Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Whether you&apos;re looking to rent a car or share yours, we&apos;ve made the
              process simple, safe, and transparent.
            </motion.p>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="renter" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-12 h-auto p-1.5 gap-1">
                <TabsTrigger
                  value="renter"
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-sm sm:text-base py-3 sm:py-4 px-3 sm:px-6 data-[state=active]:shadow-md"
                >
                  <Car className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span>I Want to Rent</span>
                </TabsTrigger>
                <TabsTrigger
                  value="host"
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-sm sm:text-base py-3 sm:py-4 px-3 sm:px-6 data-[state=active]:shadow-md"
                >
                  <DollarSign className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span>I Want to Host</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="renter">
                <div className="grid gap-8 md:gap-12">
                  {renterSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 items-start"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-primary">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Button size="lg" asChild>
                    <Link href="/customer/search/">
                      Find a Car Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="host">
                <div className="grid gap-8 md:gap-12">
                  {hostSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 items-start"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-primary">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Button size="lg" asChild>
                    <Link href="/login/?type=provider">
                      Start Hosting Today
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What&apos;s Included
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every rental on Fast Quick Whipz comes with these benefits at no
                extra cost.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
