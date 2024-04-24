import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '@/public/assets/avatar.png';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className='w-full'>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? 'bg-slate-800' : 'bg-transparent'
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar || avatar : avatarDefault}
          alt=''
          className='w-[30px] h-[30px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
        />
        <h5 className='pl-2 800px:block hidden'>My Accounnt</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
