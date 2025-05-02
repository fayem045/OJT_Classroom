import { clerkMiddleware, createClerkClient } from "@clerk/nextjs/server";

// Configure Clerk with clock skew tolerance
const clerk = createClerkClient({
  clockSkewTolerance: 30, // 30 seconds tolerance
});

// Use the configured Clerk client in the middleware
export default clerkMiddleware({
  clockSkewTolerance: 30, // 30 seconds tolerance
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};