import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data for demonstration
  const stats = [
    { name: 'Total Students', value: '124' },
    { name: 'Active OJT Placements', value: '98' },
    { name: 'Pending Reports', value: '12' },
    { name: 'System Notifications', value: '5' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500">
          Overview of the OJT tracking system
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm text-gray-600">New student registered</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm text-gray-600">Weekly report submitted</p>
              <p className="text-xs text-gray-400">5 hours ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm text-gray-600">OJT placement updated</p>
              <p className="text-xs text-gray-400">Yesterday</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Authentication</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Services</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 