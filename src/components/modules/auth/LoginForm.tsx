"use client";

import { GoogleIcon } from "@/components/icon/google-icon";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slice/auth.slice";
import { IApiErrorResponse } from "@/types";
import { LoginFormValues, loginSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading("Signing...");

    try {
      await new Promise((res) => setTimeout(res, 1200));
      const res = await login(values).unwrap();

      if (res.success) {
        dispatch(setUser(res.data.user));
        const role = res.data.user.role;
        toast.success(res.message, { id: toastId });

        switch (role) {
          case "superadmin":
            router.push("/dashboard/administrator");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          case "host":
            router.push("/dashboard/host");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      console.log("🚀 ~ handleLogin ~ err:", err);
      toast.error(err?.data?.message || "Login failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Column: Form */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 text-center mb-6">
              <Logo size="md" />
              <div className="space-y-1 mt-5">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        {/* <Link
                          href="#"
                          className="text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link> */}
                      </div>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Logins */}
                <div className="w-full">
                  <Button
                    variant="outline"
                    type="button"
                    aria-label="Login with Google"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <GoogleIcon />
                    Signin with Google
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          {/* Right Column: Image */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login visual"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <div className="px-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
