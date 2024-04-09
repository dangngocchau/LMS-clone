'use client';
import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react';
import Header from '@/app/components/Header';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title='E-LEARNING'
        description='Elearing platform'
        keywords='Programing, React, Redux, Nodejs'
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
