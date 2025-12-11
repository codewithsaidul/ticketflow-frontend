import ReduxProviders from "@/provider/ReduxProvider";
import { IChildren } from "@/types";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Suspense } from "react";
import GoogleAuthSync from "@/provider/GoogleAuthSync";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velotix.xyz"),

  title: {
    default: "Velotix | The Fastest Ticketing Platform in Bangladesh",
    template: "%s | Velotix",
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
      <body
        className={`${inter.variable} ${jakarta.variable} dark antialiased`}
      >
        <ReduxProviders>
          <Suspense fallback={null}>
            <GoogleAuthSync />
          </Suspense>
          {children} <Toaster />
        </ReduxProviders>
      </body>
    </html>
  );
}
