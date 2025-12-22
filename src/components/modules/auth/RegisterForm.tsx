"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { Textarea } from "@/components/ui/textarea";
import {
  RegisterFormValues,
  registerSchema,
} from "@/validation/auth.validation";
import toast from "react-hot-toast";
import { IApiErrorResponse } from "@/types";
import { useRegisterMutation } from "@/redux/api/authApi/authApi";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/password-input";
import GoogleLogin from "./GoogleLogin";





export default function RegisterForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [register, { isLoading} ] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
      phone: "",
      bio: "",
      location: "",
      role: "user",
      interests: [],
    },
  });

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      const newInterests = [...interests, interestInput.trim()];
      setInterests(newInterests);
      form.setValue("interests", newInterests);
      setInterestInput("");
    }
  };

  const removeInterest = (tag: string) => {
    const newInterests = interests.filter((i) => i !== tag);
    setInterests(newInterests);
    form.setValue("interests", newInterests);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    const toastId = toast.loading("Creating...")
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);


    try {
      await new Promise((res) => setTimeout(res, 1200));
      const res = await register(formData).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        router.push("/auth/login")
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      console.log("🚀 ~ handleLogin ~ err:", err);
      toast.error(err?.data?.message || "Login failed", {
        id: toastId,
      });
    }

  }


  return (
    <div className="flex flex-col gap-6 w-full my-10">
      <Card className="overflow-hidden p-0 border-0 shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-12 min-h-[600px]">
          {/* Left Column: Form */}
          <div className="p-8 md:p-10 md:col-span-7 flex flex-col">
            <div className="flex flex-col items-center gap-4 text-center mb-8">
              <Logo size="md" />
              <div className="space-y-1">
                <h1 className="text-2xl font-bold font-heading">
                  Create Account
                </h1>
                <p className="text-muted-foreground text-sm">
                  Join Velotix and experience seamless booking
                </p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="017..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Dhaka, BD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 🔥 Password Grid (New Section) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I want to</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="user" className="cursor-pointer">
                            Book Tickets
                          </SelectItem>
                          <SelectItem value="host" className="cursor-pointer">
                            Host Events
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      placeholder="Add interest (e.g. Music) & press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addInterest();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addInterest}
                      size="icon"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((tag) => (
                      <div
                        key={tag}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeInterest(tag)}
                        />
                      </div>
                    ))}
                  </div>
                </FormItem>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about yourself..."
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="mb-3">Profile Photo</FormLabel>
                  <SingleImageUploader onChange={setImage} />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base cursor-pointer font-bold shadow-lg shadow-primary/20 mt-4"
                  disabled={isLoading}
                >
                  { isLoading ? "Creating..." : "Create Account"}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground font-medium">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <GoogleLogin isLoading={isLoading} />

                <div className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-bold text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          {/* Right Column: Image */}
          <div className="bg-muted relative hidden md:block md:col-span-5">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Concert crowd"
              fill
              className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
              priority
            />
            <div className="absolute bottom-10 left-8 right-8 text-white z-10">
              <h3 className="text-3xl font-bold font-heading mb-3">
                Join the Community
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Connect with thousands of event enthusiasts, find companions,
                and experience live moments like never before.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
