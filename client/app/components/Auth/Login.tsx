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

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email !')
    .required('Please enter your email !'),
  password: Yup.string().required('Please enter your password !'),
});

const Login: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  // const { errors, touched, values, handleChange, handleSubmit } = formik;

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
            <label htmlFor='email' className={`${style.label}`}>
              Enter Your Email
            </label>
            <Field
              type='email'
              name='email'
              id='email'
              placeholder='example@gmail.com'
              className={`${
                errors.email && touched.email && 'border-red-500'
              } ${style.input}`}
            />
            {errors.email && touched.email && (
              <span className='text-red-500 pt-2 block'>{errors.email}</span>
            )}
            <div className='w-full mt-5 relative mb-1'>
              <label htmlFor='password' className={`${style.label}`}>
                Enter Your Password
              </label>
              <Field
                type={!show ? 'password' : 'text'}
                name='password'
                id='password'
                placeholder='passsword!@#'
                className={`${
                  errors.password && touched.password && 'border-red-500'
                } ${style.input}`}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className='absolute bottom-3 right-2 z-1 cursor-pointer'
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className='absolute bottom-3 right-2 z-1 cursor-pointer'
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
              {errors.password && touched.password && (
                <span className='text-red-500 pt-2 block'>
                  {errors.password}
                </span>
              )}
            </div>
            <div className='w-full mt-5'>
              <input
                type='submit'
                value='Login'
                className={`${style.button}`}
              />
            </div>
            <br />
            <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
              Or join with
            </h5>
            <div className='flex items-center justify-center my-3'>
              <FcGoogle size={30} className='ml-2 cursor-pointer' />
              <AiFillGithub size={30} className='ml-2 cursor-pointer' />
            </div>
            <h5 className='pt-4 text-center font-Poppins text-[14px]'>
              Not have any account?
              <span
                className='text-[#2190ff] pl-1 cursor-pointer'
                onClick={() => setRoute('Sign-Up')}
              >
                Sign up
              </span>
            </h5>
          </Form>
        )}
      </Formik>
    </div>
  );
  // return (
  //   <div className='w-full'>
  //     <h1 className={`${style.title}`}>Login</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor='email' className={`${style.label}`}>
  //         Enter Your Email
  //       </label>
  //       <input
  //         type='email'
  //         name='email'
  //         value={values.email}
  //         onChange={handleChange}
  //         id='email'
  //         placeholder='example@gmail.com'
  //         className={`${errors.email && touched.email && 'border-red-500'} ${
  //           style.input
  //         }`}
  //       />
  //       {errors.email && touched.email && (
  //         <span className='text-red-500 pt-2 block'>{errors.email}</span>
  //       )}
  //       <div className='w-full mt-5 relative mb-1'>
  //         <label htmlFor='password' className={`${style.label}`}>
  //           Enter Your Password
  //         </label>
  //         <input
  //           type={!show ? 'password' : 'text'}
  //           name='password'
  //           value={values.password}
  //           onChange={handleChange}
  //           id='password'
  //           placeholder='passsword!@#'
  //           className={`${
  //             errors.password && touched.password && 'border-red-500'
  //           } ${style.input}`}
  //         />
  //         {!show ? (
  //           <AiOutlineEyeInvisible
  //             className='absolute bottom-3 right-2 z-1 cursor-pointer'
  //             size={20}
  //             onClick={() => setShow(true)}
  //           />
  //         ) : (
  //           <AiOutlineEye
  //             className='absolute bottom-3 right-2 z-1 cursor-pointer'
  //             size={20}
  //             onClick={() => setShow(false)}
  //           />
  //         )}
  //         {errors.password && touched.password && (
  //           <span className='text-red-500 pt-2 block'>{errors.password}</span>
  //         )}
  //       </div>
  //       <div className='w-full mt-5'>
  //         <input type='submit' value='Login' className={`${style.button}`} />
  //       </div>
  //       <br />
  //       <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
  //         Or join with
  //       </h5>
  //       <div className='flex items-center justify-center my-3'>
  //         <FcGoogle size={30} className='ml-2 cursor-pointer' />
  //         <AiFillGithub size={30} className='ml-2 cursor-pointer' />
  //       </div>
  //       <h5 className='pt-4 text-center font-Poppins text-[14px]'>
  //         Not have any account?
  //         <span
  //           className='text-[#2190ff] pl-1 cursor-pointer'
  //           onClick={() => setRoute('Sign-Up')}
  //         >
  //           Sign up
  //         </span>
  //       </h5>
  //     </form>
  //   </div>
  // );
};

export default Login;
