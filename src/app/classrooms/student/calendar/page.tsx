import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CalendarPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-gray-500">
          Manage your OJT schedule and appointments
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">OJT Schedule</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-4">May 2025</h3>
              <div className="grid grid-cols-7 gap-1 mb-2">
                <div className="text-xs text-gray-500">Sun</div>
                <div className="text-xs text-gray-500">Mon</div>
                <div className="text-xs text-gray-500">Tue</div>
                <div className="text-xs text-gray-500">Wed</div>
                <div className="text-xs text-gray-500">Thu</div>
                <div className="text-xs text-gray-500">Fri</div>
                <div className="text-xs text-gray-500">Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square flex items-center justify-center text-sm rounded-full
                      ${i + 1 === 15 ? 'bg-blue-100 text-blue-800' : ''}
                      ${[5, 6, 12, 13, 19, 20, 26, 27].includes(i + 1) ? 'text-gray-400' : ''}
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-lg mb-4">Time Tracking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Today's Hours</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Log Hours
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">This Week</label>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>16 hours</span>
                  <span>40 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}