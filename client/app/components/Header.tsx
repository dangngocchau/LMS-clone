'use client';
import NavItems from '@/app/utils/NavItems';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import Image from 'next/image';
import CustomModal from '@/app/utils/CustomModal';
import Login from '@/app/components/Auth/Login';
import SignUp from '@/app/components/Auth/SignUp';
import Verification from '@/app/components/Auth/Verification';
import { useAppSelector } from '@/app/hooks/reduxHook';
import { RxAvatar } from 'react-icons/rx';
import avatar from '@/public/assets/avatar.png';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import useAuth from '@/app/hooks/userAuth';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const pathName = usePathname();

  const { user } = useAppSelector((state) => state.auth);
  const isUserLogin = useAuth();

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleCloseSidebar = (event: any) => {
    if (event.target.id === 'screen') {
      setOpenSidebar(false);
    }
  };

  return (
    <div className='w-full relative'>
      <div
        className={`${
          active
            ? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'
            : 'w-full border-b dark:boder-[#ffffff1c] h-[80px] z-[80] dark:shadow'
        }`}
      >
        <div className='800px:w-[92%] m-auto py-2 h-full '>
          <div className='w-full flex items-center justify-between p-3'>
            <div>
              <Link
                href={'/'}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                <Image
                  src={'/assets/logo.svg'}
                  alt=''
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div className='flex items-center'>
              <NavItems
                activeItem={activeItem}
                pathName={String(pathName)}
                isMobile={false}
              />
              <ThemeSwitcher />
              {/* Only For Mobile */}
              <div className='800px:hidden'>
                <HiOutlineMenuAlt3
                  size={25}
                  className='cursor-pointer dark:text-white text-black '
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {isUserLogin ? (
                <Link href={'/profile'}>
                  <Image
                    src={user?.avatar?.url ? user?.avatar?.url : avatar}
                    alt=''
                    width={30}
                    height={30}
                    className={twMerge(
                      'w-[30px] h-[30px] rounded-full',
                      String(pathName) === '/profile' &&
                        'border-[2px] border-solid border-[#37a39a]'
                    )}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className='hidden 800px:block cursor-pointer dark:text-white text-black'
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile side bar */}
        {openSidebar && (
          <div
            className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]'
            onClick={handleCloseSidebar}
            id='screen'
          >
            <div className='w-[70%] fixed z-[9999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
              <NavItems
                activeItem={activeItem}
                pathName={String(pathName)}
                isMobile={true}
              />
              <HiOutlineUserCircle
                size={25}
                className='cursor-pointer ml-5 my-2 text-black dark:text-white'
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                Copyright Chau Dang
              </p>
            </div>
          </div>
        )}
      </div>
      {route === 'Login' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {route === 'Sign-Up' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === 'Verification' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
