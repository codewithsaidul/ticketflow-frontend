import { Card } from "@/components/ui/card";
import { WHY_CHOOSE } from "@/data";

export default function WhyChooseUS () {
  return (
    <section className="relative w-full py-20 px-4 lg:px-0 gradient-bg">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Why Choose <span className="gradient-text">Velotix</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="p-8 space-y-6">
                  {/* Icon */}
                  <div className="p-4 w-fit rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
