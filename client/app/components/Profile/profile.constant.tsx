import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import React, { ComponentType, FC } from 'react';
import ProfileInfo from '@/app/components/Profile/ProfileInfo';
import TextTitle from '@/app/components/Typography/TextTitle';

export interface ISideBarProfileConst {
  name: JSX.Element;
  icon: React.ElementType | null;
  id: number;
  component?: ComponentType | null;
}

export const SideBarProfileConst: ISideBarProfileConst[] = [
  {
    name: <TextTitle title='My Account' />,
    icon: null,
    id: 1,
    component: ProfileInfo,
  },
  {
    name: <TextTitle title='Change Password' />,
    icon: RiLockPasswordLine,
    id: 2,
  },
  {
    name: <TextTitle title='Enroll Courses' />,
    icon: SiCoursera,
    id: 3,
  },
  {
    name: <TextTitle title='Logout' />,
    icon: AiOutlineLogout,
    id: 4,
  },
];
