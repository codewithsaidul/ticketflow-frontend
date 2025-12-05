import { Card } from "@/components/ui/card";
import { STEPS } from "@/data";
import { ArrowRight } from "lucide-react";

export default function HowItWorks () {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            How It <span className="gradient-text">Works</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary/50 to-primary/0" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Card */}
                  <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full group">
                    <div className="p-8 space-y-6 text-center">
                      {/* Step number badge */}
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent mx-auto group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {step.number}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center">
                        <Icon className="w-12 h-12 text-primary group-hover:scale-125 transition-transform" />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Arrow connector */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-32 -right-16 items-center justify-center w-12 h-12">
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
