"use client";

import Loading from '@/components/Loading';
import { RootState } from '@/redux/store';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';


interface Privetlayout {
    children: ReactNode;
}

// const PrivetLayout = ({ children }: Props): JSX.Element => {
const PrivetLayout = ({ children }: Privetlayout) => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();

    const dashboardComponents = !reduxStore?.auth?.isLoading && reduxStore?.auth?.email && reduxStore?.auth?.role ? true : false;

    if (reduxStore?.auth?.isLoading) {
        return <Loading />
    }
    else if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
        return router.push("/sign-in")
    }
    // else if ((!reduxStore?.auth?.isLoading && reduxStore?.auth?.email) && !reduxStore?.auth?.role) {
    //     return (
    //         <div>
    //             {children}
    //         </div>
    //     );
    // }
    else {
        // dashboard Layout 
        return (
            <div className={dashboardComponents ? "grid grid-cols-12 gap-2" : ""} >
                {
                    dashboardComponents ?
                        <Sidebar />
                        :
                        ""
                }
                <div className={dashboardComponents ? "col-span-8" : ""} >
                    <div className={dashboardComponents ? "h-full max-w-7xl mx-auto" : ""} >
                        {children}
                    </div>
                </div>
            </div>
        );
    };
};

export default PrivetLayout;