import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import React, { ComponentType, FC, FunctionComponent, ReactNode } from 'react';
import ProfileInfo from '@/app/components/Profile/ProfileInfo';
import TextTitle from '@/app/components/Typography/TextTitle';
import NormalText from '@/app/components/Typography/NormalText';

export interface ISideBarProfileConst {
  name: JSX.Element;
  icon: React.ElementType | null;
  id: number;
  component?: FunctionComponent | null;
}

export const SideBarProfileConst: ISideBarProfileConst[] = [
  {
    name: <NormalText title='My Account' />,
    icon: null,
    id: 1,
    component: ProfileInfo,
  },
  {
    name: <NormalText title='Change Password' />,
    icon: RiLockPasswordLine,
    id: 2,
  },
  {
    name: <NormalText title='Enroll Courses' />,
    icon: SiCoursera,
    id: 3,
  },
  {
    name: <NormalText title='Logout' />,
    icon: AiOutlineLogout,
    id: 4,
  },
];
