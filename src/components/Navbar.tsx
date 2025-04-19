'use client';

import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="text-blue-600 font-bold text-3xl tracking-tight">TTD</span>
            </div>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <span className="text-gray-600 text-sm font-medium hidden sm:block">Web-base tracker</span>
          </div>

          {/* Center - Title */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <h1 className="text-gray-800 font-semibold text-lg">Welcome TrainTrackDesk</h1>
              <p className="text-gray-500 text-sm mt-0.5">We Make your Progress Traceability</p>
            </div>
          </div>

          {/* Right - Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/classrooms" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
              Classrooms
            </Link>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-gray-50 rounded-full hover:bg-gray-100">
              <FaUser className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;