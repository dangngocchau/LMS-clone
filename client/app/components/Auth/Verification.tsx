import LargeButton from '@/app/components/Button/LargeButton';
import TextTitle from '@/app/components/Typography/TextTitle';
import { style } from '@/app/styles/style';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import { RootState } from '@reduxjs/toolkit/query';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/app/hooks/reduxHook';
type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useAppSelector((state) => state.auth);

  const [activation, { isSuccess, error }] = useActivationMutation();

  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: '',
    1: '',
    2: '',
    3: '',
  });
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join('');
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account activated successfully!');
      setRoute('Login');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log('An error occured:', error);
      }
    }
  }, [isSuccess, error, setRoute]);

  return (
    <div>
      <div>
        <TextTitle title='Verify Your Account' />
      </div>
      <br />
      <div className='w-full flex items-center justify-center mt-2'>
        <div className='w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className='m-auto flex items-center justify-around'>
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type='number'
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? 'shake border-red-500'
                : 'dark:border-white border-[#000000a]'
            } `}
            placeholder=''
            min={1}
            max={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className='w-full flex justify-center'>
        <LargeButton title='Verify OTP' onClick={verificationHandler} />
      </div>
      <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
        Go back to sign in?
        <span
          className='text-[#2190ff] pl-1 cursor-pointer'
          onClick={() => setRoute('Login')}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
