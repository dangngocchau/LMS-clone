import React, { FC, useState } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { ILogin } from '@/app/components/Auth/IAuth.interface';
import clsx from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';
import { twMerge } from 'tailwind-merge';

type Props = {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  className?: string;
  isHiddenPassword?: boolean;
  name: string;
  id: string;
  label: string;
};

const CustomPasswordField: FC<Props> = ({
  errors,
  touched,
  className,
  isHiddenPassword = false,
  name,
  id,
  label,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const isError = errors[name] && touched[name];

  console.log();

  const handleToggleIcon = () => {
    setShow(!show);
  };

  return (
    <>
      <div className='w-full mt-5 relative mb-1'>
        <FieldLabel htmlFor={name} label={label} />
        <Field
          type={!show ? 'password' : 'text'}
          name={name}
          id={id}
          placeholder='passsword!@#'
          className={twMerge(
            'w-full text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none mt-[10px] font-Poppins',
            isError && 'border-red-500',
            className
          )}
        />
        {isHiddenPassword &&
          (!show ? (
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
          ))}
      </div>
      {errors[name] && touched[name] && (
        <ErrorMessage message={errors[name] as string} />
      )}
    </>
  );
};

export default CustomPasswordField;
