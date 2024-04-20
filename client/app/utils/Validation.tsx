import * as Yup from 'yup';

export const validateEmail = Yup.string()
  .email('Invalid email !')
  .required('Please enter your email !');

export const validatePassword = Yup.string().required(
  'Please enter your password !'
);

export const validateName = Yup.string().required('Please enter your name !');
