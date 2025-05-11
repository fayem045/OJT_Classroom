'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import Loading from '@/components/Loading';

export default function ClassroomPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.replace('/');
        return;
      }
      
      // Get role from metadata or default to 'student'
      const role = user?.unsafeMetadata.role as string || 'student';
      
      // Redirect based on role
      if (role === 'student') {
        router.replace('/classrooms/student');
      } else if (role === 'admin' || role === 'professor') {
        router.replace('/classrooms/admin');
      } else {
        router.replace('/role-selection');
      }
    }
  }, [user, isLoaded, router]);
  
  return <Loading />;
}