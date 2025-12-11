import { role } from "@/constants/user.role.constants";
import { UserRole } from "@/types";


export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// 1. Auth Routes (Public but restricted if logged in)
export const authRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/auth/],
};

// 2. Common Protected Routes (Everyone can access if logged in)
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/user/profile"],
  patterns: [], 
};

// 3. Super Admin Routes
export const superAdminProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/administrator/],
  exact: [],
};

// 4. Admin Routes
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/admin/],
  exact: [],
};

// 5. Host Routes
export const hostProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard\/host/],
  exact: [],
};

// 6. User Routes (Specific Requirement) 🔥
export const userProtectedRoutes: RouteConfig = {
  exact: ["/user/my-bookings"], // 🔥 Only users can see their bookings
  patterns: [/^\/booking/], // 🔥 Booking flow (/booking/[id]) is also user-specific
};

// --- Helpers ---

export const isAuthRoute = (pathname: string) => {
  return authRoutes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

// কোন রাউট কার জন্য (Ownership Check)
export const getRouteOwner = (
  pathname: string
): UserRole | "COMMON" | null => {
  if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    return role.SUPERADMIN as UserRole;
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return role.ADMIN as UserRole;
  }
  if (isRouteMatches(pathname, hostProtectedRoutes)) {
    return role.HOST as UserRole;
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return role.USER as UserRole;
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON"; // Special flag
  }
  return null; // Public Route
};

// লগইনের পর কে কোথায় যাবে
export const getDefaultDashboardRoute = (user_role: string): string => {
  switch (user_role) {
    case role.SUPERADMIN:
      return "/dashboard/administrator";
    case role.ADMIN:
      return "/dashboard/admin";
    case role.HOST:
      return "/dashboard/host";
    case role.USER:
      return "/";
    default:
      return "/";
  }
};

// মিডলওয়্যারে চেক করার জন্য
export const isValidRedirectForRole = (
  redirectPath: string,
  role: string
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  // পাবলিক বা কমন রাউট হলে সবাই যেতে পারবে
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  // স্পেসিফিক রোলের সাথে মিললে ট্রু
  if (routeOwner === role) {
    return true;
  }

  return false;
};