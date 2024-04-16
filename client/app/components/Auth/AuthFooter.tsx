import React, { FC } from 'react';

type Props = {
  setRoute: (route: string) => void;
  message: string;
  label: string;
  route: string;
};

const AuthFooter: FC<Props> = ({ setRoute, label, message, route }) => {
  return (
    <h5 className='text-left ml-2 my-5 font-Poppins text-[14px] text-gray-500 dark:text-white'>
      {message}
      <span
        className='text-[#2190ff] pl-1 cursor-pointer'
        onClick={() => setRoute(route)}
      >
        {label}
      </span>
    </h5>
  );
};

export default AuthFooter;
