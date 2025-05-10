'use client';

import { Calendar, LineChart, FileText, User, Users, Settings, Building, GraduationCap, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from "@clerk/nextjs";

const roleBasedNavItems = {
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/classrooms/student' },
    { icon: Calendar, label: 'Calendar', href: '/classrooms/student/calendar' },
    { icon: LineChart, label: 'Progress', href: '/classrooms/student/progress' },
    { icon: FileText, label: 'Reports', href: '/classrooms/student/reports' },
    { icon: User, label: 'Profile', href: '/classrooms/student/profile' },
  ],
  professor: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/classrooms/admin/dashboard' },
    { icon: Users, label: 'Students', href: '/classrooms/admin/students' },
    { icon: FileText, label: 'Reports', href: '/classrooms/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/classrooms/admin/settings' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/classrooms/admin/dashboard' },
    { icon: Users, label: 'Students', href: '/classrooms/admin/students' },
    { icon: FileText, label: 'Reports', href: '/classrooms/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/classrooms/admin/settings' },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = (user?.unsafeMetadata?.role as string) || 'student';
  const navItems = roleBasedNavItems[role as keyof typeof roleBasedNavItems] || roleBasedNavItems.student;

  return (
    <div className="w-64 min-h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Enrolled</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}