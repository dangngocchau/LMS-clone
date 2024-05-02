import React, { FC } from 'react';

type Props = {
  title: string;
};

const NormalText: FC<Props> = ({ title }) => {
  return (
    <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
      {title}
    </h5>
  );
};

export default NormalText;
