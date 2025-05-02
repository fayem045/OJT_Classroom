import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Components
import Sidebar from "./_components/Sidebar";
import MainContent from "@/app/classrooms/_components/MainContent";
import ClassroomNavbar from "./_components/ClassroomNavbar";

export default async function ClassroomPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <ClassroomNavbar />
      <div className="flex min-h-screen pt-16 bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <MainContent />
      </div>
    </>
  );
}