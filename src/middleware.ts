import { authMiddleware, clerkClient } from "@clerk/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/role-selection"],
  ignoredRoutes: ["/api/clerk-webhook"],
  async afterAuth(auth, req) {
    // Handle user creation/updates in webhook
    if (req.url.includes("/api/clerk-webhook")) {
      return NextResponse.next();
    }

    // For authenticated users accessing /role-selection
    if (auth.userId && req.url.includes("/role-selection")) {
      const user = await clerkClient.users.getUser(auth.userId);
      if (user?.unsafeMetadata?.role) {
        // If role is already set, redirect to classrooms
        return NextResponse.redirect(new URL("/classrooms", req.url));
      }
    }

    // For authenticated users without a role
    if (auth.userId && !auth.sessionClaims?.metadata?.role && !req.url.includes("/role-selection")) {
      return NextResponse.redirect(new URL("/role-selection", req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};