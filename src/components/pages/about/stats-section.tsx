import { Card } from "@/components/ui/card"

const STATS = [
  { label: "1M+", value: "Tickets Sold", description: "Across thousands of events globally" },
  { label: "500+", value: "Events Hosted", description: "From indie concerts to major festivals" },
  { label: "99.99%", value: "Uptime", description: "Never let your fans down" },
]

export function StatsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Serving millions of users with industry-leading reliability
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {STATS.map((stat, index) => (
              <Card
                key={index}
                className="p-8 text-center border-2 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="space-y-2">
                  <p className="text-5xl md:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
