import { authMiddleware, clerkClient } from "@clerk/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Add publicRoutes and ignoredRoutes
const publicRoutes = ["/", "/sign-in", "/sign-up", "/role-selection"];
const ignoredRoutes = ["/api/clerk-webhook", "/_next", "/favicon.ico", "/images"];
const protectedApiRoutes = ["/api/users", "/api/classrooms", "/api/activities"];

export default authMiddleware({
  publicRoutes,
  ignoredRoutes,
  async afterAuth(auth: { userId: string | null }, req: NextRequest) {
    // Allow public routes and webhook endpoints
    if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route)) || 
        ignoredRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // Handle non-authenticated users
    if (!auth.userId) {
      const signinUrl = new URL('/sign-in', req.url);
      signinUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signinUrl);
    }

    // For authenticated users accessing /role-selection
    if (auth.userId && req.nextUrl.pathname === '/role-selection') {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        if (user?.unsafeMetadata?.role) {
          // If role is already set, redirect to classrooms
          return NextResponse.redirect(new URL('/classrooms', req.url));
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        // On error, allow access to role selection
        return NextResponse.next();
      }
    }

    // For authenticated users accessing protected routes
    if (auth.userId && !req.nextUrl.pathname.startsWith('/role-selection')) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        
        // If no role is set, redirect to role selection
        if (!user?.unsafeMetadata?.role) {
          return NextResponse.redirect(new URL('/role-selection', req.url));
        }

        // Role-based access control
        const userRole = user.unsafeMetadata.role as string;
        const adminOnlyPaths = ['/admin', '/api/admin'];
        const professorOnlyPaths = ['/professor', '/api/professor'];
        
        if (adminOnlyPaths.some(path => req.nextUrl.pathname.startsWith(path)) && userRole !== 'admin') {
          return NextResponse.redirect(new URL('/classrooms', req.url));
        }

        if (professorOnlyPaths.some(path => req.nextUrl.pathname.startsWith(path)) && userRole !== 'professor') {
          return NextResponse.redirect(new URL('/classrooms', req.url));
        }
      } catch (error) {
        console.error('Error in auth middleware:', error);
        // On error, redirect to error page or homepage
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  },
});

// Config object with matcher for optimizing middleware execution
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};