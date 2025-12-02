"use client";

import { motion } from "framer-motion";
import { Shield, DollarSign, Clock, MapPin, Headphones, Star } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, ever. The price you see is the price you pay. We show all costs upfront including insurance and fees.",
  },
  {
    icon: Shield,
    title: "Full Protection",
    description:
      "Every rental includes liability insurance and 24/7 roadside assistance. Optional upgrades available for extra peace of mind.",
  },
  {
    icon: Clock,
    title: "Quick Pickup",
    description:
      "Our Quick Pickup Guarantee gets you on the road in 15 minutes or less. Contactless options available.",
  },
  {
    icon: MapPin,
    title: "Midwest Focus",
    description:
      "We know the Midwest. Local hosts, regional support, and vehicles ready for any weather conditions.",
  },
  {
    icon: Headphones,
    title: "24/7 Local Support",
    description:
      "Real people, real help, anytime. Our Midwest-based team is just a call away when you need us.",
  },
  {
    icon: Star,
    title: "Verified Community",
    description:
      "All hosts and guests are verified. Read real reviews and book with confidence from our trusted community.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
          >
            Built Different for the Midwest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            We listened to what other platforms got wrong and built something better.
            Transparent, reliable, and focused on what matters most.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
