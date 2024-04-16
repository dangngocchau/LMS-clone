import React, { FC } from 'react';

type Props = {
  message: string;
};

const ErrorMessage: FC<Props> = ({ message }) => {
  return <span className='text-red-500 pt-2 block'>{message}</span>;
};

export default ErrorMessage;
