import Link from 'next/link';
import React, { FC } from 'react';

export const navItemsData = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Courses',
    url: '/courses',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Policy',
    url: '/policy',
  },
  {
    name: 'FAQ',
    url: '/faq',
  },
];

type Props = {
  isMobile: boolean;
  pathName: string;
};

const NavItems: FC<Props> = ({ isMobile, pathName }) => {
  return (
    <>
      <div className='hidden 800px:flex'>
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  pathName === item.url
                    ? 'dark:text-[#37a39a] text-[crimson]'
                    : 'dark:text-white text-black'
                } text-[18px] px-6 font-Poppins font-[400] hover:text-[crimson] dark:hover:text-[#37a39a]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className='800px:hidden mt-5'>
          <div className='w-full text-center py-6'>
            <Link href={'/'} passHref>
              <span className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                ELearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <div key={index} className='dark:bg-[#575757] rounded-md'>
                <Link href={item.url} passHref>
                  <span
                    className={`${
                      pathName === item.url
                        ? 'dark:text-[#37a39a] text-[crimson] '
                        : 'dark:text-white text-black '
                    } block py-5 text-[20px] px-6 font-Poppins font-[600]`}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
