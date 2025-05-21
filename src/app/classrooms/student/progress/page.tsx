import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProgressPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-gray-500">
          Monitor your OJT progress and achievements
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: '25%' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Hours Completed</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">125</span>
              <span className="text-gray-500 mb-1">/ 500 hours</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Tasks Completed</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">6</span>
              <span className="text-gray-500 mb-1">/ 24 tasks</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Attendance Summary</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-md flex items-center justify-center text-sm ${
                [1, 2, 3, 5, 8, 9].includes(i + 1) 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">Green indicates days with recorded hours</p>
      </div>
    </div>
  );
}