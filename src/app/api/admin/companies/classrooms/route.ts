import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { classrooms, companies, users } from "~/server/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!adminUser || adminUser.role !== "professor") {
      return NextResponse.json(
        { message: "Only professors can view company classrooms" },
        { status: 403 }
      );
    }

    // Get all company classrooms with their professors, but only for the current professor
    const companyClassrooms = await db.query.classrooms.findMany({
      where: and(
        eq(classrooms.isActive, true),
        eq(classrooms.professorId, adminUser.id)
      ),
      with: {
        professor: true,
      },
      orderBy: (classrooms, { desc }) => [desc(classrooms.createdAt)],
    });

    return NextResponse.json({ classrooms: companyClassrooms });
  } catch (error) {
    console.error("Error fetching company classrooms:", error);
    return NextResponse.json(
      { message: "Failed to fetch classrooms" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, startDate, endDate, maxStudents } = body;

    // Validate input
    if (!name || !startDate || !endDate || !maxStudents) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!adminUser || adminUser.role !== "professor") {
      return NextResponse.json(
        { message: "Only professors can create company classrooms" },
        { status: 403 }
      );
    }

    // Create company record
    const [company] = await db.insert(companies).values({
      name,
      address: description, // Using description as address since it's not in the schema
      isActive: true,
    }).returning();

    if (!company) {
      return NextResponse.json(
        { message: "Failed to create company" },
        { status: 500 }
      );
    }

    // Create classroom record
    const [classroom] = await db.insert(classrooms).values({
      name,
      description,
      professorId: adminUser.id,
      isActive: true,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxStudents,
    }).returning();

    return NextResponse.json(
      { classroom },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company classroom:", error);
    return NextResponse.json(
      { message: "Failed to create company classroom" },
      { status: 500 }
    );
  }
} 