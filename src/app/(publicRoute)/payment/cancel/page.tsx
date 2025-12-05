import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Ban, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

type SearchParams = {
  transactionId?: string;
  message?: string;
  amount?: string;
  status?: string;
};

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { transactionId: tranId, amount, message, status } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/10 px-4 py-10">
      <Card className="w-full max-w-lg shadow-2xl border-orange-500/20 text-center overflow-hidden pt-0">
        
        {/* Header Animation (Orange Theme) */}
        <CardHeader className="bg-orange-50 dark:bg-orange-900/10 pb-8 pt-10 flex flex-col items-center border-b border-orange-100 dark:border-orange-900/20">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-500">
            <Ban className="w-10 h-10 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-orange-700 dark:text-orange-400">
            {message || "Payment Cancelled"}
          </h2>
          <p className="text-muted-foreground">
            You cancelled the payment process.
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
                  Amount
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
                  variant="secondary" 
                  className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 text-sm font-bold uppercase"
                >
                  {status || "CANCELLED"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex w-full flex-col sm:flex-row gap-3 pb-8 px-6">
          <Button
            asChild
            size="lg"
            className="w-full font-bold shadow-sm cursor-pointer"
          >
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Events
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="w-full cursor-pointer"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}