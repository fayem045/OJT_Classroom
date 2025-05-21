<<<<<<< HEAD
// This file is no longer needed as we've removed role management
// You can safely delete this file

=======
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users, activities } from "~/server/db/schema";
import { eq } from "drizzle-orm";

<<<<<<< HEAD
export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();
    if (!role || !["student", "professor"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Check if user exists first
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUserId),
    });

    if (existingUser) {
      // Update existing user
      await db
        .update(users)
        .set({ 
          role,
          updatedAt: new Date()
        })
        .where(eq(users.clerkId, clerkUserId));
    } else {
      // Create new user
      await db.insert(users).values({
        clerkId: clerkUserId,
        email: "",
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Log the activity
    await db.insert(activities).values({
      type: "system",
      action: `User role ${existingUser ? 'updated to' : 'set as'} ${role}`,
      userId: existingUser?.id,
      createdAt: new Date(),
    });

    // Return success with redirect path
const redirectPath = "/";
    return NextResponse.json({ 
      success: true,
      redirectPath,
      role 
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: "Failed to update role", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
=======
export async function POST(req: Request) {  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      console.error("No clerk user ID found");
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { role } = body;
    
    console.log("Updating role for user:", clerkUserId, "to role:", role);
    if (!role || !["student", "professor", "admin"].includes(role)) {
      return new Response("Invalid role", { status: 400 });
    }    // Check if user exists
    let userRecords = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkUserId));
      if (userRecords.length === 0) {
      // Get user email from Clerk session
      const { getUser } = await import("@clerk/nextjs/server");
      const clerkUser = await getUser(clerkUserId);
      const email = clerkUser?.emailAddresses[0]?.emailAddress;
      
      if (!email) {
        return new Response("Email address required", { status: 400 });
      }
      
      // Create user if they don't exist
      await db.insert(users).values({
        clerkId: clerkUserId,
        email: email,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Get the newly created user's ID
      userRecords = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.clerkId, clerkUserId));
    } else {
      // Update existing user's role
      await db
        .update(users)
        .set({ role })
        .where(eq(users.clerkId, clerkUserId));
    }
    
    // Get the user's database ID after creation or update
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
    }    return NextResponse.json({ 
      success: true,
      message: `Successfully updated role to ${role}`,
      userId: clerkUserId 
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    // Return more detailed error information
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: error instanceof Error ? error.stack : undefined
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
  }
}
