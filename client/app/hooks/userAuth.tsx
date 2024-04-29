'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHook';
import { isUserLogin } from '@/redux/features/auth/authSlice';
import { useEffect } from 'react';

export default function useAuth() {
  const { isUserLogin: isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    dispatch(isUserLogin({ token }));
  }, [dispatch]);

  return isAuth;
}
