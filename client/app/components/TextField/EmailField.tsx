import React, { FC } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { ILogin } from '@/app/components/Auth/IAuth.interface';
import clsx from 'clsx';
import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';

type Props = {
  label: string;
  errors: FormikErrors<ILogin>;
  touched: FormikTouched<ILogin>;
  className: string;
};

const EmailField: FC<Props> = ({ label, errors, touched, className }) => {
  const isError = errors.email && touched.email;

  return (
    <div className='w-full mt-5 relative mb-1'>
      <FieldLabel label='Email' />
      <Field
        type='email'
        name='email'
        id='email'
        placeholder='example@gmail.com'
        className={clsx(className, {
          'border-red-500': isError,
        })}
      />
      {errors.email && touched.email && <ErrorMessage message={errors.email} />}
    </div>
  );
};

export default EmailField;
