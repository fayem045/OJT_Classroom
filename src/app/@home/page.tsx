'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function ClassroomsRouter() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded || !userId) {
      router.push('/sign-in');
      return;
    }

    async function checkUserAndRedirect() {
      try {
        const res = await fetch(`/api/users/check-role?clerkId=${userId}`);
        const data = await res.json();
        
        if (!data.exists) {
          router.push('/');
        }
      } catch (error) {
        console.error("Error checking user:", error);
        router.push("/");
      }
    }

    checkUserAndRedirect();
  }, [userId, isLoaded, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
}