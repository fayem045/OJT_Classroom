'use client';

import { Users, Book, FileCheck, Video, Bell, UserPlus } from 'lucide-react';

export default function ProfessorView() {
  // Mock data for demonstration
  const classData = {
    students: [
      { id: 1, name: 'John Doe', company: 'Tech Corp', progress: 75 },
      { id: 2, name: 'Jane Smith', company: 'Dev Solutions', progress: 45 },
      { id: 3, name: 'Mike Johnson', company: 'Web Systems', progress: 90 },
    ],
    pendingReports: 5,
    upcomingMeetings: [
      { id: 1, title: 'Weekly Consultation', time: '2:00 PM', date: 'May 15, 2025' },
    ]
  };

  return (
    <main className="flex-1 p-8">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Professor Dashboard</h1>
        <p className="text-gray-600 mt-1">OJT Supervisor - Web Development Track</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600 mt-1">Active trainees</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Book className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{classData.pendingReports}</p>
          <p className="text-sm text-gray-600 mt-1">Pending reviews</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <FileCheck className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Evaluations</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-600 mt-1">Completed this week</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Student List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Students</h2>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <UserPlus className="w-5 h-5" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {classData.students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.company}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{student.progress}%</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Schedule & Actions */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Video className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
              </div>
            </div>
            <div className="p-6">
              {classData.upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                    <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Schedule Meeting
              </button>
              <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Review Reports
              </button>
              <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
