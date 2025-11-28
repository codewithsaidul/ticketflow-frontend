import ReduxProviders from "@/provider/ReduxProvider";
import { IChildren } from "@/types";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// ১. বডি টেক্সটের জন্য Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ২. হেডিংয়ের জন্য Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velotix.xyz"),

  title: {
    default: "Velotix | The Fastest Ticketing Platform in Bangladesh",
    template: "%s | Velotix", // যেমন: "Login | Velotix"
  },

  description:
    "Experience high-speed, secure, and seamless event booking with Velotix. Buy tickets for concerts, movies, and seminars in Sylhet and Dhaka instantly.",

  keywords: [
    "Ticketing System",
    "Event Booking Bangladesh",
    "Concert Tickets BD",
    "Velotix",
    "Sylhet Events",
    "Online Ticket Booking",
  ],

  authors: [
    {
      name: "Saidul Islam Rana",
      url: "https://linkedin.com/in/codewithsaidul",
    },
  ],
  creator: "Saidul Islam Rana",

  // 6. Open Graph (Facebook/LinkedIn এ লিংক শেয়ার করলে যা দেখাবে)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velotix.xyz",
    siteName: "Velotix",
    title: "Velotix | Secure & Fast Ticketing",
    description:
      "Don't miss out! Book your tickets instantly with Velotix. The most reliable ticketing platform powered by secure technology.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Velotix Platform Preview",
      },
    ],
  },

  // 7. Twitter Card (টুইটারে শেয়ার করার জন্য)
  twitter: {
    card: "summary_large_image",
    title: "Velotix | The Future of Ticketing",
    description: "Book event tickets instantly. Secure, Fast, and Reliable.",
    images: ["/og-image.png"],
    creator: "@codewithsaidul",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<IChildren>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}
