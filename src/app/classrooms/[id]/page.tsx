import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

type PageParams = Promise<{ id: string }>;

export default async function ClassroomDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { id } = await params;
  
  // Check authentication
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Get user from database
  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  // If user is not in database yet, redirect to account setup
  if (!dbUser) {
    console.log("User not found in database, redirecting to account setup");
    redirect("/account-setup");
  }

  // Redirect to main dashboard
  redirect("/classrooms");
} 