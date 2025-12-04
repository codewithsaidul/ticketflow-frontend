"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

const TEAM_MEMBERS = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Ex-SRE at Stripe. Obsessed with reliability at scale.",
    initials: "AC",
    image: "/professional-headshot-man.jpg",
  },
  {
    name: "Jordan Park",
    role: "CTO",
    bio: "Built distributed systems at Meta. Architect of Velotix.",
    initials: "JP",
    image: "/professional-headshot-woman.jpg",
  },
  {
    name: "Sam Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack engineer. Makes magic happen every day.",
    initials: "SR",
    image: "/professional-headshot-person.jpg",
  },
]

export function TeamSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
            <p className="text-muted-foreground">Passionate builders dedicated to revolutionizing ticketing</p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <Card
                key={index}
                className="p-8 border-2 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg text-center"
              >
                <div className="flex justify-center mb-6">
                  <Avatar className="w-24 h-24 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{member.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
