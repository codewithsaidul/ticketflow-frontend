"use client"

import { EventCard } from "@/components/shared/EventCard"
import { FEATURED_EVENTS } from "@/data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"



export default function FeaturedEvents () {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainer.current) {
      setCanScrollLeft(scrollContainer.current.scrollLeft > 0)
      setCanScrollRight(
        scrollContainer.current.scrollLeft < scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth,
      )
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 400
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 100)
    }
  }

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Trending <span className="gradient-text">Now</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the hottest events happening this season. Book your tickets before they sell out.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div
            ref={scrollContainer}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {FEATURED_EVENTS.map((event) => (
              <div key={event.id} className="shrink-0 w-full sm:w-96">
                <EventCard {...event} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full glass hover:bg-primary/10 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full glass hover:bg-primary/10 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
