import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Components
import Sidebar from "./_components/Sidebar";
import StudentView from "./_components/StudentView";
import ProfessorView from "./_components/ProfessorView";
import AdminView from "./_components/AdminView";
import ClassroomNavbar from "./_components/ClassroomNavbar";

export default async function ClassroomPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const role = user?.unsafeMetadata.role as string || 'student';

  const getViewComponent = () => {
    switch (role) {
      case 'professor':
        return <ProfessorView />;
      case 'admin':
        return <AdminView />;
      default:
        return <StudentView />;
    }
  };

  return (
    <>
      <ClassroomNavbar />
      <div className="flex min-h-screen pt-16 bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        {getViewComponent()}
      </div>
    </>
  );
}