import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminStudentsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data for demonstration
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'ABC Corp', progress: 65 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'XYZ Inc', progress: 42 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', company: 'Tech Solutions', progress: 78 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', company: 'Digital Systems', progress: 23 },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', company: 'Innovate Ltd', progress: 91 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
        <p className="text-gray-500">
          View and manage student OJT records
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium">Students</h2>
            <div className="mt-3 sm:mt-0">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add Student
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          student.progress >= 70 ? 'bg-green-600' : 
                          student.progress >= 40 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{student.progress}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 5 of 5 students
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 