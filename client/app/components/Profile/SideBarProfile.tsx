import {
  ISideBarProfileConst,
  SideBarProfileConst,
} from '@/app/components/Profile/profile.constant';
import avatarDefault from '@/public/assets/avatar.png';
import Image from 'next/image';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  user: any;
  active: ISideBarProfileConst;
  setActive: (active: ISideBarProfileConst) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className='w-full'>
      {SideBarProfileConst.map((item, index) => {
        return (
          <div
            key={index}
            className={twMerge(
              'w-full flex items-center px-3 py-4 cursor-pointer font-Poppins',
              active.id === item.id
                ? 'dark:bg-slate-800 bg-white'
                : 'bg-transparent'
            )}
            onClick={
              item.id !== 4 ? () => setActive(item) : () => logOutHandler()
            }
          >
            {item.id === 1 && (
              <Image
                src={user.avatar ? user.avatar : avatarDefault}
                alt=''
                className='w-[30px] h-[30px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
              />
            )}
            {item.icon && <item.icon size={20} fill='#fff' />}
            <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
              {item.name}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarProfile;
