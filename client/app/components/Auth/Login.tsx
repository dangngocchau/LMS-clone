import React, { FC, useState } from 'react';
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

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: validateEmail,
  password: validatePassword,
});

const Login: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const initialValues: ILogin = {
    email: '',
    password: '',
  };

  return (
    <div className='w-full'>
      <h1 className={`${style.title}`}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={({ email, password }) => console.log(email, password)}
      >
        {({ errors, touched }) => (
          <Form>
            <EmailField
              className={style.input}
              label='Enter your email'
              errors={errors}
              touched={touched}
            />
            <PasswordField
              className={style.input}
              label='Enter your email'
              errors={errors}
              touched={touched}
            />
            <SubmitButton label='Login' />
            <AuthFooter
              message='Not have any account?'
              label='Sign Up'
              route='Sign-Up'
              setRoute={setRoute}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
