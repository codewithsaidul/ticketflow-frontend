import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./config/route.config";
import { UserRole } from "./types";

interface CustomJwtPayload {
  role: UserRole;
  userId: string;
  email: string;
  exp: number;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: UserRole | null = null;


  if (accessToken) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid Token in Middleware", error);
    }
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);


  if (accessToken && isAuth && userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }


  if (routeOwner === null) {
    return NextResponse.next();
  }


  if (!accessToken || !userRole) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }


  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }


  if (routeOwner !== userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, etc.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};