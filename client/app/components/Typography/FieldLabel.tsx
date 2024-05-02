import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  htmlFor: string;
  className?: string;
};

const FieldLabel: FC<Props> = ({ label, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        'text-[16px] w-full block font-Poppins text-black dark:text-white',
        className
      )}
    >
      {label}
    </label>
  );
};

export default FieldLabel;
