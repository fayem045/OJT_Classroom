import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Components
import Sidebar from "./_components/Sidebar";
import ProfessorView from "./_components/ProfessorView";
import ClassroomNavbar from "./_components/ClassroomNavbar";

export default async function ClassroomPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const role = user?.unsafeMetadata.role as string || 'student';

  // Redirect students to the new student dashboard
  if (role === 'student') {
    redirect("/classrooms/student");
  }
  
  // Redirect admins and professors to the new admin dashboard
  if (role === 'admin' || role === 'professor') {
    redirect("/classrooms/admin");
  }

  // This code should never be reached now
  return (
    <>
      <ClassroomNavbar />
      <div className="flex min-h-screen pt-16 bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <ProfessorView />
      </div>
    </>
  );
}