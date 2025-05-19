import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { timeEntries, users, studentClassrooms, classrooms } from "~/server/db/schema";
import { eq, and, sum } from "drizzle-orm";

// Constants
const REQUIRED_OJT_HOURS = 500; // Default requirement, can be customized per classroom

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    const url = new URL(req.url);
    const classroomId = url.searchParams.get("classroomId");
    const studentId = url.searchParams.get("studentId");
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // If no classroom specified, get progress across all classrooms for the student
    if (!classroomId) {
      if (user.role === "student") {
        // Get all classrooms the student is enrolled in
        const enrollments = await db.query.studentClassrooms.findMany({
          where: eq(studentClassrooms.studentId, user.id),
        });

        const progressData = await Promise.all(
          enrollments.map(async (enrollment) => {
            const classroom = await db.query.classrooms.findFirst({
              where: eq(classrooms.id, enrollment.classroomId),
            });

            // Calculate total approved hours
            const result = await db
              .select({ totalHours: sum(timeEntries.hours) })
              .from(timeEntries)
              .where(
                and(
                  eq(timeEntries.studentId, user.id),
                  eq(timeEntries.classroomId, enrollment.classroomId),
                  eq(timeEntries.isApproved, true)
                )
              );

            const completedHours = result[0]?.totalHours || 0;
            const progressPercentage = Math.min(
              Math.round((completedHours / REQUIRED_OJT_HOURS) * 100),
              100
            );

            return {
              classroomId: enrollment.classroomId,
              classroomName: classroom?.name || "Unknown Classroom",
              completedHours,
              requiredHours: REQUIRED_OJT_HOURS,
              progressPercentage,
            };
          })
        );

        return NextResponse.json(progressData);
      } else {
        return NextResponse.json(
          { message: "Classroom ID is required for non-student users" },
          { status: 400 }
        );
      }
    }

    // Get progress for a specific classroom
    // If studentId is provided, get progress for that student, otherwise get progress for all students
    if (user.role === "professor" || user.role === "admin") {
      const classroom = await db.query.classrooms.findFirst({
        where: and(
          eq(classrooms.id, parseInt(classroomId)),
          eq(classrooms.professorId, user.id)
        ),
      });

      if (!classroom) {
        return NextResponse.json(
          { message: "Classroom not found or you don't have permission" },
          { status: 404 }
        );
      }

      if (studentId) {
        // Get progress for a specific student
        const student = await db.query.users.findFirst({
          where: eq(users.id, parseInt(studentId)),
        });

        if (!student) {
          return NextResponse.json(
            { message: "Student not found" },
            { status: 404 }
          );
        }

        const result = await db
          .select({ totalHours: sum(timeEntries.hours) })
          .from(timeEntries)
          .where(
            and(
              eq(timeEntries.studentId, parseInt(studentId)),
              eq(timeEntries.classroomId, parseInt(classroomId)),
              eq(timeEntries.isApproved, true)
            )
          );

        const completedHours = result[0]?.totalHours || 0;
        const progressPercentage = Math.min(
          Math.round((completedHours / REQUIRED_OJT_HOURS) * 100),
          100
        );

        return NextResponse.json({
          studentId: parseInt(studentId),
          studentName: student.email,
          completedHours,
          requiredHours: REQUIRED_OJT_HOURS,
          progressPercentage,
        });
      } else {
        // Get progress for all students in the classroom
        const enrollments = await db.query.studentClassrooms.findMany({
          where: eq(studentClassrooms.classroomId, parseInt(classroomId)),
        });

        const progressData = await Promise.all(
          enrollments.map(async (enrollment) => {
            const student = await db.query.users.findFirst({
              where: eq(users.id, enrollment.studentId),
            });

            const result = await db
              .select({ totalHours: sum(timeEntries.hours) })
              .from(timeEntries)
              .where(
                and(
                  eq(timeEntries.studentId, enrollment.studentId),
                  eq(timeEntries.classroomId, parseInt(classroomId)),
                  eq(timeEntries.isApproved, true)
                )
              );

            const completedHours = result[0]?.totalHours || 0;
            const progressPercentage = Math.min(
              Math.round((completedHours / REQUIRED_OJT_HOURS) * 100),
              100
            );

            return {
              studentId: enrollment.studentId,
              studentName: student?.email || "Unknown Student",
              completedHours,
              requiredHours: REQUIRED_OJT_HOURS,
              progressPercentage,
            };
          })
        );

        return NextResponse.json(progressData);
      }
    } else if (user.role === "student") {
      // Students can only see their own progress
      const enrollment = await db.query.studentClassrooms.findFirst({
        where: and(
          eq(studentClassrooms.studentId, user.id),
          eq(studentClassrooms.classroomId, parseInt(classroomId))
        ),
      });

      if (!enrollment) {
        return NextResponse.json(
          { message: "You are not enrolled in this classroom" },
          { status: 403 }
        );
      }

      const result = await db
        .select({ totalHours: sum(timeEntries.hours) })
        .from(timeEntries)
        .where(
          and(
            eq(timeEntries.studentId, user.id),
            eq(timeEntries.classroomId, parseInt(classroomId)),
            eq(timeEntries.isApproved, true)
          )
        );

      const completedHours = result[0]?.totalHours || 0;
      const progressPercentage = Math.min(
        Math.round((completedHours / REQUIRED_OJT_HOURS) * 100),
        100
      );

      return NextResponse.json({
        completedHours,
        requiredHours: REQUIRED_OJT_HOURS,
        progressPercentage,
      });
    }

    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error calculating progress:", error);
    return NextResponse.json(
      { message: "Failed to calculate progress" },
      { status: 500 }
    );
  }
}