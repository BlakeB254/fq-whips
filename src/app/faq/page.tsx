"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/mock-data";
import { HelpCircle, MessageCircle } from "lucide-react";

// Additional FAQ categories
const categorizedFaqs = {
  general: [
    ...faqs.slice(0, 2),
    {
      question: "When will Fast Quick Whipz expand beyond the Midwest?",
      answer: "We're focused on perfecting our service in the Midwest during our beta phase. Once we've achieved consistent 5-star experiences and refined our operations, we plan to expand to additional regions. Stay tuned for announcements!",
    },
  ],
  booking: [
    faqs[2],
    faqs[6],
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24-48 hours in advance for the best selection. However, many vehicles are available for same-day booking, especially with Instant Book hosts.",
    },
    {
      question: "Can I extend my rental?",
      answer: "Yes! You can request an extension through the app, subject to the vehicle's availability. Extensions are priced at the same daily rate as your original booking.",
    },
  ],
  safety: [
    faqs[3],
    faqs[5],
    faqs[7],
    {
      question: "What happens if the car breaks down?",
      answer: "Every rental includes 24/7 roadside assistance. Call our emergency line and we'll send help immediately—towing, tire changes, jump starts, and lockouts are all covered at no additional cost.",
    },
  ],
  hosting: [
    faqs[4],
    {
      question: "What vehicles can I list?",
      answer: "Most vehicles 2010 or newer with fewer than 130,000 miles can be listed. The car must pass our safety inspection, have valid registration and insurance, and be in good condition. We accept all types: sedans, SUVs, trucks, luxury vehicles, and electric cars.",
    },
    {
      question: "How do I get paid?",
      answer: "Payments are processed within 3 business days after each completed trip and deposited directly to your bank account. You can track all your earnings in the Host Dashboard.",
    },
  ],
};

export default function FAQPage() {
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
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <HelpCircle className="w-4 h-4" />
              Help Center
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Find answers to common questions about renting and hosting on Fast
              Quick Whipz.
            </motion.p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* General */}
              <div>
                <h2 className="text-2xl font-bold mb-6">General</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {categorizedFaqs.general.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`general-${index}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Booking */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Booking & Trips</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {categorizedFaqs.booking.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`booking-${index}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Safety */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Safety & Insurance</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {categorizedFaqs.safety.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`safety-${index}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Hosting */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Hosting</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {categorizedFaqs.hosting.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`hosting-${index}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our Midwest-based support team is here to help. We typically
              respond within an hour during business hours.
            </p>
            <Button asChild>
              <Link href="/contact/">Contact Support</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
