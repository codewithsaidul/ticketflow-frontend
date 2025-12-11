"use client";

import { setUser } from "@/redux/slice/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IUser } from "@/types";

export default function GoogleAuthSync() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const decodedUser: IUser = jwtDecode(token);
        dispatch(
          setUser(decodedUser)
        );

        toast.success("Logged in via Google successfully!");


        const newUrl = pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
        

        if (pathname === "/login" || pathname === "/auth/login") {
           const role = decodedUser.role;
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
          }
        }

      } catch (error) {
        console.error("Google Auth Error:", error);
        toast.error("Failed to process login");
      }
    }
  }, [searchParams, dispatch, pathname, router]);

  return null;
}