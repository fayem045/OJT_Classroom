'use client';

import { Users, Building, GraduationCap, Settings, PieChart, UserPlus, BookOpen, Shield } from 'lucide-react';

export default function AdminView() {
  // Mock data for demonstration
  const stats = {
    totalStudents: 156,
    totalCompanies: 24,
    totalProfessors: 8,
    activeInternships: 89
  };

  const recentActivities = [
    { id: 1, type: 'student', action: 'New student registered', time: '2 hours ago' },
    { id: 2, type: 'company', action: 'New company partnership added', time: '5 hours ago' },
    { id: 3, type: 'professor', action: 'Professor evaluation submitted', time: '1 day ago' },
  ];

  return (
    <main className="flex-1 p-8">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">System Overview and Management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Students</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          <p className="text-sm text-gray-600 mt-1">Total registered</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Building className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Companies</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
          <p className="text-sm text-gray-600 mt-1">Partner organizations</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Professors</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalProfessors}</p>
          <p className="text-sm text-gray-600 mt-1">OJT supervisors</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Active OJTs</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.activeInternships}</p>
          <p className="text-sm text-gray-600 mt-1">Current internships</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors justify-center">
                <UserPlus className="w-5 h-5" />
                <span>Add New User</span>
              </button>
              <button className="w-full flex items-center space-x-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors justify-center">
                <Building className="w-5 h-5" />
                <span>Register Company</span>
              </button>
              <button className="w-full flex items-center space-x-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors justify-center">
                <Shield className="w-5 h-5" />
                <span>Manage Permissions</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <PieChart className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Load</span>
                  <span className="text-green-600 font-medium">Normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Storage Usage</span>
                  <span className="text-blue-600 font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Backup</span>
                  <span className="text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center and Right Columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    {activity.type === 'student' && <Users className="w-5 h-5 text-blue-600 mt-1" />}
                    {activity.type === 'company' && <Building className="w-5 h-5 text-blue-600 mt-1" />}
                    {activity.type === 'professor' && <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />}
                    <div>
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
