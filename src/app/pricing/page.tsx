"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const pricingItems = [
  {
    title: "Trip Price",
    description: "The daily rate set by the host. This is the base cost of your rental.",
    included: true,
  },
  {
    title: "Service Fee",
    description: "10% fee that supports platform operations, customer service, and improvements.",
    included: true,
  },
  {
    title: "Liability Insurance",
    description: "Basic liability coverage that meets or exceeds state minimum requirements.",
    included: true,
  },
  {
    title: "24/7 Roadside Assistance",
    description: "Flat tire? Dead battery? We've got you covered around the clock.",
    included: true,
  },
  {
    title: "Trip Protection",
    description: "Optional comprehensive coverage for damage to the vehicle. Reduces your liability.",
    included: false,
    optional: true,
  },
  {
    title: "Additional Driver",
    description: "Add another verified driver to your trip for $10/day.",
    included: false,
    optional: true,
  },
];

const protectionPlans = [
  {
    name: "Basic",
    price: "Included",
    description: "Standard liability coverage",
    features: [
      "State minimum liability coverage",
      "24/7 roadside assistance",
      "Emergency support line",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    price: "$15/day",
    description: "Reduced liability",
    features: [
      "Everything in Basic",
      "$2,500 damage liability cap",
      "Theft protection included",
      "Windshield coverage",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "$25/day",
    description: "Maximum protection",
    features: [
      "Everything in Standard",
      "$0 liability (zero worry)",
      "Personal belongings coverage",
      "Lost key replacement",
      "Priority support",
    ],
    highlight: false,
  },
];

const hostEarnings = [
  { price: "$50/day", weekly: "~$175", monthly: "~$750" },
  { price: "$75/day", weekly: "~$260", monthly: "~$1,125" },
  { price: "$100/day", weekly: "~$350", monthly: "~$1,500" },
  { price: "$150/day", weekly: "~$525", monthly: "~$2,250" },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <DollarSign className="w-4 h-4" />
              Transparent Pricing Promise
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Clear Pricing, No Surprises
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              We show you exactly what you&apos;ll pay before you book. The price you
              see is the price you pay—always.
            </motion.p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                What&apos;s in Every Rental
              </h2>
              <div className="space-y-4">
                {pricingItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border/50"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {item.included ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.optional && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Protection Plans */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <Shield className="w-8 h-8 inline-block mr-2 text-primary" />
                Protection Plans
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the level of coverage that gives you peace of mind. All
                plans can be selected during checkout.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {protectionPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full ${
                      plan.highlight
                        ? "border-primary shadow-lg ring-1 ring-primary"
                        : ""
                    }`}
                  >
                    {plan.highlight && (
                      <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{plan.name}</span>
                        <span className="text-primary">{plan.price}</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Host Earnings */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Host Earnings</h2>
                <p className="text-muted-foreground">
                  See what you could earn sharing your car on Fast Quick Whipz.
                  Hosts keep 85% of the trip price.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">
                        Daily Rate
                      </th>
                      <th className="text-left py-4 px-4 font-semibold">
                        Weekly Earnings*
                      </th>
                      <th className="text-left py-4 px-4 font-semibold">
                        Monthly Earnings*
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostEarnings.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-4 px-4 font-medium">{row.price}</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {row.weekly}
                        </td>
                        <td className="py-4 px-4 text-primary font-medium">
                          {row.monthly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                *Estimates based on average booking frequency of 50% (15 days/month).
                Actual earnings may vary.
              </p>
              <div className="text-center mt-8">
                <Button asChild>
                  <Link href="/login/?type=provider">Start Hosting Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
