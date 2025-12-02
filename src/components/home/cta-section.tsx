"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Car, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Hit the Road?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of happy customers and hosts across the Midwest.
            Start your journey today with Fast Quick Whipz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 h-14"
              asChild
            >
              <Link href="/customer/search/">
                <Car className="w-5 h-5 mr-2" />
                Find a Car
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 h-14 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/login/?type=provider">
                <Users className="w-5 h-5 mr-2" />
                Become a Host
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-12 border-t border-primary-foreground/20"
          >
            <p className="text-sm text-primary-foreground/60 mb-4">
              Trusted by hosts and renters across
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-primary-foreground/80">
              <span>Illinois</span>
              <span>Michigan</span>
              <span>Wisconsin</span>
              <span>Minnesota</span>
              <span>Indiana</span>
              <span>Ohio</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
