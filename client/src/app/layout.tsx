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

        {/* for: Cross-Origin-Opener-Policy policy would block the window.close call.  */}
        <meta
          http-equiv="Cross-Origin-Opener-Policy"
          content="allow-popups"
        />

        <body
          className="flex flex-col justify-between min-h-screen"
        >
          <ExtraPage />
          <Navbar />
          <div
            className="min-h-[calc(100vh-17.4049375rem)] sm:min-h-[calc(100vh-18.775375rem)] md:min-h-[calc(100vh-14.6rem)] lg:min-h-[calc(100vh-14.2rem)] bg-gray-50 dark:bg-gray-800 text-slate-700 dark:text-slate-400"
          >
            <div
              className="max-w-[85rem] w-full mx-auto p-4"
            >
              {children}
            </div>
          </div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  )
};