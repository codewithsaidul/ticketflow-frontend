export function ContactHero() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question about a ticket or want to host an event? We&apos;re here to help. Reach out anytime and we&apos;ll
          respond as quickly as we can.
        </p>
      </div>
    </section>
  )
}
