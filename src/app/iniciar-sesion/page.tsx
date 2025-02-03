'use client';
import { useEffect } from 'react';
import Navbar from '@/components/molecules/Navbar';
import LoginForm from '@/components/organisms/LoginForm';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isReady = useAppSelector((state) => state.auth.isReady);

  useEffect(() => {
    if (isAuthenticated && isReady) {
      router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <main>
      <Navbar />
      <LoginForm />
    </main>
  );
}

