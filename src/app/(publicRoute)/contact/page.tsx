import { ContactForm, ContactHero, ContactInfo } from "@/components/pages/contact"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Contact Velotix - Get in Touch with Our Support Team",
  description:
    "Have questions about tickets or want to host an event? Contact the Velotix support team. We're here to help!",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Right Column - Contact Info & FAQ */}
            <div className="lg:col-span-3">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
