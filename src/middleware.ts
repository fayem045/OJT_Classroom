import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const publicPaths = [
  '/',
  '/sign-in',
  '/sign-up',
  '/api/clerk-webhook'
];

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)"
  ],
}; 