import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, Ticket } from "lucide-react"; // Star icon added
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative w-full h-full overflow-hidden py-20 lg:py-32 min-h-[80vh]">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Text Content (Simplified Language) */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary w-fit mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-ping"></span>
              Your Ticket to Happiness
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
                Every Seat Tells <br />
                <span className="text-transparent gradient-text animate-gradient-x">
                  A New Story
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Velotix isn&apos;t just a platform; it&apos;s the beginning of
                your next adventure. Secure your spot at concerts, movies, and
                events instantly—no waiting, no worries.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 rounded-full hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/events" className="flex items-center">Find Your Event <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50"
              >
                How It Works
              </Button> */}
            </div>
          </div>

          {/* Right: Visual (User Benefit Focused) */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/30 rounded-full blur-3xl -z-10" />

            {/* Main Card: Ticket Confirmation */}
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary shadow-2xl relative z-10 bg-card/80 backdrop-blur-md transform transition-all hover:-translate-y-2 duration-500 rotate-y-6 rotate-x-6 hover:rotate-0">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-primary/20 rounded-full" />{" "}
                  {/* Simulating "Concert Name" */}
                  <div className="h-3 w-20 bg-foreground/40 rounded-full" />{" "}
                  {/* Simulating Date */}
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Booked ✅
                </Badge>
              </div>

              {/* Ticket Visual */}
              <div className="border-t-2 border-dashed border-border/50 my-4 relative">
                <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-background"></div>
                <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-background"></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Ticket className="w-4 h-4 text-primary" />
                  <span>2 Seats (A1, A2)</span>
                </div>
                <div className="text-xl font-bold">৳ 1200</div>
              </div>
            </div>

            {/* Floating Card 2: 100% Secure (Trust) */}
            <div className="absolute -top-20 -right-6 glass p-4 rounded-xl shadow-xl bg-card/90 backdrop-blur-md animate-bounce-slow hidden sm:block border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-500/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Secure Payment
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Trusted by Thousands
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 3: Instant (Speed) */}
            <div className="absolute -bottom-18 -left-8 glass p-4 rounded-xl shadow-xl bg-card/90 backdrop-blur-md hidden sm:block border border-primary/10 animate-pulse-slow">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Instant Booking
                  </div>
                  <div className="text-xs text-muted-foreground">
                    No Waiting Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
