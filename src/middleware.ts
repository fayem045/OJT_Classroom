<<<<<<< HEAD
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * List of public routes that don't require authentication
 * These paths will be accessible without being logged in
 */
const publicPaths = [
  "/",
  "/sign-in*",
  "/sign-up*",
  "/api/uploadthing*",
  "/api/webhook*",
];

/**
 * Checks if the current path matches any of the public paths
 * @param path - The current request path
 * @returns boolean indicating if the path is public
 */
const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

/**
 * Middleware function that handles authentication and request processing
 * This runs before any page or API route is accessed
 */
export default authMiddleware({
  beforeAuth: (req) => {
    // Execute any code before authentication is checked
    return NextResponse.next();
  },
  afterAuth: (auth, req) => {
    // Handle the request after authentication is checked
    const path = req.nextUrl.pathname;

    // Allow public paths without authentication
    if (isPublic(path)) {
      return NextResponse.next();
    }

    // Redirect to sign-in if not authenticated
    if (!auth.userId) {
      const signInUrl = new URL("/", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
});

/**
 * Configure which paths the middleware should run on
 * This ensures the middleware only runs on necessary routes
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
=======
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicPaths = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/clerk-webhook'
];

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)"
  ],
}; 
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
