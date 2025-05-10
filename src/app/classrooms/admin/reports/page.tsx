import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminReportsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data for demonstration
  const reports = [
    { id: 1, title: 'Weekly Progress Report', submittedBy: 'John Doe', date: '2025-05-01', status: 'approved' },
    { id: 2, title: 'Monthly Summary', submittedBy: 'Jane Smith', date: '2025-05-02', status: 'pending' },
    { id: 3, title: 'Project Documentation', submittedBy: 'Robert Johnson', date: '2025-05-03', status: 'approved' },
    { id: 4, title: 'Weekly Progress Report', submittedBy: 'Emily Davis', date: '2025-05-05', status: 'rejected' },
    { id: 5, title: 'Final Evaluation', submittedBy: 'Michael Wilson', date: '2025-05-08', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports Management</h1>
        <p className="text-gray-500">
          Review and manage student submissions
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium">Submitted Reports</h2>
            <div className="mt-3 sm:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.submittedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 5 of 5 reports
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
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Report Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Approved Reports</h3>
            <p className="text-2xl font-semibold mt-1">2</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="text-2xl font-semibold mt-1">2</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Rejected Reports</h3>
            <p className="text-2xl font-semibold mt-1">1</p>
          </div>
        </div>
      </div>
    </div>
  );
} 