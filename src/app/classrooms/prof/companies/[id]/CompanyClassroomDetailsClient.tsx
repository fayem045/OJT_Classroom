'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Building2, Users, Calendar, Clock, FileText, UserPlus } from 'lucide-react';
import Link from 'next/link';
import StudentInviteModal from '../components/StudentInviteModal';
import InviteCodeButton from '../components/InviteCodeButton';

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
}

interface CompanyClassroom {
  id: number;
  name: string;
  description: string;
  professor: {
    id: number;
    email: string;
  };
  createdAt: Date;
  isActive: boolean;
  students: Student[];
}

interface CompanyClassroomDetailsClientProps {
  id: string;
}

export default function CompanyClassroomDetailsClient({ id }: CompanyClassroomDetailsClientProps) {
  const router = useRouter();
  const { userId } = useAuth();
  const [classroom, setClassroom] = useState<CompanyClassroom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const fetchClassroomDetails = async () => {
    try {
      const response = await fetch(`/api/admin/companies/classrooms/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch classroom details');
      }
      const data = await response.json();
      setClassroom(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchClassroomDetails();
    }
  }, [userId, id]);

  if (!userId) {
    router.push('/sign-in');
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Classroom not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/classrooms/prof/companies"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-2"
        >
          ← Back to Classrooms
        </Link>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">{classroom.name}</h1>
              <p className="text-gray-500 mt-1">Created by {classroom.professor.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <InviteCodeButton classroomId={classroom.id} />
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Add Students
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Classroom Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{classroom.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created By</h3>
                <p className="mt-1 text-gray-900">{classroom.professor.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created On</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(classroom.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      classroom.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {classroom.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Students</h2>
              <button
                onClick={() => setShowInviteModal(true)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Students
              </button>
            </div>
            {classroom.students && classroom.students.length > 0 ? (
              <div className="space-y-4">
                {classroom.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{student.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Yet</h3>
                <p className="text-gray-500">
                  Share the invite code with students or add them directly.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Schedule</h2>
            </div>
            <p className="text-gray-500">No schedule set</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Time Tracking</h2>
            </div>
            <p className="text-gray-500">No time entries yet</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Reports</h2>
            </div>
            <p className="text-gray-500">No reports submitted</p>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <StudentInviteModal
          classroomId={classroom.id}
          onClose={() => setShowInviteModal(false)}
          onSuccess={() => {
            fetchClassroomDetails();
          }}
        />
      )}
    </div>
  );
} 