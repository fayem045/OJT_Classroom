import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default async function Home() {
  // Check authentication
  const { userId } = await auth();
  
  // If user is logged in, check for their role
  if (userId) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    // If user exists in database and has a role, redirect to appropriate dashboard
    if (dbUser) {
      if (dbUser.role === "student") {
          redirect("/classrooms/student");
      } else if (dbUser.role === "professor") {
        redirect("/classrooms/prof/dashboard");
      }
    }
    // No redirect for users without roles - they'll just stay on the home page
  }

  // Show landing page for unauthenticated users or users without roles
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
    </main>
  );
}
