import React, { FC } from 'react';

type Props = {
  title: string;
  onClick?: () => void;
};

const LargeButton: FC<Props> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold'
    >
      {title}
    </button>
  );
};

export default LargeButton;
