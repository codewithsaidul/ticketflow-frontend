"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Logo from "@/components/shared/Logo";
import { useVerifyEmailQuery } from "@/redux/api/authApi/authApi";
import toast from "react-hot-toast";
import { IApiErrorResponse } from "@/types";


export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");


  const { data, isLoading, isSuccess, isError, error } = useVerifyEmailQuery(token, {
    skip: !token,
  });


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Verification Successful!");
      const timer = setTimeout(() => router.push("/auth/login"), 3000);
      return () => clearTimeout(timer);
    }

    if (isError) {
      toast.error("Verification Failed");
    }
  }, [isSuccess, isError, data, router]);


  const errorMessage = (error as IApiErrorResponse)?.data?.message || "Invalid or expired token.";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-primary/10 text-center">
        <CardHeader className="space-y-4 pb-2">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <CardTitle className="text-2xl font-bold font-heading">
            Account Verification
          </CardTitle>
          <CardDescription>
            We are verifying your email address.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6 py-8">
          
          {/* 1. Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse">Verifying account...</p>
            </div>
          )}

          {/* 2. Success State */}
          {isSuccess && (
            <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="h-20 w-20 text-green-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-green-600">Verified!</h3>
                <p className="text-muted-foreground">Your account is now active.</p>
                <p className="text-xs text-muted-foreground">Redirecting to login...</p>
              </div>
              <Button onClick={() => router.push("/auth/login")} className="mt-4">
                Go to Login Now
              </Button>
            </div>
          )}

          {/* 3. Error State */}
          {isError && (
            <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
              <XCircle className="h-20 w-20 text-red-500" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-red-600">Verification Failed</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {errorMessage === "jwt expired" ? "Your token is expired" : "Something went wrong"}
                </p>
              </div>
              <Button variant="outline" onClick={() => router.push("/auth/register")} className="mt-4">
                Back to Sign Up
              </Button>
            </div>
          )}

          {/* 4. No Token State */}
          {!token && (
            <div className="text-yellow-600">
              <p>Invalid Link. No token found in URL.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}