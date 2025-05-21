<<<<<<< HEAD
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Root page component that handles initial routing based on user authentication and role
 * This is the main entry point for the application
 */
export default async function RootPage() {
  // Get current user's authentication status
  const { userId } = await auth();
  
  // If user is not authenticated, show auth UI
  if (!userId) {
    return <div className="hidden">Auth slot will be shown</div>;
  }
  
  try {
    // Query database to get user's role
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });
    
    // Route user based on their role
    if (user && user.role) {
      if (user.role === "professor") {
        return <div className="hidden">Professor slot will be shown</div>;
      } else {
        return <div className="hidden">Student slot will be shown</div>;
      }
    }
    
    // If user has no role assigned, redirect to role selection
    redirect("/role-selection");
  } catch (error) {
    // Log database errors
    console.error("Database error:", error);
    return null;
  }
}
=======
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
    </main>
  );
}
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
