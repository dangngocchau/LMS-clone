import React, { FC } from 'react';

type Props = {
  label: string;
};

const FieldLabel: FC<Props> = ({ label }) => {
  return (
    <label
      htmlFor='password'
      className='text-[16px] font-Poppins text-black dark:text-white'
    >
      {label}
    </label>
  );
};

export default FieldLabel;
