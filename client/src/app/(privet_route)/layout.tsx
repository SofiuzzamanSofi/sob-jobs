"use client";

import Loading from '@/components/Loading';
import { RootState } from '@/redux/store';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';


interface Privetlayout {
    children: ReactNode;
}

const PrivetLayout = ({ children }: Privetlayout) => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();

    if (reduxStore?.auth?.isLoading) {
        return <Loading />
    }
    else if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
        router.push("/sign-in")
        return null;
    }
    else if ((!reduxStore?.auth?.isLoading && reduxStore?.auth?.email) && !reduxStore?.auth?.role) {
        router.push("/dashboard/register");
        return null;
    }
    else {
        // dashboard Layout 
        return (
            <div className='grid grid-cols-12 gap-2'>
                <Sidebar />
                <div className=' col-span-8'>
                    <div className=' h-full max-w-7xl mx-auto'>
                        {children}
                    </div>
                </div>
            </div>
        );
    };
};

export default PrivetLayout;