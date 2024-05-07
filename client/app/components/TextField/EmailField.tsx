import React, { FC } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { ILogin } from '@/app/components/Auth/IAuth.interface';
import clsx from 'clsx';
import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';
import { twMerge } from 'tailwind-merge';

type Props = {
  errors: FormikErrors<ILogin>;
  touched: FormikTouched<ILogin>;
  className?: string;
  disabled?: boolean;
};

const EmailField: FC<Props> = ({
  errors,
  touched,
  className,
  disabled = false,
}) => {
  const isError = errors.email && touched.email;

  return (
    <div className='w-full mt-5 relative mb-1'>
      <FieldLabel htmlFor='email' label='Email' />
      <Field
        type='email'
        name='email'
        id='email'
        disabled={disabled}
        placeholder='example@gmail.com'
        className={twMerge(
          'w-full text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none mt-[10px] font-Poppins',
          isError && 'border-red-500',
          className
        )}
      />
      {errors.email && touched.email && <ErrorMessage message={errors.email} />}
    </div>
  );
};

export default EmailField;
