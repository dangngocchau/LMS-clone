import SubmitButton from '@/app/components/Button/SubmitButton';
import { IProfileUpdateForm } from '@/app/components/Profile/profileInterface';
import EmailField from '@/app/components/TextField/EmailField';
import InputField from '@/app/components/TextField/InputField';
import { validateEmail, validateName } from '@/app/utils/Validation';
import avatarDefault from '@/public/assets/avatar.png';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from '@/redux/features/user/userApi';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';
import * as Yup from 'yup';

type Props = {
  avatar: string | null;
  user: any;
};

const schema = Yup.object().shape({
  name: validateName,
  email: validateEmail,
});

const ProfileInfo: FC<Props> = () => {
  const [updateAvatar, { isLoading, error, isSuccess }] =
    useUpdateAvatarMutation();
  const { data: user } = useLoadUserQuery(undefined);

  const [
    editProfile,
    {
      isLoading: isEditProfileLoading,
      error: editProfileError,
      isSuccess: isEditSuccess,
    },
  ] = useEditProfileMutation();

  const initialValues: IProfileUpdateForm = {
    name: user?.data.name,
    email: user?.data.email,
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
    if (isEditSuccess || isSuccess) {
      toast.success('Update Successfully');
    }
    if (error || editProfileError) {
      console.log('Error when update avatar');
    }
  }, [isSuccess, error, editProfileError, isEditSuccess]);

  console.log('Server Component');

  return (
    <>
      <div className='w-full flex justify-center items-center flex-col'>
        <div className='relative'>
          <Image
            src={user?.data.avatar ? user?.data.avatar?.url : avatarDefault}
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
            enableReinitialize={true}
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
                <EmailField errors={errors} touched={touched} disabled={true} />
                <SubmitButton label='Update' isLoading={isEditProfileLoading} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default ProfileInfo;
