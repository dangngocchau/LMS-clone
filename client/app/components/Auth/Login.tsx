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
import { ILogin } from '@/app/components/Auth/IAuth.interface';
import EmailField from '@/app/components/TextField/EmailField';
import { validateEmail, validatePassword } from '@/app/utils/Validation';
import PasswordField from '@/app/components/TextField/PasswordField';
import SubmitButton from '@/app/components/Button/SubmitButton';
import AuthFooter from '@/app/components/Auth/AuthFooter';
import SocialAuth from '@/app/components/Auth/SocialAuth';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/app/hooks/reduxHook';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: validateEmail,
  password: validatePassword,
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);

  const initialValues: ILogin = {
    email: '',
    password: '',
  };

  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();

  const handleSubmit = async (loginForm: ILogin) => {
    const { email, password } = loginForm;
    await login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login Successfully!');
      setOpen(false);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, setOpen]);

  return (
    <div className='w-full'>
      <h1 className={`${style.title}`}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
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
            <SubmitButton label='Login' isLoading={isLoading} />
            <AuthFooter
              message='Not have any account?'
              label='Sign Up'
              route='Sign-Up'
              setRoute={setRoute}
            />
            <SocialAuth setRoute={setRoute} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
