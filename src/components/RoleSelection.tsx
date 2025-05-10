'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function RoleSelection() {
  const { user } = useUser();
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update Clerk user metadata
      await user?.update({
        unsafeMetadata: {
          role: role,
        },
      });

      // Update database
      const response = await fetch('/api/users/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role in database');
      }

      router.push("/classrooms");
    } catch (error) {
      console.error("Error setting role:", error);
      alert("Failed to set role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src="/images/UA-Logo.png"
              alt="UA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome to TrainTrackDesk</h2>
          <p className="text-gray-600 text-center mt-2">Please select your role to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                role === "student" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setRole("student")}
            >
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                className="hidden"
              />
              <label htmlFor="student" className="cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className={`font-medium ${role === "student" ? "text-blue-600" : "text-gray-700"}`}>
                    Student
                  </span>
                  <p className="text-sm text-gray-500">Track your OJT progress</p>
                </div>
              </label>
            </div>

            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                role === "professor" || role === "admin" 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setRole("professor")}
            >
              <input
                type="radio"
                id="professor"
                name="role"
                value="professor"
                checked={role === "professor" || role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="hidden"
              />
              <label htmlFor="professor" className="cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className={`font-medium ${role === "professor" || role === "admin" ? "text-blue-600" : "text-gray-700"}`}>
                    Professor/Admin
                  </span>
                  <p className="text-sm text-gray-500">Supervise, evaluate & manage system</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
              transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              font-medium text-lg shadow-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting up your account...
              </span>
            ) : (
              "Continue to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}