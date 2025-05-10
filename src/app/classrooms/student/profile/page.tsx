import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function StudentProfilePage() {
  const { userId } = await auth();
  
  // Redirect to sign-in if not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-gray-500">
          Manage your account and OJT information
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-sm text-blue-600 mt-2">Student</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <p className="mt-1">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium mb-4">OJT Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <p className="mt-1 text-gray-500">Not set</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <p className="mt-1 text-gray-500">Not set</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <p className="mt-1 text-gray-500">Not set</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <p className="mt-1 text-gray-500">Not set</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 