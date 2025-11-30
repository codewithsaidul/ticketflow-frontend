import { CATEGORIES } from "@/data";

export default function CategoryGrid() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Browse</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Explore by <span className="gradient-text">Category</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                className="group relative overflow-hidden rounded-xl glass p-8 hover:border-primary/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count}</p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
