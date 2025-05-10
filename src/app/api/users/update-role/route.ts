import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users, activities } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { role } = await req.json();
    if (!role || !["student", "professor", "admin"].includes(role)) {
      return new Response("Invalid role", { status: 400 });
    }

    // Update user role in database
    await db
      .update(users)
      .set({ role })
      .where(eq(users.clerkId, clerkUserId));
    
    // Get the user's database ID
    const userRecords = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkUserId));
    
    const userRecord = userRecords[0];

    // Log the activity
    if (userRecord) {
      await db.insert(activities).values({
        type: "system",
        action: `User role updated to ${role}`,
        userId: userRecord.id,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
