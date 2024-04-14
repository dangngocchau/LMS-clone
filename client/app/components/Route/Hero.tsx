import Image from 'next/image';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className='w-full h-[calc(100vh-80px)] justify-center items-center flex dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black'>
      <div className='flex flex-1 items-center justify-center'>
        <Image
          src={require('../../../public/assets/banner.jpg')}
          alt=''
          className='object-contain w-[50%] rounded-[10px] h-auto z-10'
        />
      </div>
      <div className='flex flex-1 flex-col items-start'>
        <h2 className='dark:text-white text-[#000000c7] text-[60px] px-3 font-[600] font-Josefin py-2'>
          Improve Your Online Learning Experience Instantly
        </h2>
        <p className='dark:text-white text-[#000000ac] font-Josefin font-[600] text-[18px] px-3 py-2'>
          We have 40k Online Courses & 500k+ Online registered student. Find
          your desired Courses from them.
        </p>
        <br />
        <div className='w-[70%] h-[50px] bg-transparent relative pl-3'>
          <input
            type='search'
            placeholder='Search Courses...'
            className='border bg-transparent dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] px-3 p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin'
          />
          <div className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'>
            <BiSearch className='text-white' size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
