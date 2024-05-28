'use client';
import useAuth from '@/app/hooks/userAuth';
import { redirect } from 'next/navigation';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = useAuth();
  if (isAuthenticated !== '') {
    return isAuthenticated ? children : redirect('/');
  }
}
