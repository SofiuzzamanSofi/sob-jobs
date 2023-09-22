import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/redux/provider';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ExtraPage from '@/components/ExtraPage';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sob-Jobs',
  description: 'All Jobs For You And Your Company.',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Providers>
      <html lang="en">
        <body
          className="flex flex-col justify-between min-h-screen"
        >
          <ExtraPage />
          <Navbar />
          <div
            className="max-w-7xl xl:min-w-[80rem] p-4 mx-auto bg-gray-50"
          >
            {children}
          </div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  )
};