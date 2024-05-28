'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHook';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { isUserLogin } from '@/redux/features/auth/authSlice';
import { useEffect } from 'react';

export default function useAuth() {
  const { user } = useAppSelector((state) => state.auth);
  const { refetch } = useLoadUserQuery(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    if (token) {
      refetch();
    }
  }, [refetch]);

  return user;
}
