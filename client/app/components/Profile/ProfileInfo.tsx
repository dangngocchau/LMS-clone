import Image from 'next/image';
import React, { ChangeEvent, FC, useEffect } from 'react';
import avatarDefault from '@/public/assets/avatar.png';
import { AiOutlineCamera } from 'react-icons/ai';
import { Form, Formik } from 'formik';
import InputField from '@/app/components/TextField/InputField';
import EmailField from '@/app/components/TextField/EmailField';
import { style } from '@/app/styles/style';
import SubmitButton from '@/app/components/Button/SubmitButton';
import { validateEmail, validateName } from '@/app/utils/Validation';
import * as Yup from 'yup';
import { useAppSelector } from '@/app/hooks/reduxHook';
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { IProfileUpdateForm } from '@/app/components/Profile/profileInterface';
import toast from 'react-hot-toast';

type Props = {
  avatar: string | null;
  user: any;
};

const schema = Yup.object().shape({
  name: validateName,
  email: validateEmail,
});

const ProfileInfo: FC<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateAvatar, { isLoading, error, isSuccess }] =
    useUpdateAvatarMutation();
  const { refetch } = useLoadUserQuery(undefined);
  const [
    editProfile,
    { isLoading: isEditProfileLoading, error: editProfileError },
  ] = useEditProfileMutation();

  const initialValues: IProfileUpdateForm = {
    name: user?.name,
    email: user?.email,
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;

          updateAvatar(avatar);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (formValue: IProfileUpdateForm) => {
    const { name, email } = formValue;
    if (name !== '') {
      await editProfile({
        name,
      });
    }
  };

  useEffect(() => {
    if (isSuccess || isEditProfileLoading) {
      refetch();
      toast.success('Update Successfully');
    }
    if (error || editProfileError) {
      console.log('Error when update avatar');
    }
  }, [isSuccess, refetch, error, isEditProfileLoading, editProfileError]);

  return (
    <>
      <div className='w-full flex justify-center items-center flex-col'>
        <div className='relative'>
          <Image
            src={user?.avatar ? user?.avatar?.url : avatarDefault}
            alt=''
            width={120}
            height={120}
            className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
          />
          <input
            type='file'
            name=''
            id='avatar'
            className='hidden'
            onChange={handleChangeImage}
            accept='image/png,image/jpg,image/jpeg,image/webp'
          />
          <label htmlFor='avatar'>
            <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute top-[5.5rem] right-2 flex items-center justify-center cursor-pointer'>
              <AiOutlineCamera size={20} className='z-1' />
            </div>
          </label>
        </div>
        <div className='w-full pl-6 800px:pl-10 flex justify-center'>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className='w-[50%]'>
                <InputField
                  errors={errors}
                  touched={touched}
                  name='name'
                  label='Name'
                  placeHolder='Enter Your Name'
                />
                <EmailField errors={errors} touched={touched} />
                <SubmitButton label='Update' isLoading={false} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <br />
      <br />
      {/* <div className='w-full pl-6 800px:pl-10'>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={() => console.log(1)}
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
              <SubmitButton label='Update' isLoading={false} />
            </Form>
          )}
        </Formik>
      </div> */}
    </>
  );
};

export default ProfileInfo;
