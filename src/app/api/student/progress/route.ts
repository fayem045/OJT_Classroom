import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { timeEntries, users, studentClassrooms, classrooms } from "~/server/db/schema";
import { eq, and, sum } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const classroomId = url.searchParams.get("classroomId");
    
    if (!studentId || !classroomId) {
      return NextResponse.json(
        { message: "Student ID and Classroom ID are required" },
        { status: 400 }
      );
    }
    
    const classroom = await db.query.classrooms.findFirst({
      where: eq(classrooms.id, parseInt(classroomId)),
    });
    
    if (!classroom) {
      return NextResponse.json(
        { message: "Classroom not found" },
        { status: 404 }
      );
    }
    
    const requiredHours = classroom.ojtHours || 600;
    
    const hoursResult = await db.select({
      total: sum(timeEntries.hours)
    })
    .from(timeEntries)
    .where(
      and(
        eq(timeEntries.studentId, parseInt(studentId)),
        eq(timeEntries.classroomId, parseInt(classroomId)),
        eq(timeEntries.isApproved, true)
      )
    );
    
    const totalHours = hoursResult[0]?.total || 0;
    
    const progressPercentage = Math.min(100, Math.round((totalHours / requiredHours) * 100));
    
    return NextResponse.json({
      studentId: parseInt(studentId),
      classroomId: parseInt(classroomId),
      totalHours,
      requiredHours,
      progressPercentage
    });
  } catch (error) {
    console.error("Error fetching student progress:", error);
    return NextResponse.json(
      { message: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}