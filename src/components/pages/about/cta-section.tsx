import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-linear-to-l from-primary/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-linear-to-r from-accent/10 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="glass rounded-2xl p-12 sm:p-16 text-center space-y-8 border-primary/30">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/20">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Ready to Host Your{" "}
              <span className="gradient-text">Next Event?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of event organizers who trust Velotix. Get started
              in minutes and start selling tickets today.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
            >
              <Link href="/auth/login" className="flex items-center gap-2">
                Become an Organizer
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-primary/30 hover:bg-primary/10 text-foreground bg-transparent"
            >
              Learn More
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary/10">
            {[
              { label: "Active Events", value: "10K+" },
              { label: "Sold Tickets", value: "5M+" },
              { label: "Happy Organizers", value: "2K+" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
