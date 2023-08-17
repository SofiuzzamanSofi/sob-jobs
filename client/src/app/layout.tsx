"use client";

import Providers from '@/redux/provider';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExtraComponentProps from '@/components/ExtraComponent';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? '';
  // console.log("pathname:", pathname)

  return (
    <Providers>
      <html lang="en">
        <body>
          {
            pathname === "/sign-up" || pathname === "/sign-in" ?
              ""
              :
              <Navbar />
          }
          <div
            className="max-w-7xl bg-white mx-auto border-2"
          >
            {children}
          </div>
          {
            pathname === "/sign-up" || pathname === "/sign-in" ?
              ""
              :
              <Footer />
          }
          <ExtraComponentProps />
          <Toaster />
        </body>
      </html>
    </Providers>
  )
};
