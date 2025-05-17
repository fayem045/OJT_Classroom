import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users, studentClassrooms } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!adminUser || adminUser.role !== "professor") {
      return new NextResponse("Only professors can invite students", { status: 403 });
    }

    const { studentIds } = await req.json();

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return new NextResponse("Student IDs are required", { status: 400 });
    }

    const classroomId = parseInt(params.id);

    // Add students to the classroom
    await db.insert(studentClassrooms).values(
      studentIds.map((studentId) => ({
        studentId,
        classroomId,
        progress: 0,
      }))
    );

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error inviting students:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 