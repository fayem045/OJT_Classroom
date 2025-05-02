'use client';

import { Calendar, LineChart, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Calendar, label: 'Calendar', href: '/classrooms/calendar' },
  { icon: LineChart, label: 'Progress', href: '/classrooms/progress' },
  { icon: FileText, label: 'Reports', href: '/classrooms/reports' },
  { icon: User, label: 'About', href: '/classrooms/about' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Enrolled</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
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