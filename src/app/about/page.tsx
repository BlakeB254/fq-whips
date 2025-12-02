"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Users, Award, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Transparency First",
    description:
      "We believe you deserve to know exactly what you're paying. No hidden fees, no surprises—ever.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We're building a community of trusted hosts and guests who treat each other's vehicles with respect.",
  },
  {
    icon: MapPin,
    title: "Locally Focused",
    description:
      "We know the Midwest. Our team is based here, and we understand what our community needs.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Every vehicle is verified, every user is vetted, and every trip is protected by comprehensive coverage.",
  },
];

const stats = [
  { value: "6", label: "States Served" },
  { value: "500+", label: "Vehicles" },
  { value: "10,000+", label: "Trips Completed" },
  { value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6"
              >
                <MapPin className="w-4 h-4" />
                Proudly Midwest Born & Based
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              >
                Built by the Midwest,
                <br />
                For the Midwest
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-primary-foreground/80 mb-8"
              >
                We started Fast Quick Whipz because we saw what was broken in car
                sharing—hidden fees, unreliable support, and one-size-fits-all
                approaches that didn&apos;t work for our region. We knew we could do
                better.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Why We&apos;re Starting in the Midwest
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    The Midwest is our home. We understand the unique challenges
                    of renting cars here—from harsh winters to sprawling
                    distances between cities. That&apos;s why we&apos;re focusing on
                    getting it right in our region before expanding nationally.
                  </p>
                  <p>
                    During our beta phase, we&apos;re perfecting every aspect of the
                    experience: ensuring vehicles are winter-ready, building
                    relationships with reliable hosts, and providing the kind of
                    personalized support that only a local team can offer.
                  </p>
                  <p>
                    Our goal isn&apos;t to be the biggest—it&apos;s to be the best.
                    When you rent through Fast Quick Whipz, you&apos;re supporting
                    local hosts and a company that genuinely cares about your
                    experience.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
                    alt="Chicago skyline"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
                    alt="Midwest highway"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These aren&apos;t just words on a wall—they&apos;re the principles that
                guide every decision we make.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re looking to rent a car or share yours, we&apos;d love to
              have you as part of the Fast Quick Whipz family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/customer/search/">
                  Start Renting
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/login/?type=provider">Become a Host</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
