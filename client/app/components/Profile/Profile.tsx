'use client';
import {
  ISideBarProfileConst,
  SideBarProfileConst,
} from '@/app/components/Profile/profile.constant';
import SideBarProfile from '@/app/components/Profile/SideBarProfile';
import { useAppSelector } from '@/app/hooks/reduxHook';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FC, useState } from 'react';

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState<ISideBarProfileConst>(
    SideBarProfileConst[0]
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const { refetch, isLoading } = useLogOutQuery(undefined, {
    skip: !isInitialized,
  });

  const logOutHandler = () => {
    setIsInitialized(true);
  };

  if (typeof window !== undefined) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className='w-[85%] flex mx-auto'>
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#0000001c] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? 'top-[120px]' : 'top-[30px]'
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active.component && <active.component />}
    </div>
  );
};

export default Profile;
