import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StudentDashboardPage() {
  const { userId } = await auth();
  
  // Redirect to sign-in if not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-gray-500">
          Welcome to your OJT tracking dashboard
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Hours Logged</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 mt-1">Total hours recorded</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Tasks Completed</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 mt-1">Out of 0 assigned tasks</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">0% of required hours completed</p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-center py-8">No recent activities to display</p>
        </div>
      </div>
    </div>
  );
} 