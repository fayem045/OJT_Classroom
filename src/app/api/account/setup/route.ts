import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { activities } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const clerkId = formData.get("clerkId") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as "student" | "professor" | "admin";

    // Validate the data
    if (!clerkId || !email || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify that the clerkId matches the authenticated user
    if (clerkId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized action" },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (existingUser) {
      // Update the user if they already exist
      await db
        .update(users)
        .set({
          role,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, clerkId));
    } else {
      // Create new user
      await db.insert(users).values({
        clerkId,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Log the activity
    await db.insert(activities).values({
      type: role === "admin" ? "system" : role,
      action: `User signed up as ${role}`,
      createdAt: new Date(),
    });

    // Determine redirect based on role
    let redirectUrl = "/";
    if (role === "student") {
      redirectUrl = "/classrooms/student";
    } else if (role === "professor" || role === "admin") {
      redirectUrl = "/classrooms/admin/dashboard";
    }

    return NextResponse.json(
      { message: "Account setup successful", redirectUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting up account:", error);
    return NextResponse.json(
      { message: "Failed to set up account" },
      { status: 500 }
    );
  }
} 