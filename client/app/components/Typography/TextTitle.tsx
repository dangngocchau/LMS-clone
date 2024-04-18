import React, { FC } from 'react';

type Props = {
  title: string;
};

const TextTitle: FC<Props> = ({ title }) => {
  return (
    <h1 className='text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2'>
      {title}
    </h1>
  );
};

export default TextTitle;
