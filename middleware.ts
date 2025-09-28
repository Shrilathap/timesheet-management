// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: check cookie or token in request
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;
  // Public routes (accessible without login)
  const publicPaths = ["/login"];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublic) {
    //  Not logged in → redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublic) {
    // Already logged in → redirect away from login/register to dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

//Apply middleware only to specific routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|/favicon.ico|images).*)",
  ],
};
