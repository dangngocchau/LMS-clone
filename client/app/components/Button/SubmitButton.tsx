import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

const SubmitButton: FC<Props> = ({ label, className, isLoading, onClick }) => {
  return (
    <div className='w-full mt-5'>
      <button
        className={twMerge(
          'flex flex-row justify-center items-center py-3 px-6 rounded-lg cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold',
          isLoading && 'bg-gray-400',
          className
        )}
        disabled={isLoading}
        onClick={onClick}
        title={label}
        type='submit'
      >
        {isLoading ? <CircularProgress size={24} color='inherit' /> : label}
      </button>
    </div>
  );
};

export default SubmitButton;
