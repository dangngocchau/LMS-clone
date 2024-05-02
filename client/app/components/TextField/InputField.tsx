import ErrorMessage from '@/app/components/Typography/ErrorMessage';
import FieldLabel from '@/app/components/Typography/FieldLabel';
import { Field } from 'formik';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  name: string;
  errors: any;
  touched: any;
  className?: string;
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
        className={twMerge(
          'w-full text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none mt-[10px] font-Poppins',
          isError && 'border-red-500',
          className
        )}
      />
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default InputField;
