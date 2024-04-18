import { ILogout } from '@/app/components/Auth/IAuth.interface';
import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';
import clsx from 'clsx';
import { Field, FormikErrors, FormikTouched } from 'formik';
import React, { FC } from 'react';

type Props = {
  label: string;
  name: string;
  errors: any;
  touched: any;
  className: string;
  placeHolder?: string;
};

const InputField: FC<Props> = ({
  label,
  name,
  errors,
  touched,
  className,
  placeHolder,
}) => {
  const isError = errors[name] && touched[name];

  return (
    <div className='w-full mt-5 relative mb-1'>
      <FieldLabel htmlFor={name} label={label} />
      <Field
        type='text'
        name={name}
        id={name}
        placeholder={placeHolder}
        className={clsx(className, {
          'border-red-500': isError,
        })}
      />
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default InputField;
