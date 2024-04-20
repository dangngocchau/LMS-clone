import React, { FC, useEffect, useState } from 'react';
import { useFormik, Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Email } from '@mui/icons-material';
import { style } from '@/app/styles/style';
import InputField from '@/app/components/TextField/InputField';
import EmailField from '@/app/components/TextField/EmailField';
import PasswordField from '@/app/components/TextField/PasswordField';
import SubmitButton from '@/app/components/Button/SubmitButton';
import AuthFooter from '@/app/components/Auth/AuthFooter';
import SocialAuth from '@/app/components/Auth/SocialAuth';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { IRegister } from '@/app/components/Auth/IAuth.interface';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/app/utils/Validation';

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: validateName,
  email: validateEmail,
  password: validatePassword,
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState<boolean>(false);
  const [register, { data, isSuccess, error, isLoading }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration successfull !';
      toast.success(message);
      setRoute('Verification');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  return (
    <div className='w-full'>
      <h1 className={`${style.title}`}>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async ({ name, email, password }) => {
          const data: IRegister = {
            name,
            email,
            password,
          };

          await register(data);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <InputField
              className={style.input}
              errors={errors}
              touched={touched}
              name='name'
              label='Name'
              placeHolder='Enter Your Name'
            />
            <EmailField
              className={style.input}
              errors={errors}
              touched={touched}
            />
            <PasswordField
              className={style.input}
              errors={errors}
              touched={touched}
            />
            <SubmitButton label='Register' isLoading={isLoading} />
            <AuthFooter
              message='Already have account ?'
              label='Login'
              route='Login'
              setRoute={setRoute}
            />
            <SocialAuth setRoute={setRoute} />
          </Form>
        )}
      </Formik>
      <br />
    </div>
  );
};

export default SignUp;
