"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MIDWEST_LOCATIONS } from "@/lib/mock-data";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      // Always keep video muted
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, video will show first frame
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] max-h-[1000px] w-full overflow-hidden">
      {/* Video Background - object-position adjusted for mobile/desktop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center sm:object-bottom"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/logo.png"
      >
        <source src="/videos/promo.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Mobile Logo Overlay - semi-transparent, visible on mobile only */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none sm:hidden z-[5]">
        <div className="relative w-64 h-64 opacity-20">
          <Image
            src="/images/logo.png"
            alt="Fast Quick Whipz"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Video Play/Pause Control - no sound controls */}
      <div className="absolute bottom-6 right-6 z-20">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Now available in the Midwest
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Drive Your Way
            <span className="block text-white/90">In the Midwest</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Rent unique cars from local hosts. Transparent pricing, 24/7 support,
            and the freedom to explore on your terms.
          </p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select location</option>
                  {MIDWEST_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range (simplified for demo) */}
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pick-up - Return dates"
                  className="h-12 pl-10 text-foreground"
                  readOnly
                />
              </div>

              {/* Search Button */}
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/customer/search/">
                  <Search className="h-5 w-5 mr-2" />
                  Search Cars
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-10 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-white/60">Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">6</div>
              <div className="text-white/60">States</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-white/60">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-white/60">Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
