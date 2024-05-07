import { validatePassword } from '@/app/utils/Validation';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import InputField from '@/app/components/TextField/InputField';
import CustomPasswordField from '@/app/components/TextField/CustomPasswordField';
import SubmitButton from '@/app/components/Button/SubmitButton';
import { IChangePasswordForm } from '@/app/components/Profile/profileInterface';

type Props = {};

const schema = Yup.object().shape({
  oldPassword: validatePassword,
  newPassword: validatePassword,
  confirmPassword: validatePassword,
});

const ChangePassword = (props: Props) => {
  const initialValues: IChangePasswordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (form: IChangePasswordForm) => {
    console.log(form);
  };

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-white pb-2'>
        Change Password
      </h1>
      <div className='w-full flex justify-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form className='w-[50%]'>
              <CustomPasswordField
                errors={errors}
                touched={touched}
                name='oldPassword'
                id='oldPassword'
                label='Enter Your Old Password'
              />
              <CustomPasswordField
                errors={errors}
                touched={touched}
                name='newPassword'
                id='newPassword'
                label='Enter Your New Password'
              />
              <CustomPasswordField
                errors={errors}
                touched={touched}
                name='confirmPassword'
                id='confirmPassword'
                label='Enter Your Confirm Password'
              />
              <SubmitButton label='Change Password' isLoading={false} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
