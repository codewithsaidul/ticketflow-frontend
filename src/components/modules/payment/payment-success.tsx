"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2, Home, Ticket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/10 px-4">
      <Card className="w-full max-w-md shadow-2xl border-green-500/20 text-center overflow-hidden">
        {/* Header Animation */}
        <CardHeader className="bg-green-50 dark:bg-green-900/10 pb-8 pt-10 flex flex-col items-center border-b border-green-100 dark:border-green-900/20">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-green-700 dark:text-green-400">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground">
            Your booking has been confirmed.
          </p>
        </CardHeader>

        <CardContent className="pt-8 space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
              Transaction ID
            </p>
            <p className="text-lg font-mono font-bold text-primary mt-1">
              {tranId || "N/A"}
            </p>
          </div>

          <p className="text-sm text-muted-foreground px-4">
            A confirmation email with your ticket details has been sent to your
            email address.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pb-8">
          <Link href="/user/my-bookings" className="w-full">
            <Button
              size="lg"
              className="w-full gap-2 font-bold shadow-lg shadow-primary/20"
            >
              <Ticket className="w-4 h-4" /> View My Ticket
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
