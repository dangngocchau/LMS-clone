import React, { FC } from 'react';

type Props = {
  label: string;
  className?: string;
};

const SubmitButton: FC<Props> = ({ label, className }) => {
  return (
    <div className='w-full mt-5'>
      <input
        type='submit'
        value={label}
        className={`flex flex-row justify-center items-center py-3 px-6 rounded-lg cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold + ${className}`}
      />
    </div>
  );
};

export default SubmitButton;
