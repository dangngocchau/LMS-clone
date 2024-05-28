'use client';
import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Route/Hero';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title='E-LEARNING'
        description='Elearing platform'
        keywords='Programing, React, Redux, Nodejs'
      />
      <Header open={open} setOpen={setOpen} setRoute={setRoute} route={route} />
      <Hero />
    </div>
  );
};

export default Page;
