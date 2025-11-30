"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

interface EventCardProps {
  id: string
  title: string
  date: string
  location: string
  price: number
  image: string
  category: string
}

export function EventCard({  title, date, location, price, image, category }: EventCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg glass hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Badge className="absolute top-3 right-3 bg-primary/80 text-primary-foreground">{category}</Badge>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground group-hover:gradient-text transition-all line-clamp-2">
          {title}
        </h3>

        <div className="space-y-2 my-3 flex-1 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">${price}</span>
          </div>
          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
