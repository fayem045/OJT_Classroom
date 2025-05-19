import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      console.log("No userId found in auth");
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the clerkId from query params
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      console.log("No clerkId provided in query params");
      return NextResponse.json(
        { message: "Missing clerkId parameter" },
        { status: 400 }
      );
    }

    // Verify that the requester is checking their own user
    if (clerkId !== userId) {
      console.log(`Unauthorized check attempt: ${clerkId} tried to check ${userId}`);
      return NextResponse.json(
        { message: "Unauthorized action" },
        { status: 403 }
      );
    }

    // Check if user exists and get their role from database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    console.log(`User check for ${clerkId}:`, { 
      exists: Boolean(dbUser),
      role: dbUser?.role || null
    });

    // If user exists and has a role, determine the correct redirect path
    let redirectPath = null;
    if (dbUser?.role) {
      if (dbUser.role === "student") {
        redirectPath = "/";
      } else if (dbUser.role === "professor" || dbUser.role === "admin") {
        redirectPath = "/";
      }
    }

    return NextResponse.json(
      { 
        exists: Boolean(dbUser),
        role: dbUser?.role || null,
        redirectPath
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { 
        message: "Failed to check user",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 