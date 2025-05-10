import { authMiddleware } from "@clerk/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/role-selection"],
  ignoredRoutes: ["/api/clerk-webhook"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};