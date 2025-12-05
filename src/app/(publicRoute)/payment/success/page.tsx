import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2, Home, Ticket } from "lucide-react";
import Link from "next/link";

type SearchParams = {
  transactionId?: string;
  message?: string;
  amount?: string;
  status?: string;
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { transactionId: tranId, amount, message, status } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/10 px-4 py-10">
      <Card className="w-full max-w-lg shadow-2xl border-green-500/20 text-center overflow-hidden pt-0">
        {/* Header Animation */}
        <CardHeader className="bg-green-50 dark:bg-green-900/10 pb-8 pt-10 flex flex-col items-center border-b border-green-100 dark:border-green-900/20">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl min-[450px]:text-2xl md:text-3xl font-heading font-bold text-green-700 dark:text-green-400">
            {message || "Payment Successful!"}
          </h2>
          <p className="text-muted-foreground">
            Your booking has been confirmed securely.
          </p>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          {/* 🔥 Payment Details Grid */}
          <div className="bg-muted/30 p-6 rounded-xl border border-dashed border-border space-y-4">
            {/* Row 1: Transaction ID */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Transaction ID
              </span>
              <span className="font-mono text-sm font-bold text-foreground">
                {tranId || "N/A"}
              </span>
            </div>

            <div className="h-px w-full bg-border/50" />

            {/* Row 2: Amount & Status */}
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Amount Paid
                </span>
                <span className="text-xl font-bold text-primary">
                  ৳ {amount || "0"}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50 text-sm font-bold"
                >
                  {status ? status.toUpperCase() : "SUCCESS"}
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground px-4">
            A confirmation email with your ticket details has been sent to your
            email address.
          </p>
        </CardContent>

        <CardFooter className="flex w-full max-[435px]:flex-col flex-row gap-3 pb-8">
          <Button
            size="lg"
            asChild
            className="font-bold max-[435px]:w-full sm:flex-1 shadow-lg shadow-primary/20 cursor-pointer"
          >
            <Link
              href="/user/my-bookings"
              className="flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> View My Ticket
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer max-[435px]:w-full sm:flex-1"
            asChild
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
