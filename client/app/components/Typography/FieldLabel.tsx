import React, { FC } from 'react';

type Props = {
  label: string;
  htmlFor: string;
};

const FieldLabel: FC<Props> = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className='text-[16px] font-Poppins text-black dark:text-white'
    >
      {label}
    </label>
  );
};

export default FieldLabel;
