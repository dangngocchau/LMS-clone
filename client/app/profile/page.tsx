'use client';
import Header from '@/app/components/Header';
import Profile from '@/app/components/Profile/Profile';
import { useAppSelector } from '@/app/hooks/reduxHook';
import Protected from '@/app/hooks/useProtected';
import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react';

type Props = {};

const Page: FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} Profile`}
          description='Elearing platform'
          keywords='Programing, React, Redux, Nodejs'
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
