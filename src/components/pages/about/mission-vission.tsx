import { Zap, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MissionVision() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission & Vision</h2>
            <p className="text-muted-foreground">The driving force behind everything we build</p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="p-8 md:p-10 border-2 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To eliminate the frustration of server crashes and race conditions in event booking. We&apos;re building the
                most reliable infrastructure for ticketing at scale.
              </p>
            </Card>

            {/* Vision Card */}
            <Card className="p-8 md:p-10 border-2 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To build the world&apos;s most reliable, social-first ticketing ecosystem. Where fans find events, connect
                with communities, and never miss a moment.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
