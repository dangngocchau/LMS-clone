import React, { FC, useState } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { ILogin } from '@/app/components/Auth/IAuth.interface';
import clsx from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';
import { twMerge } from 'tailwind-merge';

type Props = {
  errors: FormikErrors<ILogin>;
  touched: FormikTouched<ILogin>;
  className?: string;
};

const PasswordField: FC<Props> = ({ errors, touched, className }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleToggleIcon = () => {
    setShow(!show);
  };

  return (
    <>
      <div className='w-full mt-5 relative mb-1'>
        <FieldLabel htmlFor='password' label='Password' />
        <Field
          type={!show ? 'password' : 'text'}
          name='password'
          id='password'
          placeholder='passsword!@#'
          // className={clsx('w-full text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none mt-[10px] font-Poppins', {
          //   'border-red-500': errors.password && touched.password,
          //   className
          // })}
          className={twMerge(
            'w-full text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none mt-[10px] font-Poppins',
            errors.password || (touched.password && 'border-red-500', className)
          )}
        />
        {!show ? (
          <AiOutlineEyeInvisible
            className='absolute bottom-3 right-2 z-1 cursor-pointer'
            size={20}
            onClick={handleToggleIcon}
          />
        ) : (
          <AiOutlineEye
            className='absolute bottom-3 right-2 z-1 cursor-pointer'
            size={20}
            onClick={handleToggleIcon}
          />
        )}
      </div>
      {errors.password && touched.password && (
        <ErrorMessage message={errors.password} />
      )}
    </>
  );
};

export default PasswordField;
