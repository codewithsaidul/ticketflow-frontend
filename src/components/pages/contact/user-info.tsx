"use client"

import type React from "react"

import { Mail, Phone, MapPin, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ContactCard {
  icon: React.ReactNode
  title: string
  value: string
  description?: string
}

const contactCards: ContactCard[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    value: "support@velotix.xyz",
    description: "We typically respond within 24 hours",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Available Mon-Fri, 9AM-6PM EST",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Office",
    value: "San Francisco, CA",
    description: "123 Event Street, SF 94103",
  },
]

const faqItems = [
  {
    question: "How do I request a refund?",
    answer:
      "Refunds can be requested through your account dashboard within 30 days of purchase. Go to 'My Bookings', select the event, and click 'Request Refund'. Please note that some events may have different refund policies.",
  },
  {
    question: "Where do I find my QR code?",
    answer:
      "Your QR code will be sent to your registered email address and is also available in your account under 'Upcoming Events'. Check your spam folder if you don't see the email. You can also retrieve it anytime from the Velotix mobile app.",
  },
  {
    question: "How do I create an event as an organizer?",
    answer:
      "To create an event, sign up for an organizer account, complete the verification process, and navigate to 'Create Event'. Fill in the event details, set ticket prices, and publish. Our team will review and approve within 24-48 hours.",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>

        <div className="space-y-3">
          {contactCards.map((card, index) => (
            <Card key={index} className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm mb-1">{card.title}</h4>
                  <p className="text-primary font-medium">{card.value}</p>
                  {card.description && <p className="text-xs text-muted-foreground mt-1">{card.description}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Organizer Priority Support Card */}
      <Card className="p-5 bg-linear-to-br from-primary/10 to-primary/5 border-primary/30">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Priority Support for Hosts</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Event organizers get dedicated support, revenue optimization tips, and exclusive features.
            </p>
            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Learn more →
            </a>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>

        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border data-[state=open]:bg-card rounded-lg px-4"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
