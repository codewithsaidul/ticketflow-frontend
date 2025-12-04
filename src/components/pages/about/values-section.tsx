import { Zap, Shield, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

const VALUES = [
  {
    icon: Zap,
    title: "Lightning Speed",
    description:
      "Built on a high-performance Node.js & Redis architecture that handles millions of concurrent bookings without breaking a sweat.",
  },
  {
    icon: Shield,
    title: "Atomic Integrity",
    description:
      "Atomic seat locking prevents double bookings. Every ticket is guaranteed, every seat is verified, zero compromises.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Find event companions effortlessly. Connect with fellow fans, share experiences, and build your event community.",
  },
]

export function ValuesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Why We Are Different</h2>
            <p className="text-muted-foreground">Technical excellence meets user-centric design</p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="p-8 border-2 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg flex flex-col"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed grow">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
