"use client"
import { GoogleIcon } from "@/components/icon/google-icon";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

// const isDev = process.env.NODE_ENV === "development";
// const backendUrl = isDev
//   ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL
//   : process.env.NEXT_PUBLIC_PROD_BACKEND_URL;

const backendUrl = "/api/v1";

export default function GoogleLogin ( { isLoading }: { isLoading: boolean }) {
  const searchParams = useSearchParams();

  const handleGoogleLogin = () => {
    const redirectPath = searchParams.get("redirect") || "/";
    window.location.href = `${backendUrl}/auth/google?redirect=${redirectPath}`;
  };
  return (
    <Button
      variant="outline"
      type="button"
      aria-label="Login with Google"
      className="w-full cursor-pointer"
      disabled={isLoading}
      onClick={handleGoogleLogin}
    >
      <GoogleIcon />
      Signin with Google
    </Button>
  );
}
