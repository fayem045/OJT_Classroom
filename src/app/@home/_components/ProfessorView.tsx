'use client';

import { useState, useEffect } from 'react';
import { Users, Book, FileCheck, Video, Bell, UserPlus, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
}

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  meetingUrl: string;
}

interface Report {
  id: number;
  title: string;
  status: string;
  studentName: string;
  createdAt?: string;
}

interface Classroom {
  id: number;
  name: string;
  description: string;
  professor: {
    id: number;
    email: string;
  };
}

export default function ProfessorView() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [completedEvals, setCompletedEvals] = useState(0);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // First fetch classrooms
      console.log("Fetching classrooms...");
      const classroomsResponse = await fetch('/api/admin/companies/classrooms');
      
      if (!classroomsResponse.ok) {
        throw new Error(`Failed to fetch classrooms: ${classroomsResponse.status} ${classroomsResponse.statusText}`);
      }
      
      const classroomsData = await classroomsResponse.json();
      console.log("Classrooms API response:", classroomsData);
      
      // Handle both array or object with classrooms property
      const classroomsArray = Array.isArray(classroomsData) 
        ? classroomsData 
        : classroomsData.classrooms || [];
      
      console.log("Processed classrooms:", classroomsArray);
      setClassrooms(classroomsArray);

      // If we have at least one classroom
      let classroomId = null;
      if (classroomsArray.length > 0) {
        classroomId = classroomsArray[0].id;
        console.log("Selected classroom ID:", classroomId);

        // Fetch classroom details to get students
        console.log("Fetching classroom details...");
        const studentsRes = await fetch(`/api/admin/companies/classrooms/${classroomId}`);
        
        if (studentsRes.ok) {
          const classroomData = await studentsRes.json();
          console.log("Classroom data:", classroomData);
          
          const studentsArray = classroomData.students || [];
          console.log("Students array:", studentsArray);
          
          setStudents(studentsArray);
          setTotalStudents(studentsArray.length);
        } else {
          console.error("Failed to fetch classroom details:", await studentsRes.text());
        }

        // Fetch reports
        console.log("Fetching reports...");
        const reportsRes = await fetch(`/api/student/reports?classroomId=${classroomId}`);
        
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          console.log("Reports data:", reportsData);
          
          setReports(reportsData || []);
          
          // Count pending reports
          const pending = reportsData.filter((report: any) => 
            report.status === 'submitted' || report.status === 'pending'
          ).length;
          console.log("Pending reports:", pending);
          setPendingReports(pending);
          
          // Count completed evaluations
          const completed = reportsData.filter((report: any) =>
            report.status === 'approved' || report.status === 'rejected'
          ).length;
          console.log("Completed evaluations:", completed);
          setCompletedEvals(completed);
        } else {
          console.error("Failed to fetch reports:", await reportsRes.text());
        }

        // Fetch meetings
        console.log("Fetching meetings...");
        const meetingsRes = await fetch(`/api/prof/meetings?classroomId=${classroomId}`);
        
        if (meetingsRes.ok) {
          const meetingsData = await meetingsRes.json();
          console.log("Meetings data:", meetingsData);
          setMeetings(meetingsData || []);
        } else {
          console.error("Failed to fetch meetings:", await meetingsRes.text());
        }
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchDashboardData();
    }
  }, [isLoaded, user]);

  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'No date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };

  if (!isLoaded || loading) {
    return (
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      </main>
    );
  }

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
          <p className="text-3xl font-bold text-gray-900">{totalStudents || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Active trainees</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Book className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{pendingReports || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Pending reviews</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <FileCheck className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Evaluations</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{completedEvals || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Completed this semester</p>
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
                <Link href="/companies" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <UserPlus className="w-5 h-5" />
                  <span>Manage Students</span>
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {students && students.length > 0 ? (
                  students.slice(0, 5).map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {student.name || student.email?.split('@')[0] || `Student ${student.id}`}
                        </h3>
                        <p className="text-sm text-gray-600">{student.email || 'No email'}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${student.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{student.progress || 0}%</span>
                        </div>
                        {classrooms.length > 0 && (
                          <Link 
                            href={`/companies/${classrooms[0]?.id}`} 
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No students found</p>
                )}

                {students.length > 5 && (
                  <div className="text-center mt-2">
                    <Link href="/companies" className="text-blue-600 hover:text-blue-700 text-sm">
                      View all students
                    </Link>
                  </div>
                )}
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
              {meetings && meetings.length > 0 ? (
                meetings.slice(0, 3).map(meeting => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{meeting.title || 'Untitled Meeting'}</h3>
                      <p className="text-sm text-gray-600">{formatDate(meeting.date)} at {meeting.time || 'TBD'}</p>
                    </div>
                    {meeting.meetingUrl && (
                      <a
                        href={meeting.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Join
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No upcoming meetings</p>
              )}

              {meetings.length > 3 && (
                <div className="text-center mt-2">
                  <Link href="/companies" className="text-blue-600 hover:text-blue-700 text-sm">
                    View all meetings
                  </Link>
                </div>
              )}
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
              <Link href="/companies" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center">
                Manage Classrooms
              </Link>
              <Link href="/reports" className="block w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-center">
                Review Reports
              </Link>
              <Link href="/students" className="block w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-center">
                View All Students
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}