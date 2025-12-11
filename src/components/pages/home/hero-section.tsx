"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-linear-to-r from-primary/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-linear-to-l from-accent/10 to-transparent blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Book Your Next
              <span className="gradient-text block">
                Experience at Lightning Speed
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Secure, seamless, and instant ticketing for concerts, movies, and
              events. Get access to premium experiences in seconds.
            </p>
          </div>

          {/* Search Bar */}
          {/* <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto glass rounded-full p-2 sm:p-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search events by name or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted/50 transition-colors">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground hidden sm:inline">Location</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted/50 transition-colors">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground hidden sm:inline">Date</span>
            </button>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              asChild
              className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer"
            >
              <Link href="/events">Explore Events</Link>
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-primary/30 hover:bg-primary/10 text-foreground bg-transparent"
            >
              Create Event
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
