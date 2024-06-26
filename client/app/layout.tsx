'use client';

import './globals.css';
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from '@/app/utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/app/Provider';
import { SessionProvider } from 'next-auth/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <style jsx global>{`
          body {
            --font-Poppins: ${poppins.variable};
            --font-Josefin: ${josefin.variable};
          }
        `}</style>
      </head>
      <body
        className={`!bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              {children}
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
