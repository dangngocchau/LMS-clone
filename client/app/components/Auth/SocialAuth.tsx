import React, { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

type Props = {
  setRoute: (route: string) => void;
};

const SocialAuth: FC<Props> = ({ setRoute }) => {
  return (
    <div className='border-t dark:border-white border-gray-300 py-4'>
      <div className='flex items-center justify-center my-3 gap-5 '>
        <div className='flex items-center bg-white rounded px-2 py-1 dark:border border-2 cursor-pointer'>
          <FcGoogle size={30} />
          <span className='text-[14px] ml-1 text-black font-Josefin font-[500]'>
            Sign in with Google
          </span>
        </div>
        <div className='flex items-center bg-white rounded px-2 py-1 dark:border border-2 cursor-pointer'>
          <AiFillGithub size={30} className=' text-black' />
          <span className='text-[14px] ml-1 text-black font-Josefin font-[500]'>
            Sign in with GitHub
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;
