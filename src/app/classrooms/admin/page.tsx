'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import Loading from '@/components/Loading';

export default function AdminPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.replace('/sign-in');
      } else {
        router.replace('/classrooms/admin/dashboard');
      }
    }
  }, [userId, isLoaded, router]);

  return <Loading />;
} 