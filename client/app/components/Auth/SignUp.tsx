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
import InputField from '@/app/components/TextField/InputField';
import EmailField from '@/app/components/TextField/EmailField';
import PasswordField from '@/app/components/TextField/PasswordField';
import SubmitButton from '@/app/components/Button/SubmitButton';
import AuthFooter from '@/app/components/Auth/AuthFooter';
import SocialAuth from '@/app/components/Auth/SocialAuth';

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name !'),
  email: Yup.string()
    .email('Invalid email !')
    .required('Please enter your email !'),
  password: Yup.string().required('Please enter your password !'),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState<boolean>(false);
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
        onSubmit={({ email, password }) => {
          setRoute('Verification');
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
            <SubmitButton label='Register' />
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
